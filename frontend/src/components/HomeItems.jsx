import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bagActions } from '../store/BagSlice';
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import itemContext from '../../context/Itemcontext';
import toast from 'react-hot-toast';

import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
export default function HomeItems({ items }) {
  const bagItems = useSelector((store) => store.bag);
  const context= useContext(itemContext)
  const { AddToCart,deleteItem } = context;
  // Check if bagItems is an array and contains the item
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn); // Get the logged-in state

  const elementFound = Array.isArray(bagItems[0]) && bagItems[0].some((item) => item.id === items.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleItem = () => {
    dispatch(bagActions.addToBag(items));
   
    AddToCart(items);
    toast.success(items.item_name,"Added to Cart succesfully ")
    
  };
  
  
  const handleRemoveItem = () => {
    dispatch(bagActions.removeToBag(items.id));
    deleteItem(items.id)
    toast.success("Removed from Cart succesfully ")

  };
  const Loginfirst =()=>{
    navigate("/login");
toast.error("Please Log-in First")
     // Optional: Show a toast notification on logout
    
  }
  const location = useLocation();

  useEffect(() => {
    const scrollToItem = () => {
      const itemId = location.hash.replace('#', '');
      if (itemId) {
        const itemElement = document.getElementById(itemId);
        if (itemElement) {
          // Scroll to the item
          itemElement.scrollIntoView({ behavior: 'smooth' });

          // Add the blink class
          itemElement.classList.add('blink');

          // Remove the blink class after animation is done (1 second in this case)
          setTimeout(() => {
            itemElement.classList.remove('blink');
          }, 1000);
        }
      }
    };

    scrollToItem();
  }, [location]);

  return (
    <>

      <div id={items.id} className="item-container">
        <img  id={items.id} className="item-image" src={items.image} alt="item image" />
        <div className="rating">
          {items.rating.stars} ⭐ | {items.rating.count}
        </div>
        <div className="company-name">{items.company}</div>
        <div  className="item-name">{items.item_name}</div>
        <div className="price">
          <span className="current-price">Rs {items.current_price}</span>
          <span className="original-price">Rs {items.original_price}</span>
          <span className="discount">({items.discount_percentage}% OFF)</span>
        </div>
        {elementFound&&isLoggedIn ? (
          <button onClick={handleRemoveItem} className="btn btn-add-bag btn-danger">
            <MdDelete />
            Remove
          </button>
        ) : (
          <button className="btn-add-bag" onClick={!localStorage.getItem('token')?Loginfirst:handleItem}>
            <IoMdAddCircleOutline />
            Add to Bag
          </button>
        )}
      </div>
    </>
  );
}
