import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bagActions } from '../store/BagSlice';
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import itemContext from '../../context/Itemcontext';
import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';

export default function KidsItems({ items }) {
  const navigate = useNavigate();

  const bagItems = useSelector((store) => store.bag);
  const context = useContext(itemContext);
  const { AddToCart, deleteItem } = context;

  const isLoggedIn = useSelector(store => store.auth.isLoggedIn); // Get the logged-in state

  const elementFound = Array.isArray(bagItems[0]) && bagItems[0].some((item) => item.id === items.id);

  const dispatch = useDispatch();

  // Handle adding an item to the bag and showing toast notification
  const handleItem = () => {
    dispatch(bagActions.addToBag(items));
    AddToCart(items);

    toast.success(items.item_name,"Added to Cart succesfully ")

  };

  // Handle removing an item from the bag and showing toast notification
  const handleRemoveItem = () => {
    dispatch(bagActions.removeToBag(items.id));
    deleteItem(items.id);
    toast.success("Removed from Cart succesfully ")

  };

  // Redirect to login page and show toast notification
  const Loginfirst = () => {
    navigate("/login");

    toast.error("Please Log-in First")

  };

  return (
    <>
      <div key={items.id} id={items.id} className="item-container">
        <img id={items.id} className="item-image" src={items.image} alt="item image" />
        <div className="rating">
          {items.rating.stars} ⭐ | {items.rating.count}
        </div>
        <div className="company-name">{items.company}</div>
        <div className="item-name">{items.item_name}</div>
        <div className="price">
          <span className="current-price">Rs {items.current_price}</span>
          <span className="original-price">Rs {items.original_price}</span>
          <span className="discount">({items.discount_percentage}% OFF)</span>
        </div>

        {elementFound && isLoggedIn ? (
          <button onClick={handleRemoveItem} className="btn btn-add-bag btn-danger">
            <MdDelete />
            Remove
          </button>
        ) : (
          <button className="btn-add-bag" onClick={!localStorage.getItem('token') ? Loginfirst : handleItem}>
            <IoMdAddCircleOutline />
            Add to Bag
          </button>
        )}
      </div>

     
    </>
  );
}
