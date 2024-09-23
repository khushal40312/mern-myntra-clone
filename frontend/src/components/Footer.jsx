import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_column">
          <h3>Shop By Category</h3>
          <Link to="/men">Men's Clothing</Link>
          <Link to="/women">Women's Clothing</Link>
          <Link to="kids">Kids' Clothing</Link>
          <Link to="/homeliving">Home & Living</Link>
          <Link to="/beauty">Beauty Products</Link>
          <Link to="/giftcard">Gift Cards</Link>

        </div>

        <div className="footer_column">
          <h3>Customer Service</h3>
          <Link to="/helpandsupport">Help & Support</Link>
          <Link to="/returnpolicy">Return Policy</Link>
          <Link to="/orders">Order Tracking</Link>
          <Link to="/helpandsupport">Contact Us</Link>
          <Link to="/faq">FAQs</Link>
          <Link to="/orders">Shipping Information</Link>
        </div>

        <div className="footer_column">
          <h3>About Us</h3>
          <Link to="/ourstory">Our Story</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/press">Press</Link>
          <Link to="/investorrelations">Investor Relations</Link>
          <Link to="/privacypolicy">Privacy Policy</Link>
          <Link to="/tc">Terms of Service</Link>
        </div>
      </div>
      <hr />
      <div className="copyright">
        © 2024 Khushal Sharma. All rights reserved.
      </div>
    </footer>
  );
}
