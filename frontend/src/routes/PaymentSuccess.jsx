import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const navigate = useNavigate();

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                const response = await fetch(`https://myntra-clone-mern.onrender.com/api/items/confirm-payment/${sessionId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();

                if (result.paymentStatus === 'paid') {
                    // Now place the order in the backend
                    const orderResponse = await fetch("https://myntra-clone-mern.onrender.com/api/items/createOrder", {
                        method: "POST",
                        headers: {
                            'auth-token': localStorage.getItem('token'),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(result.products), // Include your product details
                    });

                    if (orderResponse.ok) {
                        toast.success("Order placed successfully!");
                        navigate('/orders');
                    } else {
                        toast.error("Failed to place order.");
                    }
                } else {
                    toast.error("Payment failed. Please try again.");
                    navigate('/checkout');
                }
            } catch (error) {
                toast.error("Error confirming payment.");
                navigate('/checkout');
            }
        };

        if (sessionId) {
            confirmPayment();
        }
    }, [sessionId, navigate]);

    return <div style={{marginTop:"100px"}} className='container text-center'>Processing payment...</div>;
}
