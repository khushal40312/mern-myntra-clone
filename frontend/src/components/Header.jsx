import React, { useEffect, useState, useRef } from 'react';
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaSmile } from "react-icons/fa";
import { BsFillBagPlusFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';
import Bag from './Bag';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { IoIosSearch } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { FaWindowClose } from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { maketrue, placeOrder } from '../store/orderSlice';
import { setAdminFalse, setAdminTrue } from '../store/adminSlice';
import { bagActions } from '../store/BagSlice';

export default function Header() {
  const BagItems = useSelector(store => store.bag);
  const items = useSelector(store => store.items);
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const orderPlaced = useSelector(store => store.order.orderPlaced); // Track orderPlaced state
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [input, setInput] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLeftSlideOpen, setIsLeftSlideOpen] = useState(false);
 const [isSearchOpen, setIsSearchOpen] = useState(false); // State to toggle search bar
  const leftSlideRef = useRef(null); // Create a reference for the left side panel
  const searchBarRef = useRef(null); // Reference for the search bar

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;

    const userDetail = async () => {
      try {
        const response = await fetch("https://myntra-clone-mern.onrender.com/api/auth/getuser", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });

        const json = await response.json();
        setUserData(json);
        setIsAdmin(json.admin);
         // Set admin status
         if (json.admin) {
          
           dispatch(setAdminTrue()); 
         }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    userDetail();
  }, [isLoggedIn]);
 useEffect(() => {
    const handleClickOutsideSearchBar = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target) && !event.target.closest('.search_icon_btn')) {
        setIsSearchOpen(false); // Close the search bar if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutsideSearchBar);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSearchBar);
    };
  }, [searchBarRef]);
  useEffect(() => {
    // Click event handler to detect clicks outside the left-side menu
    const handleClickOutside = (event) => {
      if (leftSlideRef.current && !leftSlideRef.current.contains(event.target)) {
        setIsLeftSlideOpen(false); // Close the left-side menu if clicked outside
      }
    };

    // Attach the event listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [leftSlideRef]);

  const toggleDropdown = () => {
    if (isLoggedIn) {
      setIsOpen(!isOpen);
     document.title= "Arigato-Bag"
  
    
   


    } else {
      toast.error("Please login First");
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
    document.title= "Arigato-shopping"

  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  dispatch(bagActions.clearBag())
    setIsOpen(false);
    setIsAdmin(false);
    toast.success("Logged out successfully!");
    navigate('/');
    dispatch(setAdminFalse());
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

  const GotoMyOrders = () => {
    if (isLoggedIn) {
      navigate("/orders")
      dispatch(placeOrder());
     document.title= "Arigato-Myorders"

    }
    else {
      toast.error("Please Login First")
      navigate("/login")

    }
    toggleLeftSlide()

  }
  // console.log(orderPlaced)
  useEffect(() => {
    if (!orderPlaced) {
      setIsOpen(false);
      dispatch(maketrue()); 
    }
  }, [orderPlaced]);

  
  return (
    <>
      <header className='fixed-top'>
        {/* Hamburger button for mobile view */}
        <button className="hamburger-btn" onClick={toggleLeftSlide}>
          ☰
        </button>

        <div onClick={()=>{setIsOpen(false)}} className="logo_container">
          <Link to="/"><img className="myntra_home" src="images/logo.png" alt="Myntra Home" /></Link>
        </div>

        {/* Nav bar: hidden by default on mobile */}
        <nav className="nav_bar">
          <Link onClick={() => {
            isOpen == true ? setIsOpen(false) : setIsOpen(false)
          }} className=' mx-2' to="/men">Men</Link>
          <Link onClick={() => {
            isOpen == true ? setIsOpen(false) : setIsOpen(false)
          }} className='mx-2' to="/women">Women</Link>
          <Link onClick={() => {
            isOpen == true ? setIsOpen(false) : setIsOpen(false)
          }} className='mx-2' to="/kids">Kids</Link>
          <Link onClick={() => {
            isOpen == true ? setIsOpen(false) : setIsOpen(false)
          }} className='mx-2' to="/homeliving">Home & Living</Link>
          <Link onClick={() => {
            isOpen == true ? setIsOpen(false) : setIsOpen(false)
          }} className='mx-2' to="/beauty">Beauty</Link>
          <Link onClick={() => {
            isOpen == true ? setIsOpen(false) : setIsOpen(false)
          }} className='mx-2' to="/studio">Electronics <sup>New</sup></Link>
        </nav>

        {/* Search bar: hidden by default on mobile */}
        <div ref={searchBarRef} className={`search_bar ${isSearchOpen ? 'open' : ''}`}>
          <span className="search_icon_hide">
            <IoIosSearch size={20} />
          </span>
          <input onClick={() => {
            isOpen == true ? setIsOpen(false) : setIsOpen(false)
          }}
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
          <div className="action_container search_icon_btn" onClick={toggleSearchBar}>
            < IoIosSearch size={20} />
            <span className='action_name  '> Search</span>
          </div>
          {!isLoggedIn ? (
            <div className="action_container login">
              <IoPersonCircleSharp />
              <Link className='action_name margin my-1 mx-3' to="/login" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
              Login
              </Link>
            </div>
          ) : (
            <div onClick={handleLogout} className="action_container login">
              <CiLogout />
              <span className="action_name my-1 mx-3">Logout</span>
            </div>
          )}
          <div className="dropdown-container">
            <div onClick={toggleDropdown} className="dropdown-button  d-flex flex-column">
              <div className="action_container mx-3">
                <BsFillBagPlusFill />
                <span className="action_name myz">Bag</span>
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
            <div style={{ cursor: "pointer" }} className="action_containerpr mx-3">
              <IoPersonCircleSharp />
              <span className="action_name my-1">Profile</span>
              <div className="dropdown">
                <div className="dropdown-contentpr">
                  <div className="d-flex justify-content-center">
                    {userData?.picture ? (
  <img
    style={{
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "4px solid rgb(168, 114, 154)"
    }}
    src={`https://myntra-clone-mern.onrender.com/uploads${userData.picture.split('/uploads')[1]}`}
    alt="Profile"
  />
) : (
  <img
    style={{
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "4px solid rgb(168, 114, 154)"
    }}
    src="images/defProfile.jpg" // Add a default image URL here
    alt="Default Profile"
  />
)}

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
            <Link onClick={() => {
              isOpen == true ? setIsOpen(false) : setIsOpen(false)
            }} className='my-1 admin' to="/adminpanel" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="action_container ">
                <FaSmile />
                <span className="action_name mx-3">Admin</span>
              </div>
            </Link>
          )}
          {/* <Link className=' admin' to="/orders" style={{ textDecoration: 'none', color: 'inherit' }}> */}
          <div onClick={GotoMyOrders} className="action_container myorder ">
            <GiCardboardBoxClosed size={20} />
            <span className="action_name ">My Orders</span>
          </div>
          {/* </Link> */}
        </div>
      </header>
      <Toaster />

      {/* Left Slide for mobile view */}
      <div ref={leftSlideRef} className={`left_slide ${isLeftSlideOpen ? 'open' : ''}`}>
        <button onClick={toggleLeftSlide} className="close_btn"><FaWindowClose size={29} /></button>
        {userData && (
          <div className="user_info">
            {userData?.picture ? (
  <img
    className="user_image"
    src={`https://myntra-clone-mern.onrender.com/uploads${userData.picture.split('/uploads')[1]}`}
    alt="User"
  />
) : (
  <img
    className="user_image"
    src="images/defProfile.jpg" // Add a default image URL here
    alt="Default User"
  />
)}

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
            <div className="user_info ">
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <p><strong>Account Created:</strong> {userData.date ? userData.date.slice(0, 10) : 'N/A'}</p>
            </div>
          </>
        ) : null}
             <div  style={{ display:'flex', cursor:"pointer",   border: '3px solid rgb(168, 114, 154)',
    width: '277px',
    borderRadius: '3px',
    marginBottom: '6px',
    alignItems:'center',
    justifyContent:"center",}} onClick={GotoMyOrders} className=" left_side_order ">
            <GiCardboardBoxClosed size={20} />
            <span className="">My Orders</span>
          </div>
        <ul style={{paddingLeft:'0'}}>
          <li ><Link onClick={() => {
            isLeftSlideOpen == true ? setIsLeftSlideOpen(!isLeftSlideOpen) : setIsLeftSlideOpen(false)
          }}to="/men">Men</Link></li>
          <li><Link onClick={() => {
            isLeftSlideOpen == true ? setIsLeftSlideOpen(!isLeftSlideOpen) : setIsLeftSlideOpen(false)
          }} to="/women">Women</Link></li>
          <li><Link onClick={() => {
            isLeftSlideOpen == true ? setIsLeftSlideOpen(!isLeftSlideOpen) : setIsLeftSlideOpen(false)
          }} to="/kids">Kids</Link></li>
          <li><Link onClick={() => {
            isLeftSlideOpen == true ? setIsLeftSlideOpen(!isLeftSlideOpen) : setIsLeftSlideOpen(false)
          }}to="/homeliving">Home & Living</Link></li>
          <li><Link onClick={() => {
            isLeftSlideOpen == true ? setIsLeftSlideOpen(!isLeftSlideOpen) : setIsLeftSlideOpen(false)
          }}  to="/beauty">Beauty</Link></li>
          <li><Link onClick={() => {
            isLeftSlideOpen == true ? setIsLeftSlideOpen(!isLeftSlideOpen) : setIsLeftSlideOpen(false)
          }}  to="/studio">electronics <sup>New</sup></Link></li>
       
        </ul>
      </div>
    </>
  );
}
