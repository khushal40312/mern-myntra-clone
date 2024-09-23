import React from 'react';

const ReturnPolicy = () => {
  return (
    <div style={{marginTop:"100px"}} className="container">
    <div  className="container my-5">
      <div  className="card shadow">
        <div style={{ backgroundColor: "rgb(168, 114, 154)" }}  className="card-header  text-white">
          <h3  className="card-title">Return Policy</h3>
        </div>
        <div  className="card-body">
          <p className="lead">At Arigato!, we want you to be completely satisfied with your purchase. If you're not, we’re here to help!</p>

          <h5>Eligibility for Returns</h5>
          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>Return Period:</strong> You can return items within 30 days of receipt for a full refund.
            </li>
            <li className="list-group-item">
              <strong>Condition:</strong> Items must be in their original condition, unused, and with all tags and packaging intact.
            </li>
            <li className="list-group-item">
              <strong>Exceptions:</strong> Certain items like intimate wear, perishable goods, or customized products are not eligible for returns.
            </li>
          </ul>

          <h5>How to Initiate a Return</h5>
          <p>To start a return, visit the "My Orders" section, find the item you wish to return, and click the "Return" button. Follow the on-screen instructions to generate a return label.</p>

          <h5>Refund Process</h5>
          <p>Once we receive your return, we will inspect the item and notify you. If approved, the refund will be processed to your original payment method within 7-10 business days.</p>

          <h5>Need Assistance?</h5>
          <p>If you have any questions or issues with your return, contact our support team:</p>
          <ul className="list-unstyled">
            <li><strong>Email:</strong> Khushalsharma40312@gmail.com</li>
            <li><strong>Phone:</strong> +91 (701) 83-40312</li>
            <li><strong>Live Chat:</strong> Available 24/7</li>
          </ul>

    
        </div>
      </div>
    </div>
    </div>

  );
};

export default ReturnPolicy;
