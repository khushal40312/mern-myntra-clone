import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import moment from 'moment';
import { FaCartFlatbed } from "react-icons/fa6";
import { FaSmileBeam } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useSelector } from 'react-redux';
// import { retry } from '@reduxjs/toolkit/query';

export default function MyOrders() {
    const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
    const navigate = useNavigate()

    const [orders, setOrders] = useState([]);
    const [noOrders, setNoOrders] = useState(false); // State to track no orders case
    const [loading, setLoading] = useState(true); // New loading state
    useEffect(() => {
        // setLoading(true)
        const token = localStorage.getItem('token');

        fetch("http://localhost:8009/api/items/trackOrder", {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "No orders found for this user.") {
                    setNoOrders(true); // Set flag if no orders found
                } else {
                    setOrders(data); // Assuming the response data is the array of orders
                }
                setLoading(false); // Stop loading once data is fetched
            })
            .catch(error => {
                console.error("There was an error fetching the order data!", error);
                setLoading(false); // Stop loading if there's an error
            });
    }, []);
    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/")

        }
    }, [])
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
                return '19%';
        }
    };

    const formatDate = (dateString) => {
        return moment(dateString).format('YYYY-MM-DD');
    };

    const calculateGST = (subtotal) => {
        return subtotal * 0.18;
    };

    // Function to calculate the total shopping amount including GST
    const calculateTotalShopping = (orders) => {
        return orders.reduce((acc, order) => {
            const totalMRP = order.items.reduce((sum, item) => sum + item.original_price, 0);
            const totalDiscount = order.items.reduce((sum, item) => sum + (item.original_price - item.current_price), 0);
            const subtotal = totalMRP - totalDiscount;
            const gst = calculateGST(subtotal);
            const finalPayment = subtotal + gst; // GST applied on subtotal

            return acc + finalPayment;
        }, 0);
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

                                <div className="card-body p-4"> {loading ? (
                                    <> <Skeleton count={16} />
                                    </>) :
                                    noOrders ? (<div className="text-center">
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

                                            {/* Map through each order */}
                                            {orders.map((order, index) => {
                                                const totalMRP = order.items.reduce((acc, item) => acc + item.original_price, 0);
                                                const totalDiscount = order.items.reduce((acc, item) => acc + (item.original_price - item.current_price), 0);
                                                const subtotal = totalMRP - totalDiscount;
                                                const gst = calculateGST(subtotal);
                                                const finalPayment = subtotal + gst; // GST applied on subtotal

                                                return (
                                                    <div key={index} className="mb-5">
                                                        <h5 className="text-muted">Order #{index + 1}</h5>
                                                        {/* Iterate through the items in this order */}
                                                        {order.items.map((item) => (
                                                            <div key={item.id} className="card shadow-0 border mb-4">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                       

                                                                    </div>
                                                                    <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: 1 }} />
                                                                </div>
                                                            </div>
                                                        ))}

                                                        {/* Order Summary */}
                                                        <div className="d-flex justify-content-between flex-column pt-2">

                                                            <div className="d-flex justify-content-between pt-2">
                                                                <p className="fw-bold mb-0">Order Details</p>
                                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Original Price</span> ₹{totalMRP}</p>
                                                            </div>

                                                            <div className="d-flex justify-content-between pt-2">
                                                                <p className="text-muted mb-0">Invoice Number: {order.invoiceNumber}</p>
                                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Discount</span> ₹{totalDiscount}</p>
                                                            </div>

                                                            <div className="d-flex justify-content-between">
                                                                <p className="text-muted mb-0">Invoice Date: {formatDate(order.date)}</p>
                                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Current Price:</span> ₹{subtotal}</p>
                                                            </div>

                                                            <div className="d-flex justify-content-between">
                                                                <p className="text-muted mb-0">Receipts Voucher: {order.receiptVoucher}</p>
                                                                <p className="text-muted mb-0"><span className="fw-bold me-4">GST 18%</span> ₹{gst.toFixed(2)}</p>

                                                            </div>

                                                            <div className="d-flex justify-content-between mb-5">
                                                                <p className="text-muted mb-0">Delivery Charges</p>
                                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Free</span></p>
                                                                <p className="text-muted mb-0"><span className="fw-bold me-4">Total MRP:</span> ₹{Math.floor(finalPayment)}</p>


                                                            </div>

                                                        </div>

                                                        {/* Track Order Progress */}
                                                        <div className="row d-flex align-items-center">
                                                            <div className="col-md-2">
                                                                <p className="text-muted mb-0 small">Track Order</p>
                                                            </div>
                                                            <span className='mx-3 my-2 text-muted border rounded w-50 text-center'>
                                                                Arrived at: <strong>{order.location}</strong>

                                                            </span>
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
                                                                    <p className="text-muted mt-1 mb-0 small">Processing</p>
                                                                    <p className="text-muted mt-1 mb-0 small">Shipped</p>

                                                                    <p className="text-muted mt-1 mb-0 small">Out for delivery</p>
                                                                    <p className="text-muted mt-1 mb-0 small">Delivered</p>
                                                                </div>
                                                            </div>
                                                        </div>
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

        </div>
    );
}