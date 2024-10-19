import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import 'react-notifications-component/dist/theme.css';
import toast from 'react-hot-toast';
import { decode as jwtDecode } from 'jwt-decode';





export default function Login() {
  const isLoggedIn = useSelector(store => store.auth.isLoggedIn);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.promise(
      fetch("https://myntra-clone-mern.onrender.com/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      })
      .then(async (response) => {
        const json = await response.json();
        if (json.success) {
          const token = json.authtoken;
          const decodedToken = jwt_decode(token);
          localStorage.setItem('token', token);
          localStorage.setItem('token-expiration', decodedToken.exp);

          dispatch(login());
          navigate("/");
          return "You Are Logged-in!";
        } else {
          throw new Error(json.message || "Login failed! Please check your credentials.");
        }
      }),
      {
        loading: 'Logging in...',
        success: <b>Logged in successfully!</b>,
        error: (err) => <b>{err.message}</b>
      }
    );
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('token-expiration');
    const currentTime = Date.now() / 1000;

    if (isLoggedIn || (token && currentTime < tokenExpiration)) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const tokenExpiration = localStorage.getItem('token-expiration');
      const currentTime = Date.now() / 1000;

      if (tokenExpiration && currentTime > tokenExpiration) {
        localStorage.removeItem('token');
        localStorage.removeItem('token-expiration');
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      <div style={{ marginTop: "100px" }} className="d-flex justify-content-center ">
        <h2>Log-in To Myntra First</h2>
      </div>
      <div className="container">
        <form style={{ border: "9px solid #fa94a6", borderRadius: "10px" }} onSubmit={handleSubmit}>
          <div data-mdb-input-init className="mb-4">
            <input
              onChange={onChange}
              value={credentials.email}
              type="email"
              className="form-control"
              id="email"
              name='email'
              placeholder="Enter email"
            />
            <label className="form-label" htmlFor="email">Email address</label>
          </div>

          <div data-mdb-input-init className="mb-4">
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
              <span style={{ fontSize: "14px" }} className="my-1">Sign up</span>
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}
