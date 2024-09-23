import React, { useEffect, useState } from 'react';
import { VscRemoteExplorer } from 'react-icons/vsc';
import { FaCartFlatbed } from 'react-icons/fa6'; // Import the icon
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import toast from 'react-hot-toast';

export default function AdminPanel2() {
    const isAdmin = useSelector((state) => state.admin.isAdmin);
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusUpdate, setStatusUpdate] = useState({});
    const [locationUpdate, setLocationUpdate] = useState({});
   



    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchOrders = fetch("https://myntra-clone-mern.onrender.com/api/items/allOrders", {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());

        const fetchAddresses = fetch("https://myntra-clone-mern.onrender.com/api/items/getAllAddresses", {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());

        Promise.all([fetchOrders, fetchAddresses])
            .then(([orderData, addressData]) => {
                // Ensure that we set the orders to an array if no orders are found
                setOrders(Array.isArray(orderData) ? orderData : []);
                setAddresses(addressData || []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching orders or addresses:", error);
                setOrders([]);
                setLoading(false);
            });
    }, []);

    const handleStatusChange = (orderId, newStatus) => {
      
        setStatusUpdate((prevStatus) => ({
            ...prevStatus,
            [orderId]: newStatus,
        }));
    };

    const handleLocationChange = (orderId, newLocation) => {
        setLocationUpdate((prevLocation) => ({
            ...prevLocation,
            [orderId]: newLocation,  // Set to empty string if the input is cleared
        }));
    };
    const handleUpdateOrder = (orderId) => {
        const order = orders.find((order) => order._id === orderId);

        // Use updated state or fallback to the existing order status/location
        const updatedStatus = statusUpdate[orderId] || order.status;
        const updatedLocation = locationUpdate[orderId] || order.location || '';

        // Check if the status is "Out for delivery" and validate the location field
        if (updatedStatus === 'Out for delivery' && !updatedLocation.trim()) {
            toast.error("Location is required when the order is 'Out for delivery'");
            return; // Prevent further execution if validation fails
        }

        const token = localStorage.getItem('token');
        fetch(`http://localhost:8009/api/items/admin/updateOrderStatus/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token,
            },
            body: JSON.stringify({
                status: updatedStatus,
                location: updatedLocation,
            }),
        })
            .then(response => response.json())
            .then(data => {
                toast.success("Order updated successfully");
                // Refetch orders after successful update
                setLoading(true); // Set loading to true before refetching
                fetchOrdersAndAddresses();
            })
            .catch(error => {
                console.error("Error updating order:", error);
                toast.error("Failed to update order");
            });
    };



    // A helper function to refetch orders and addresses
    const fetchOrdersAndAddresses = () => {
        const token = localStorage.getItem('token');
        const fetchOrders = fetch("https://myntra-clone-mern.onrender.com/api/items/allOrders", {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());

        const fetchAddresses = fetch("https://myntra-clone-mern.onrender.com/api/items/getAllAddresses", {
            method: 'GET',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
        }).then(response => response.json());

        Promise.all([fetchOrders, fetchAddresses])
            .then(([orderData, addressData]) => {
                setOrders(Array.isArray(orderData) ? orderData : []);
                setAddresses(addressData || []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching orders or addresses:", error);
                setOrders([]);
                setLoading(false);
            });
    };


    useEffect(() => {
        if (!isAdmin) {
            navigate("/");
        }
    }, [isAdmin, navigate]);

    if (loading) {
        return <Skeleton count={5} />;
    }

    const formatDate = (dateString) => {
        return moment(dateString).format('YYYY-MM-DD');
    };

    const getAddressForUser = (userId) => {
        return addresses.find((address) => address.user === userId);
    };

    return (
        <div style={{ marginTop: "100px" }} className="container">
            <div className="container h-100">
                <nav className="container w-25 d-flex flex-row justify-content-center border rounded btn btn-success my-2">
                    <Link className="nav-link mx-2" to="/adminpanel">
                        <VscRemoteExplorer size={30} /> Item Handle Side
                    </Link>
                </nav>
            </div>

            <section className="h-100 gradient-custom">
                <div className="container py-5 h-100">
                    {/* Check if orders exist */}
                    {orders.length === 0 ? (
                        <div className="text-center">
                            <h5>No orders found!</h5>
                            <p>It looks like there aren't any orders yet.</p>
                            <div className="container">
                                <FaCartFlatbed size={100} />
                            </div>
                        </div>
                    ) : (
                        // Render orders if available
                        orders.map((order) => {
                            const address = getAddressForUser(order.user);

                            return (
                                <div key={order._id} className="card mb-4" style={{ borderRadius: '10px' }}>
                                    <div className="card-header px-4 py-5">
                                        <h5 className="text-muted mb-0 ">
                                            Order #{order.invoiceNumber}  - Invoice: {order.receiptVoucher}
                                        </h5>
                                        <h4 className='align-text-center text-warning bg-dark'>Status: {order.status}</h4>
                                        <h5 className="text-muted mb-0">Date of order: {formatDate(order.date)}</h5>
                                        {address && (
                                            <div>
                                                <p>Name: {address.name}</p>
                                                <p>Mobile: {address.mobile}</p>
                                                <p>Address: {address.address}, {address.locality}, {address.city}, {address.state} - {address.pincode}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-body p-4">
                                        {order.items.map((item) => (
                                            <div key={item._id} className="row mb-3">
                                                <div className="col-md-2">
                                                    <img
                                                        src={item.image}
                                                        className="img-fluid"
                                                        alt={item.item_name}
                                                    />
                                                </div>
                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0">{item.item_name}</p>
                                                </div>
                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                    <p className="text-muted mb-0">Rs{item.current_price}</p>
                                                </div>
                                                <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                                    {order.location ? <p className="text-muted mb-0">Item at: {order.location}</p> : <p className="text-muted mb-0">Set location</p>}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="row mt-4">
                                            <div className="col-md-4">
                                                <label htmlFor="statusSelect">Update Status</label>
                                                <select
                                                    id="statusSelect"
                                                    className="form-select"
                                                    value={statusUpdate[order._id] || order.status}
                                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                >
                                                    <option value="processing">processing</option>

                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Out for delivery">Out for Delivery</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </div>

                                           <div className="col-md-4">
                                                <label htmlFor="locationInput">Update Location</label>
                                                <input
                                                    id="locationInput"
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Enter location"
                                                    value={locationUpdate[order._id] ?? ''}  // Fall back to empty string instead of the old value
                                                    onChange={(e) => handleLocationChange(order._id, e.target.value)}
                                                />
                                            </div>

                                            <div className="col-md-4 d-flex align-items-end">
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleUpdateOrder(order._id)}
                                                >
                                                    Update Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </section>
        </div>
    );
}
