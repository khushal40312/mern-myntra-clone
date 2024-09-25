import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Address() {
  const BagItems = useSelector(store => store.bag);
  let totalItem = BagItems[0] ? BagItems[0].length : 0;
  let totalMRP = 0;
  let totalDiscount = 0;
  const CONVENIENCE_FEES = 0;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); // For skeleton loading
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState(null);  // To store the fetched address
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pincode: '',
    address: '',
    locality: '',
    city: '',
    state: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const token = localStorage.getItem('token'); // Auth token from local storage

  if (BagItems[0]) {
    BagItems[0].forEach(bagItem => {
      totalMRP += bagItem.original_price;
      totalDiscount += bagItem.original_price - bagItem.current_price;
    });
  }

  let finalPayment = totalItem === 0 ? 0 : (totalMRP - totalDiscount + CONVENIENCE_FEES);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch("https://myntra-clone-mern.onrender.com/api/items/getAddress", {
          method: 'GET',
          headers: {
            'auth-token': token,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.error === "Address not found") {
          setAddress(null);  // No address exists
        } else {
          setAddress(data);  // Address found
        }
        setLoading(false);  // Stop loading once data is fetched
      } catch (error) {
        toast.error("Failed to fetch address");
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  // const navigate = useNavigate()
  useEffect(()=>{

    if(!isLoggedIn)
    {
    navigate("/")
    
    }
    },[])
const handleAddAddress = async (e) => {
  e.preventDefault();
  
  const saveSettings = async () => {
    const response = await fetch("https://myntra-clone-mern.onrender.com/api/items/saveAddress", {
      method: 'POST',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to save address');
    }
    const result = await response.json();
    setAddress(result);  // Set the added address as the current one
    setIsEditing(false);  // Hide the form after adding the address
  };

  toast.promise(
    saveSettings(),
    {
      loading: 'Saving address...',
      success: <b>Address saved successfully!</b>,
      error: <b>Failed to save address</b>,
    }
  );
};
const handleRemoveAddress = async () => {
  const removeAddress = async () => {
    const response = await fetch("https://myntra-clone-mern.onrender.com/api/items/deleteAddress", {
      method: 'DELETE',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || 'Failed to remove address');
    }
    setAddress(null);  // Remove the address and show the form again
  };

  toast.promise(
    removeAddress(),
    {
      loading: 'Removing address...',
      success: <b>Address removed successfully!</b>,
      error: <b>Failed to remove address</b>,
    }
  );
};


  const handleEditAddress = () => {
    setFormData(address);  // Prefill the form with the existing address
    setIsEditing(true);  // Show the form to edit
  };

  const handlePlaceOrder = async () => {
  if (!address) {
    toast.error("Please add an address before placing an order.");
    return;
  }

  if (totalItem === 0) {
    toast.error("No items in the cart to place an order.");
    return;
  }

  const placeOrder = async () => {
    if (paymentMethod === 'cash') {
      // Handle Cash on Delivery
      const response = await fetch("https://myntra-clone-mern.onrender.com/api/items/createOrder", {
        method: "POST",
        headers: {
          'auth-token': token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(BagItems[0]),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to place order");
      }
      navigate('/orders');  // Redirect to the orders page
    } else if (paymentMethod === "online") {
      // Handle Stripe payment and create order first
      const response = await fetch("https://myntra-clone-mern.onrender.com/api/items/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: BagItems[0] }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();
      const stripe = await loadStripe("pk_test_51Pyq0yLoogz1SBLrYKOeiBcOJMzY4P3tjYznMWPc04eXhMaq7i9S6jDdMFDt389bvhnTvCezJzVhPogsKhoqjJkZ00LTZ9sdJm");

      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        throw new Error(result.error.message || "Stripe error occurred");
      }
    }
  };

  toast.promise(
    placeOrder(),
    {
      loading: 'Placing your order...',
      success: <b>Order placed successfully!</b>,
      error: <b>Failed to place order</b>,
    }
  );
};


  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);  // Set the selected payment method
  };

  return (
    <div style={{ marginTop: "100px" }} className='container'>
      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card mb-4">
            <div className="card-header py-3">
              <h5 className="mb-0">Address & Billing Details</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <Skeleton count={10} height={40} />
              ) : (
                (!address || isEditing) && (
                  <form onSubmit={handleAddAddress}>
                    <strong>Contact Details</strong>
                  <div className="form-outline mb-4">
                    <input
                      placeholder='Name'
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control my-1"
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      placeholder='Phone'
                      type="number"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <strong className='my-3'>Address</strong>
                  <div className="form-outline mb-4">
                    <input
                      type='text'
                      placeholder='Address (House no, Building, street)'
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      placeholder='Pincode'
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      placeholder='Locality/Town'
                      type="text"
                      name="locality"
                      value={formData.locality}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      placeholder='City'
                      type='text'
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      placeholder='State'
                      type='text'
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <button className="btn btn-primary" type="submit">{isEditing ? 'Update Address' : 'Add Address'}</button>
                  </form>
                )
              )}
              
              {address && !isEditing && !loading && (
                <div>
                  <strong>{address.name}</strong> <span className="badge bg-success">HOME</span>
                  <p>{address.address}, {address.locality}, {address.city}, {address.state} - {address.pincode}</p>
                  <p>Mobile: <strong>{address.mobile}</strong></p>
                  <button className="btn btn-outline-primary" onClick={handleEditAddress}>Edit</button>
                  <button className="btn btn-outline-danger ms-2" onClick={handleRemoveAddress}>Remove</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="payment-options mb-4">
            <h4 className="mb-3">Select Payment Method</h4>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="cashOnDelivery"
                value="cash"
                onChange={handlePaymentChange}
              />
              <label className="form-check-label" htmlFor="cashOnDelivery">
                Cash on Delivery
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="onlinePayment"
                value="online"
                onChange={handlePaymentChange}
              />
              <label className="form-check-label" htmlFor="onlinePayment">
                Online Payment
              </label>
            </div>
          </div>
          
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
          <button style={{cursor:"pointer"}} className="btn-place-order" onClick={handlePlaceOrder}>
            <div className="css-xjhrni">PLACE ORDER</div>
          </button>
          
        </div>
      </div>
    </div>
  );
}
