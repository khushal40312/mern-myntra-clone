import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div style={{marginTop:"100px"}} className="container">
    <div className="container my-5">
      <div className="card shadow">
        <div style={{ background: "rgb(168, 114, 154)" }}  className="card-header  text-white">
          <h3 className="card-title">Terms of Service</h3>
        </div>
        <div className="card-body">
          <p className="lead">
            Welcome to Arigato! By accessing or using our website and services, you agree to comply with and be bound by these Terms of Service. Please read them carefully.
          </p>

          <h5>1. Acceptance of Terms</h5>
          <p>
            By using our website, you agree to these terms. If you do not agree, you must not use the site or services.
          </p>

          <h5>2. Use of Our Services</h5>
          <p>
            You agree to use our website and services only for lawful purposes and in compliance with all applicable laws and regulations. You are responsible for all activities that occur under your account.
          </p>

          <h5>3. Account Registration</h5>
          <p>
            To access certain features of our services, you may be required to create an account. You agree to provide accurate, current, and complete information, and to keep your account information updated.
          </p>

          <h5>4. User Conduct</h5>
          <p>You agree not to:</p>
          <ul className="list-group mb-3">
            <li className="list-group-item">Use the website for any illegal purposes or in violation of any laws.</li>
            <li className="list-group-item">Submit false or misleading information.</li>
            <li className="list-group-item">Attempt to gain unauthorized access to other user accounts or the website's infrastructure.</li>
            <li className="list-group-item">Engage in conduct that would disrupt the normal operation of the site.</li>
          </ul>

          <h5>5. Product and Service Availability</h5>
          <p>
            All products and services are subject to availability. We reserve the right to discontinue or modify any product or service without notice.
          </p>

          <h5>6. Payment and Billing</h5>
          <p>
            All purchases made on Arigato! are subject to our pricing and billing policies. We reserve the right to adjust prices at any time. By providing payment information, you agree that we may charge your payment method for the total amount of your order, including taxes and shipping.
          </p>

          <h5>7. Shipping and Delivery</h5>
          <p>
            Shipping times and costs may vary based on location and the availability of products. We are not responsible for any delays caused by third-party shipping providers.
          </p>

          <h5>8. Returns and Refunds</h5>
          <p>
            Our return and refund policy is outlined in our <Link to="/returnpolicy">Return Policy</Link>. Please review it before making a purchase.
          </p>

          <h5>9. Limitation of Liability</h5>
          <p>
            Arigato! will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use or inability to use our website and services. This includes, but is not limited to, loss of profits, data, or other intangible losses.
          </p>

          <h5>10. Changes to Terms</h5>
          <p>
            We reserve the right to modify these Terms of Service at any time. Any changes will be posted on this page, and the "Last Updated" date will be revised accordingly. Continued use of the website following any changes constitutes acceptance of those changes.
          </p>

          <h5>11. Termination</h5>
          <p>
            We may terminate or suspend your account and access to our services at any time, without prior notice, for any conduct that we deem to be in violation of these Terms or is harmful to Arigato! or its users.
          </p>

          <h5>12. Governing Law</h5>
          <p>
            These Terms of Service are governed by and construed in accordance with the laws of the country in which Arigato! operates, without regard to its conflict of law principles.
          </p>

          <h5>13. Contact Information</h5>
          <p>
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <ul className="list-unstyled">
            <li><strong>Email:</strong>khushalsharma40312@gmail.com</li>
            <li><strong>Phone:</strong>  +91 (701) 83-40312</li>
          </ul>

        </div>
      </div>
    </div>
    </div>
  );
};

export default TermsOfService;
