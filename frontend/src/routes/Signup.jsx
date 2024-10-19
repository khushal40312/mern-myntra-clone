import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../store/authSlice'; // Add logout action for token expiration
import { FcPicture } from "react-icons/fc";
import toast from 'react-hot-toast';
import { decode as jwtDecode } from 'jwt-decode';

 // Import jwt-decode for decoding token

export default function Signup() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "", // Confirm password field
        gender: "",
        picture: null
    });
    const [imagePreview, setImagePreview] = useState(null); // For image preview
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.name === 'picture') {
            setCredentials({ ...credentials, [e.target.name]: e.target.files[0] });
            setImagePreview(URL.createObjectURL(e.target.files[0])); // Set image preview
        } else {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (credentials.password !== credentials.cpassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const formData = new FormData();
        formData.append('name', credentials.name);
        formData.append('email', credentials.email);
        formData.append('password', credentials.password);
        formData.append('gender', credentials.gender);
        
        // Check if the user selected a picture; otherwise, append a default picture
        if (credentials.picture) {
            formData.append('picture', credentials.picture);
        }

        // Use toast.promise to handle the signup process
        toast.promise(
            fetch("https://myntra-clone-mern.onrender.com/api/auth/createuser", {
                method: 'POST',
                body: formData
            }).then(async response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                if (json.success) {
                    localStorage.setItem('token', json.authtoken);
                    dispatch(login());
                    navigate("/");
                    return "You are signed up!";
                } else {
                    throw new Error(json.message || "Signup failed! Please try again.");
                }
            }),
            {
                loading: 'Signing up...',
                success: <b>Signup successful!</b>,
                error: <b>Signup failed! Please try again.</b>
            }
        );
    };

    const isLoggedIn = useSelector(store => store.auth.isLoggedIn);

    // Function to check if token is expired
    const checkTokenExpiration = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            const currentTime = Date.now() / 1000; // Convert to seconds
            if (decodedToken.exp < currentTime) {
                // Token has expired
                toast.error("Session expired! Please login again.");
                localStorage.removeItem("token");
                dispatch(logout()); // Log the user out on token expiry
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }

        // Check token expiration every time the component mounts
        checkTokenExpiration();

        // Optionally, you can set up an interval to regularly check for token expiration
        const interval = setInterval(() => {
            checkTokenExpiration();
        }, 60000); // Check every minute

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [isLoggedIn]);

    return (
        <>
            <div style={{ marginTop: "100px" }} className="container">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: '25px' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                                                {/* Name */}
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            name='name'
                                                            id="name"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            value={credentials.name}
                                                        />
                                                        <label className="form-label" htmlFor="name">Your Name</label>
                                                    </div>
                                                </div>

                                                {/* Email */}
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            name='email'
                                                            type="email"
                                                            id="email"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            value={credentials.email}
                                                        />
                                                        <label className="form-label" htmlFor="email">Your Email</label>
                                                    </div>
                                                </div>

                                                {/* Password */}
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            name='password'
                                                            type="password"
                                                            id="password"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            value={credentials.password}
                                                        />
                                                        <label className="form-label" htmlFor="password">Password</label>
                                                    </div>
                                                </div>

                                                {/* Confirm Password */}
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            name='cpassword'
                                                            type="password"
                                                            id="cpassword"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            value={credentials.cpassword}
                                                        />
                                                        <label className="form-label" htmlFor="cpassword">Repeat your password</label>
                                                    </div>
                                                </div>

                                                {/* Gender */}
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-venus-mars fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <select
                                                            name='gender'
                                                            id="gender"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                            value={credentials.gender}
                                                        >
                                                            <option value="">Select Gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                        <label className="form-label" htmlFor="gender">Gender</label>
                                                    </div>
                                                </div>

                                                {/* Profile Picture */}
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <FcPicture size={30} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            name='picture'
                                                            type="file"
                                                            id="picture"
                                                            className="form-control"
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-label" htmlFor="picture">Upload Profile Picture</label>
                                                        {imagePreview && <img src={imagePreview} alt="Profile Preview" style={{ marginTop: '10px', maxWidth: '150px' }} />}
                                                    </div>
                                                </div>

                                                {/* Submit Button */}
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button
                                                        disabled={
                                                            credentials.password.length < 3 ||
                                                            credentials.email.length < 3 ||
                                                            credentials.name.length < 3 ||
                                                            !credentials.gender ||
                                                            credentials.password !== credentials.cpassword
                                                        }
                                                        type="submit"
                                                        className="btn btn-primary btn-lg"
                                                    >
                                                        Register
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img
                                                src='/images/ff.png'
                                                className="img-fluid rounded"
                                                alt="Sample image"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
