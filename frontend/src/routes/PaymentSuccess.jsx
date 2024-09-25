import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const navigate = useNavigate();
    const BagItems = useSelector(store => store.bag);

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                // Confirm payment
                const response = await fetch(`https://myntra-clone-mern.onrender.com/api/items/confirm-payment/${sessionId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();

                if (result.paymentStatus === 'paid') {
                    // Place the order in the backend
                    const orderResponse = await fetch("https://myntra-clone-mern.onrender.com/api/items/createOrder", {
                        method: "POST",
                        headers: {
                            'auth-token': localStorage.getItem('token'),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(BagItems[0]), // Include your product details
                    });

                    if (orderResponse.ok) {
                        return 'Order placed successfully!';
                    } else {
                        throw new Error('Failed to place order.');
                    }
                } else {
                    throw new Error('Payment failed. Please try again.');
                }
            } catch (error) {
                throw new Error('Error confirming payment.');
            }
        };

        if (sessionId) {
            // Using toast.promise to handle the confirmation and order placement process
            toast.promise(
                confirmPayment(),
                {
                    loading: 'Processing payment...',
                    success: <b>Order placed successfully!</b>,
                    error: <b>Payment failed or order could not be placed.</b>,
                }
            ).then(() => {
                navigate('/orders'); // Redirect on success
            }).catch(() => {
                navigate('/cancel'); // Redirect on failure
            });
        }
    }, [sessionId, BagItems, navigate]);

    return <div style={{ marginTop: "100px" }} className='container text-center'>Processing payment...</div>;
}
