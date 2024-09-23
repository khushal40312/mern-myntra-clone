import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './Dropdown.css';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import myntrastore from './store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingSpinner from './components/LoadingSpinner.jsx'; // Import the LoadingSpinner


// Lazy load components
const App = lazy(() => import('./routes/App.jsx'));
const Home = lazy(() => import('./routes/Home.jsx'));
const Beauty = lazy(() => import('./routes/Beauty.jsx'));
const Homeliving = lazy(() => import('./routes/Homeliving.jsx'));
const Women = lazy(() => import('./routes/Women.jsx'));
const Kids = lazy(() => import('./routes/Kids.jsx'));
const Login = lazy(() => import('./routes/Login.jsx'));
const Signup = lazy(() => import('./routes/Signup.jsx'));
const AdminPanel = lazy(() => import('./routes/AdminPanel.jsx'));
const Men = lazy(() => import('./routes/Men.jsx'));
const Electronics = lazy(() => import('./routes/Electronics.jsx'));
const Success = lazy(() => import('./routes/Success.jsx'));
const Cancel = lazy(() => import('./routes/Cancel.jsx'));
const MyOrders = lazy(() => import('./routes/MyOrders.jsx'));
const Address = lazy(() => import('./routes/Address.jsx'));
const AdminPanel2 = lazy(() => import("./routes/AdminPanel2.jsx"))
const GiftCard = lazy(() => import("./routes/GiftCard.jsx"))
const HelpAndSupport = lazy(() => import("./routes/HelpAndSupport.jsx"))
const ReturnPolicy = lazy(() => import("./routes/ReturnPolicy.jsx"))
const FAQ = lazy(() => import("./routes/FAQ.jsx"))
const OurStory = lazy(() => import("./routes/OurStory.jsx"))
const Careers = lazy(() => import("./routes/Careers.jsx"))
const Press = lazy(() => import("./routes/Press.jsx"))
const InvestorRelations = lazy(() => import("./routes/InvestorRelations.jsx"))
const PrivacyPolicy = lazy(() => import("./routes/PrivacyPolicy.jsx"))
const TermOfServices = lazy(() => import("./routes/TermOfServices.jsx"))











const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<LoadingSpinner />}><App /></Suspense>,
    children: [
      { path: "/", element: <Suspense fallback={<LoadingSpinner />}><Home /></Suspense> },
      { path: "/men", element: <Suspense fallback={<LoadingSpinner />}><Men /></Suspense> },
      { path: "/beauty", element: <Suspense fallback={<LoadingSpinner />}><Beauty /></Suspense> },
      { path: "/homeliving", element: <Suspense fallback={<LoadingSpinner />}><Homeliving /></Suspense> },
      { path: "/studio", element: <Suspense fallback={<LoadingSpinner />}><Electronics /></Suspense> },
      { path: "/women", element: <Suspense fallback={<LoadingSpinner />}><Women /></Suspense> },
      { path: "/kids", element: <Suspense fallback={<LoadingSpinner />}><Kids /></Suspense> },
      { path: "/login", element: <Suspense fallback={<LoadingSpinner />}><Login /></Suspense> },
      { path: "/signup", element: <Suspense fallback={<LoadingSpinner />}><Signup /></Suspense> },
      { path: "/adminpanel", element: <Suspense fallback={<LoadingSpinner />}><AdminPanel /></Suspense> },
      { path: "/success", element: <Suspense fallback={<LoadingSpinner />}><Success /></Suspense> },
      { path: "/cancel", element: <Suspense fallback={<LoadingSpinner />}><Cancel /></Suspense> },
      { path: "/orders", element: <Suspense fallback={<LoadingSpinner />}><MyOrders /></Suspense> },
      { path: "/address", element: <Suspense fallback={<LoadingSpinner />}><Address /></Suspense> },
      { path: "/adminpanel2", element: <Suspense fallback={<LoadingSpinner />}><AdminPanel2 /></Suspense> },
      { path: "/giftcard", element: <Suspense fallback={<LoadingSpinner />}><GiftCard /></Suspense> },
      { path: "/helpandsupport", element: <Suspense fallback={<LoadingSpinner />}><HelpAndSupport /></Suspense> },
      { path: "/returnpolicy", element: <Suspense fallback={<LoadingSpinner />}><ReturnPolicy /></Suspense> },
      { path: "/faq", element: <Suspense fallback={<LoadingSpinner />}><FAQ /></Suspense> },
      { path: "/ourstory", element: <Suspense fallback={<LoadingSpinner />}><OurStory /></Suspense> },
      { path: "/careers", element: <Suspense fallback={<LoadingSpinner />}><Careers /></Suspense> },
      { path: "/press", element: <Suspense fallback={<LoadingSpinner />}><Press /></Suspense> },
      { path: "/investorrelations", element: <Suspense fallback={<LoadingSpinner />}><InvestorRelations /></Suspense> },
      { path: "/privacypolicy", element: <Suspense fallback={<LoadingSpinner />}><PrivacyPolicy /></Suspense> },
      { path: "/tc", element: <Suspense fallback={<LoadingSpinner />}><TermOfServices /></Suspense> },











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
