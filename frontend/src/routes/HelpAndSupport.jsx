import React from 'react';

const HelpAndSupport = () => {
  return (
    <div style={{marginTop:"100px"}} className="container">
    <div  className="container my-5">
      <div className="card shadow">
        <div style={{ background: "rgb(168, 114, 154)" }} className="card-header  text-white">
          <h3 className="card-title">Help & Support</h3>
        </div>
        <div className="card-body">
          <p className="lead">Need assistance? We're here to help!</p>

          <h5>Frequently Asked Questions</h5>
          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>How can I track my order?</strong>
              <p>You can track your order under the "My Orders" section of your account.</p>
            </li>
            <li className="list-group-item">
              <strong>What payment methods do you accept?</strong>
              <p>We accept credit/debit cards, PayPal, and more.</p>
            </li>
            <li className="list-group-item">
              <strong>How can I return a product?</strong>
              <p>Visit the "Returns" section under "My Orders" and follow the instructions.</p>
            </li>
          </ul>

          <h5>Contact Us</h5>
          <p>If you didn't find the answer you're looking for, feel free to reach out:</p>
          <ul className="list-unstyled">
            <li><strong>Email:</strong> Khushalsharma40312@gmail.com</li>
            <li><strong>Phone:</strong> +91 (701) 83-40312</li>
            <li><strong>Live Chat:</strong> Available 24/7</li>
          </ul>

         <a href="https://www.instagram.com/___terror____/"><button style={{ background: "rgb(168, 114, 154)" }} className="btn  mt-3 text-white">Chat with Us</button></a> 
        </div>
      </div>
    </div>
    </div>

  );
};

export default HelpAndSupport;
