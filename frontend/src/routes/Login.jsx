import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import 'react-notifications-component/dist/theme.css';
import toast from 'react-hot-toast';


export default function Login() {

  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Use dispatch to trigger actions

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8009/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
    

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            dispatch(login());
            navigate("/");
            toast.success("You Are Logged-in !")
        }else {
         
            toast.error(json.message || "Login failed! Please check your credentials.");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
useEffect(()=>{

if(isLoggedIn)
{
navigate("/")

}
},[])
    return (
        <>

 {/* Add ToastContainer to render toast messages */}
            <div style={{ marginTop: "100px" }} className="d-flex justify-content-center ">
                <h2>Log-in To Myntra First</h2>
            </div>
            <div className="container">
                <form style={{
                    border: "9px solid #fa94a6",
                    borderRadius: "10px"
                }} onSubmit={handleSubmit}>
                    <div data-mdb-input-init className=" mb-4">
                        <input
                            onChange={onChange}
                            value={credentials.email}
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            name='email'
                            placeholder="Enter email"
                        />
                        <label className="form-label" htmlFor="email">Email address</label>
                    </div>

                    <div data-mdb-input-init className=" mb-4">
                        <input
                            onChange={onChange}
                            value={credentials.password}
                            type="password"
                            className="form-control"
                            id="password"
                            name='password'
                            placeholder="Password"
                        />
                        <label className="form-label" htmlFor="password">Password</label>
                    </div>

                    <button data-mdb-ripple-init type="submit" className="btn btn-danger btn-block my-2 mx-3">
                        Sign in
                    </button>

                    <Link to="/signup" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'normal' }}>
                        <button data-mdb-ripple-init type="button" className="btn btn-success btn-block">
                            <span className="action_name my-1">Sign up</span>
                        </button>
                    </Link>
                   
                </form>
            </div>
        </>
    );
}
