import React, { useContext } from 'react';
import BagSummary from './BagSummary';
import { useSelector, useDispatch } from 'react-redux';
import { FaWindowClose } from "react-icons/fa";
import { bagActions } from '../store/BagSlice';
import { FaCartPlus } from "react-icons/fa6";
import itemContext from '../../context/Itemcontext';
import toast from 'react-hot-toast';

export default function Bag() {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 5);
  
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = futureDate.toLocaleDateString('en-US', options);
    const context= useContext(itemContext)
    const { deleteItem } = context;
    const dispatch = useDispatch();
    const bagItems = useSelector(store => store.bag);
    // console.log(bagItems)
    const handleRemoveItemBag = (id) => {
                   dispatch(bagActions.removeToBag(id));
                   deleteItem(id)
    toast.success("Removed from Cart succesfully ")

                  
    }
  return (
        <main >
            <h3>Your Cart</h3>
            <div className="bag-page">
            {bagItems[0].length!==0 ?   <div className="bag-items-container">
                  {bagItems[0].map(item => (
                        <div key={item.id} className="bag-item-container">
                            <div className="item-left-part">
                                <img className="bag-item-img" src={item.image} alt={item.item_name} />
                            </div>
                            <div className="item-right-part">
                                <div className="company">{item.company}</div>
                                <div className="item-name">{item.item_name}</div>
                                <div className="price-container">
                                    <span className="current-price">Rs {item.current_price}</span>
                                    <span className="original-price">Rs {item.original_price}</span>
                                    <span className="discount-percentage">({item.discount_percentage}% OFF)</span>
                                </div>
                                <div className="return-period">
                                    <span className="return-period-days">7 days</span> return available
                                </div>
                                <div className="delivery-details">
                                    Delivery by <span className="delivery-details-days">{formattedDate}</span>
                                </div>
                            </div>

                            <div className="remove-from-cart" onClick={() => handleRemoveItemBag(item.id)}>
                                <FaWindowClose />
                            </div>
                        </div>
                    ))}
                </div>: <div className="bag-items-container"><h4> Add Items...<FaCartPlus /> </h4></div>}

                <div className="bag-summary">
                    <BagSummary />
                </div>
            </div>
        </main>
    );
}
