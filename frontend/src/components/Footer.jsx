import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_column">
          <h3>Shop By Category</h3>
          <a href="#">Men's Clothing</a>
          <a href="#">Women's Clothing</a>
          <a href="#">Kids' Clothing</a>
          <a href="#">Home & Living</a>
          <a href="#">Beauty Products</a>
          <a href="#">Gift Cards</a>
          <a href="#">Loyalty Programs</a>
        </div>

        <div className="footer_column">
          <h3>Customer Service</h3>
          <a href="#">Help & Support</a>
          <a href="#">Return Policy</a>
          <a href="#">Order Tracking</a>
          <a href="#">Contact Us</a>
          <a href="#">FAQs</a>
          <a href="#">Shipping Information</a>
        </div>

        <div className="footer_column">
          <h3>About Us</h3>
          <a href="#">Our Story</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
          <a href="#">Investor Relations</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
      <hr />
      <div className="copyright">
        © 2024 Khushal Sharma. All rights reserved.
      </div>
    </footer>
  );
}
