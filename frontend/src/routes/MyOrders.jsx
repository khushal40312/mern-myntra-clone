import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FaSmileBeam } from "react-icons/fa";
import { FaCartFlatbed } from "react-icons/fa6";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';

export default function MyOrders() {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [noOrders, setNoOrders] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch("https://myntra-clone-mern.onrender.com/api/items/trackOrder", {
      method: 'GET',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "No orders found for this user.") {
          setNoOrders(true);
        } else {
          setOrders(data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const getProgressWidth = (status) => {
    switch (status) {
      case 'processing':
        return '11%';
      case 'Shipped':
        return '37%';
      case 'Out for delivery':
        return '62%';
      case 'Delivered':
        return '100%';
      default:
        return '0%%';
    }
  };

  const formatDate = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD');
  };

  const calculateGST = (subtotal) => {
    return subtotal * 0.18;
  };

  const calculateTotalShopping = (orders) => {
    return orders.reduce((acc, order) => {
      const totalMRP = order.items.reduce((sum, item) => sum + item.original_price, 0);
      const totalDiscount = order.items.reduce((sum, item) => sum + (item.original_price - item.current_price), 0);
      const subtotal = totalMRP - totalDiscount;
      const gst = calculateGST(subtotal);
      const finalPayment = subtotal + gst;

      return acc + finalPayment;
    }, 0);
  };

  const handleCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);  // Open the modal
  };
  const submitCancelOrder = () => {
    const token = localStorage.getItem('token');

    fetch(`https://myntra-clone-mern.onrender.com/api/items/deleteOrder/${selectedOrderId}`, {
      method: 'DELETE',
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json',
      },

    })
      .then(response => response.json())
      .then(data => {
        // Update the orders array after deletion
        const updatedOrders = orders.filter(order => order._id !== selectedOrderId);
        setOrders(updatedOrders);

        // If all orders are deleted, reset state
        if (updatedOrders.length === 0) {
          setNoOrders(true);  // This will show the "No orders found" UI
        }
        setShowCancelModal(false);
        setOrders(orders.filter(order => order._id !== selectedOrderId));
      })
      .catch(error => console.error("Error cancelling order:", error));
  };

  return (
    <div style={{ marginTop: "100px" }} className="container">
      <section className="h-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-10 col-xl-8">
              <div className="card" style={{ borderRadius: "10px" }}>
                <div className="card-header px-4 py-5">
                  <h5 className="text-muted mb-0">Thanks for Shopping with <span style={{ color: "#a8729a" }}>Arigato</span>!</h5>
                </div>

                <div className="card-body p-4">
                  {loading ? (
                    <Skeleton count={16} />
                  ) : noOrders ? (
                    <div className="text-center">
                      <h5>No orders found!</h5>
                      <p>It looks like you haven't placed any orders yet.</p>
                      <div className="container">
                        <FaCartFlatbed size={100} />
                      </div>
                      <Link to="/" className="btn btn-primary">Order Something <FaSmileBeam /></Link>
                    </div>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>Your Orders</p>
                      </div>

                      {orders.map((order, index) => {
                        const totalMRP = order.items.reduce((acc, item) => acc + item.original_price, 0);
                        const totalDiscount = order.items.reduce((acc, item) => acc + (item.original_price - item.current_price), 0);
                        const subtotal = totalMRP - totalDiscount;
                        const gst = calculateGST(subtotal);
                        const finalPayment = subtotal + gst;

                        return (
                          <div key={index} className="mb-5">
                            <h5 className="text-muted">Order #{index + 1}</h5>
                            {order.items.map((item) => (
                              <div key={item.id} className="card shadow-0 border mb-4">
                                <div className="card-body">
                                  {/* Order Item Details */}
                                  <div className="row">
                                    <div className="col-md-2">
                                      <img src={item.image} className="img-fluid" alt={item.item_name} />
                                    </div>
                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                      <p className="text-muted mb-0">{item.item_name}</p>
                                    </div>
                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                      <p className="text-muted mb-0 small">{item.company}</p>
                                    </div>
                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                      <p className="text-muted mb-0 small">Return: {item.return_period} days</p>
                                    </div>
                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                      <p className="text-muted mb-0 small">₹{item.current_price}</p>
                                    </div>
                                    <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                      <del className="text-muted mb-0 small">₹{item.original_price}</del>
                                    </div>
                                  </div>
                                  <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: 1 }} />
                                </div>
                              </div>
                            ))}
                            {/* Order Summary */}
                            <div className="d-flex justify-content-between flex-column pt-2">

                              <div className="d-flex justify-content-between pt-2">
                                <p className="fw-bold mb-0">Order Details</p>
                                <p className="text-muted margin-bt w-184"><span className="fw-bold me-4">Original Price</span> ₹{totalMRP}</p>
                              </div>
                              <div className="d-flex justify-content-between pt-2">
                                <p className="text-muted ">Invoice Number: {order.invoiceNumber}</p>
                                <p className="text-muted w-169"><span className="fw-bold me-4">Discount</span> ₹{totalDiscount}</p>
                              </div>

                              <div className="d-flex justify-content-between">
                                <p className="text-muted mb-0">Invoice Date: {formatDate(order.date)}</p>
                                <p style={{ width: "173px" }} className="text-muted w-299"><span className="fw-bold me-4">Current Price:</span> ₹{subtotal}</p>
                              </div>

                              <div className="d-flex justify-content-between">
                                <p className="text-muted mb-0">Receipts Voucher: {order.receiptVoucher}</p>
                                <p className="text-muted w-307"><span className="fw-bold me-4 w-212">GST 18%</span> ₹{gst.toFixed(2)}</p>

                              </div>

                              <div className="d-flex justify-content-between mb-5">
                                <p className="text-muted mb-0">Delivery Charges</p>
                                <p className="text-muted mb-0"><span className="fw-bold me-4">Free</span></p>
                                <p className="text-muted mb-0 w-257"><span className="fw-bold me-4 w-148">Total MRP:</span> ₹{Math.floor(finalPayment)}</p>


                              </div>

                            </div>

                            {/* Track Order Progress */}
                            <div className="row d-flex align-items-center">
                              <div className="col-md-2">
                                <p className="text-muted mb-0 small">Track Order</p>
                              </div>
                              {order.location ? <span className='mx-3 my-2  border rounded w-100 text-center w-335'>
                                Arrived at: <span className='text-muted'>{order.location}</span>

                              </span> : null}
                              <div className="col-md-10">
                                <div className="progress" style={{ height: "6px", borderRadius: "16px" }}>
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                      width: getProgressWidth(order.status),
                                      borderRadius: "16px",
                                      backgroundColor: "#a8729a",
                                    }}
                                    aria-valuenow={parseInt(getProgressWidth(order.status), 10)}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                                <div className="d-flex justify-content-around mb-1">
                                  <p className="text-muted mt-1 mb-0 small fontsz">Processing</p>
                                  <p className="text-muted mt-1 mb-0 small fontsz">Shipped</p>

                                  <p className="text-muted mt-1 mb-0 small fontsz">Out for delivery</p>
                                  <p className="text-muted mt-1 mb-0 small fontsz">Delivered</p>
                                </div>
                              </div>
                            </div>
                            {order.status !== 'Delivered' && (
                              <button onClick={() => handleCancelOrder(order._id)} className="btn btn-danger">Cancel Order</button>
                            )}

                          </div>
                        );
                      })}
                      <div className="card-footer border-0 px-4 py-5"
                        style={{ backgroundColor: "#a8729a", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>
                        <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                          Total Shopping till Now: <span className="h2 mb-0 ms-2">₹{Math.floor(calculateTotalShopping(orders).toFixed(2))}</span>
                        </h5>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reason for Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="reasonSelect">
              <Form.Label>Select Reason</Form.Label>
              <Form.Control as="select" value={cancelReason} onChange={(e) => setCancelReason(e.target.value)}>
                <option value="">Select a reason</option>
                <option value="Incorrect size ordered">Incorrect size ordered</option>
                <option value="Product not required anymore">Product not required anymore</option>
                <option value="Cash Issue">Cash Issue</option>
                <option value="Ordered By Mistake">Ordered By Mistake</option>
                <option value="Wants to change style/color">Wants to change style/color</option>
                <option value="Delayed Delivery Cancellation">Delayed Delivery Cancellation</option>
                <option value="Duplicate Order">Duplicate Order</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="additionalComments" className="mt-3">
              <Form.Label>Additional Comments</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Optional" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={submitCancelOrder}>
            Submit Cancellation
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
