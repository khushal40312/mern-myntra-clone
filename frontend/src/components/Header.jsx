import React, { useEffect, useState } from 'react';
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaSmile } from "react-icons/fa";
import { BsFillBagPlusFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import Bag from './Bag';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { IoIosSearch } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
export default function Header() {
  const BagItems = useSelector(store => store.bag);
  const items = useSelector(store => store.items);
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [input, setInput] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLeftSlideOpen, setIsLeftSlideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to toggle search bar
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;

    const userDetail = async () => {
      try {
        const response = await fetch("http://localhost:8009/api/auth/getuser", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });

        const json = await response.json();
        setUserData(json);
        setIsAdmin(json.admin); // Set admin status
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    userDetail();
  }, [isLoggedIn]);

  const toggleDropdown = () => {
    if (isLoggedIn) {
      setIsOpen(!isOpen);
    } else {
      toast.error("Please login First");
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setIsOpen(false);
    setIsAdmin(false); // Reset admin status on logout
    toast.success("Logged out successfully!");
    navigate('/'); // Redirect to home after logout
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value) {
      const filtered = items.filter(item =>
        item.item_name.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };

  const navigateToItem = (itemId) => {
    navigate(`/#${itemId}`);
  };

  const toggleLeftSlide = () => {
    setIsLeftSlideOpen(!isLeftSlideOpen);
  };

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle search bar visibility
  };

  return (
    <>
      <header className='fixed-top'>
        {/* Hamburger button for mobile view */}
        <button className="hamburger-btn" onClick={toggleLeftSlide}>
          ☰
        </button>

        <div className="logo_container">
          <Link to="/"><img className="myntra_home" src="images/myntra_logo.webp" alt="Myntra Home" /></Link>
        </div>

        {/* Nav bar: hidden by default on mobile */}
        <nav className="nav_bar">
          <Link className=' mx-2' to="/men">Men</Link>
          <Link className='mx-2' to="/women">Women</Link>
          <Link className='mx-2' to="/kids">Kids</Link>
          <Link className='mx-2' to="/homeliving">Home & Living</Link>
          <Link className='mx-2' to="/beauty">Beauty</Link>
          <Link className='mx-2' to="/studio">electronics <sup>New</sup></Link>
        </nav>

        {/* Search bar toggle button for mobile */}
     

        {/* Search bar: hidden by default on mobile */}
        <div className={`search_bar ${isSearchOpen ? 'open' : ''}`}>
  <span className="search_icon_hide">
    <IoIosSearch size={20} />
  </span>
  <input
    onChange={handleChange}
    value={input}
    className="search_input"
    placeholder="Search for products, brands and more"
  />
  {input && filteredItems.length > 0 && (
    <div className="suggestions">
      {filteredItems.map((item, index) => (
        <div key={index} className="suggestion-item" onClick={() => navigateToItem(item.id)}>
          <img
            className='mx-2'
            style={{
              width: "70px",
              height: "46px",
              border: "2px solid greenyellow",
              borderRadius: "10px",
              objectFit: "cover"
            }}
            src={item.image}
            alt=""
          />
          {item.item_name} ({item.company})
        </div>
      ))}
    </div>
  )}
</div>
 
        <div className="action_bar">

        <div className=" action_container search_icon_btn " onClick={toggleSearchBar}>
        < IoIosSearch size={20} />
        <span className='action_name  '> Search</span>
        </div>
          {!isLoggedIn ? (
            <div className="action_container login">
              <IoPersonCircleSharp />
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                <span className="action_name my-1 mx-3">Login</span>
              </Link>
            </div>
          ) : (
            <div  onClick={handleLogout} className="action_container login">
              <CiLogout />
              <span className="action_name my-1 mx-3">Logout</span>
            </div>
          )}
<div className="dropdown-container">

            <div onClick={toggleDropdown} className="dropdown-button  d-flex flex-column">
              <div className="action_container mx-3">
                <BsFillBagPlusFill />
                <span className="action_name">Bag</span>
                {isLoggedIn ? (
                  <span className="bag-item-count">
                    {Array.isArray(BagItems) && BagItems.length > 0 && Array.isArray(BagItems[0]) ? BagItems[0].length : 0}
                  </span>
                ) : (
                  <span className="bag-item-count">0</span>
                )}
              </div>

            </div>
            <div className='action_container mx-3'>
              {isOpen && (
                <div className="dropdown-content rounded">
                  <button onClick={closeDropdown} className="close-btn rounded">
                    Close
                  </button>
                  <Bag />
                </div>
              )}
            </div>
          </div>
          {isLoggedIn && userData ? (
  <div style={{cursor:"pointer"}} className="action_containerpr mx-3">
    <IoPersonCircleSharp />
    <span className="action_name my-1">Profile</span>
    <div className="dropdown">
      <div className="dropdown-contentpr">
        <div className="d-flex justify-content-center">
          <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid pink"
            }}
            src={`http://localhost:8009/uploads${userData.picture?.split('/uploads')[1]}`}
            alt="Profile"
          />
        </div>
        <div className="d-flex justify-content-center">
          Your Profile
        </div>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Gender:</strong> {userData.gender}</p>
        <p><strong>Account Created:</strong> {userData.date ? userData.date.slice(0, 10) : 'N/A'}</p>
      </div>
    </div>
  </div>
) : null}

          {isAdmin && (
            <Link className='my-1 admin' to="/adminpanel" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="action_container ">
                <FaSmile />
                <span className="action_name mx-3">Admin</span>
              </div>
            </Link>
          )}
        </div>
      </header>
      <Toaster/>

      {/* Left Slide for mobile view */}
      <div className={`left_slide ${isLeftSlideOpen ? 'open' : ''}`}>
        <button onClick={toggleLeftSlide} className="close_btn">✕</button>
        {userData && (
          <div className="user_info">
            <img className="user_image" src={`http://localhost:8009/uploads${userData.picture.split('/uploads')[1]}`} alt="User" />
            <p>{userData.name}</p>
          </div>
          
        )}

{isAdmin && (
            <Link className='my-1' to="/adminpanel" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="action_container">
                <FaSmile />
                <span className=" action_name mx-3">Admin</span>
              </div>
            </Link>
          )}
          {userData ? (
  <>
    <div className="user_info">
  
      
  
    {/* <p><strong>Name:</strong> {userData.name}</p> */}
    <p><strong>Email:</strong> {userData.email}</p>
    <p><strong>Gender:</strong> {userData.gender}</p>
    <p><strong>Account Created:</strong> {userData.date ? userData.date.slice(0, 10) : 'N/A'}</p>
    </div>
  </>
) : null}

        <ul>
          <li><Link className=' mx-2' to="/men">Men</Link></li>
          <li><Link className='mx-2' to="/women">Women</Link></li>
          <li><Link className='mx-2' to="/kids">Kids</Link></li>
          <li><Link className='mx-2' to="/homeliving">Home & Living</Link></li>
          <li><Link className='mx-2' to="/beauty">Beauty</Link></li>
          <li><Link className='mx-2' to="/studio">electronics <sup>New</sup></Link></li>
        </ul>
      </div>
    </>
  );
}
