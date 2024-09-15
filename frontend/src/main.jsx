import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './routes/App.jsx';
import Home from './routes/Home.jsx';
import './Dropdown.css';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import myntrastore from './store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Beauty from './routes/Beauty.jsx';
import Homeliving from './routes/Homeliving.jsx';
import Women from './routes/Women.jsx';
import Kids from './routes/Kids.jsx';
import Login from './routes/Login.jsx';
import Signup from './routes/Signup.jsx';
import AdminPanel from './routes/AdminPanel.jsx';
import Men from './routes/Men.jsx';
import Electronics from './routes/Electronics.jsx';
import Success from './routes/Success.jsx';
import Cancel from './routes/Cancel.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/men", element: <Men /> }, // Men route
      { path: "/beauty", element: <Beauty /> }, // Beauty route
      { path: "/homeliving", element: <Homeliving /> }, // HomeLiving route
      { path: "/studio", element: <Electronics /> }, // Studio route
      { path: "/women", element: <Women /> }, // Women route
      { path: "/kids", element: <Kids /> }, // Kids route
      { path: "/login", element: <Login /> }, // Login route
      { path: "/signup", element: <Signup /> },
      { path: "/adminpanel", element: <AdminPanel /> },
      { path: "/success", element: <Success /> },

      { path: "/cancel", element: <Cancel /> },

       // Signup route
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={myntrastore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
