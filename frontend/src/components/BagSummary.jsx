import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../store/orderSlice';
 

export default function BagSummary() {
  const navigate = useNavigate();
  const dispatch = useDispatch();  // Get the dispatch function
  const BagItems = useSelector((store) => store.bag);
  
  let totalItem = BagItems[0] ? BagItems[0].length : 0;
  let totalMRP = 0;
  let totalDiscount = 0;
  const CONVENIENCE_FEES = 0;

  if (BagItems[0]) {
    BagItems[0].forEach((bagItem) => {
      totalMRP += bagItem.original_price;
      totalDiscount += bagItem.original_price - bagItem.current_price;
    });
  }

  let finalPayment = totalItem === 0 ? 0 : totalMRP - totalDiscount + CONVENIENCE_FEES;

  const placeOrders = () => {
    if (totalItem === 0) {
      toast.error("No items in the cart to place an order.");
    } else {
      navigate('/address');
      dispatch(placeOrder()); 
    }
  };
  
   return (
     <>
       <div className="bag-details-container">
         <div className="price-header">PRICE DETAILS ({totalItem} Items)</div>
         <div className="price-item">
           <span className="price-item-tag">Total MRP</span>
           <span className="price-item-value">₹{totalMRP}</span>
         </div>
         <div className="price-item">
           <span className="price-item-tag"> Total Discount on MRP</span>
           <span className="price-item-value priceDetail-base-discount">-₹{totalDiscount}</span>
         </div>
         {/* <div className="price-item">
           <span className="price-item-tag">Convenience Fee</span>
           <span className="price-item-value">₹{totalItem === 0 ? 0 : CONVENIENCE_FEES}</span>
         </div> */}
         <hr />
         <div className="price-footer">
           <span className="price-item-tag">Total Amount</span>
           <span className="price-item-value">₹{finalPayment}</span>
         </div>
       </div>
       <button style={{cursor:"pointer"}} className="btn-place-order" onClick={placeOrders} >
         <div className="css-xjhrni">PROCEED</div>
       </button>
     </>
   );
}
