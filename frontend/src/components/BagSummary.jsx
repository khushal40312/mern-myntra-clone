import React from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';


export default function BagSummary() {
   const BagItems = useSelector(store => store.bag);
   
   let totalItem = BagItems[0] ? BagItems[0].length : 0;
   let totalMRP = 0;
   let totalDiscount = 0;
   const CONVENIENCE_FEES = 99;

   if (BagItems[0]) {
     BagItems[0].forEach(bagItem => {
       totalMRP += bagItem.original_price;
       totalDiscount += bagItem.original_price - bagItem.current_price;
     });
   }

   let finalPayment = totalItem === 0 ? 0 : (totalMRP - totalDiscount + CONVENIENCE_FEES);

   const placeorder = async () => {
     if (totalItem === 0) {
       toast.error("No items in the cart to place an order.");
       return;
     }

     const stripe = await loadStripe("your-public-stripe-key");
     
     const body = { product: BagItems[0] };
     const headers = { "Content-Type": "application/json" };

     try {
       const response = await fetch("http://localhost:8009/api/items/create-checkout-session", {
         method: "POST",
         headers,
         body: JSON.stringify(body),
       });
       const session = await response.json();

       const result = await stripe.redirectToCheckout({ sessionId: session.id });
       if (result.error) {
         console.error(result.error);
         toast.error("Stripe error occurred: " + result.error.message);
       }
     } catch (error) {
       console.error("Error during checkout:", error);
       toast.error("Failed to create checkout session.");
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
           <span className="price-item-tag">Discount on MRP</span>
           <span className="price-item-value priceDetail-base-discount">-₹{totalDiscount}</span>
         </div>
         <div className="price-item">
           <span className="price-item-tag">Convenience Fee</span>
           <span className="price-item-value">₹{totalItem === 0 ? 0 : CONVENIENCE_FEES}</span>
         </div>
         <hr />
         <div className="price-footer">
           <span className="price-item-tag">Total Amount</span>
           <span className="price-item-value">₹{finalPayment}</span>
         </div>
       </div>
       <button className="btn-place-order" onClick={placeorder} >
         <div className="css-xjhrni">PLACE ORDER</div>
       </button>
     </>
   );
}
