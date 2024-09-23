import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{marginTop:"100px"}}  className="container">
    <div className="container my-5">
      <div className="card shadow">
        <div style={{ background: "rgb(168, 114, 154)" }} className="card-header  text-white">
          <h3 className="card-title">Privacy Policy</h3>
        </div>
        <div className="card-body">
          <p className="lead">
            At Arigato!, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h5>Information We Collect</h5>
          <p>
            We may collect the following types of personal information from you:
          </p>
          <ul className="list-group mb-3">
            <li className="list-group-item"><strong>Personal Data:</strong> Name, email address, billing address, shipping address, and phone number.</li>
            <li className="list-group-item"><strong>Payment Information:</strong> Credit card details and payment transaction information.</li>
            <li className="list-group-item"><strong>Account Information:</strong> Username, password, and account preferences.</li>
            <li className="list-group-item"><strong>Usage Data:</strong> Information about your interaction with our website, such as browsing history, search terms, and click actions.</li>
            <li className="list-group-item"><strong>Device Information:</strong> IP address, browser type, operating system, and device type.</li>
          </ul>

          <h5>How We Use Your Information</h5>
          <p>
            We use your personal information for the following purposes:
          </p>
          <ul className="list-group mb-3">
            <li className="list-group-item">To process and manage your orders, including payments and shipping.</li>
            <li className="list-group-item">To communicate with you about your orders, promotions, and updates.</li>
            <li className="list-group-item">To improve our website and services, by analyzing user interactions and feedback.</li>
            <li className="list-group-item">To protect against fraud and ensure the security of our website.</li>
            <li className="list-group-item">To comply with legal obligations and resolve disputes.</li>
          </ul>

          <h5>How We Share Your Information</h5>
          <p>
            We may share your information with third parties in the following situations:
          </p>
          <ul className="list-group mb-3">
            <li className="list-group-item"><strong>Service Providers:</strong> We may share your data with third-party vendors who help us operate the website, process payments, or ship products.</li>
            <li className="list-group-item"><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business deal.</li>
            <li className="list-group-item"><strong>Legal Compliance:</strong> We may disclose your information if required by law, or in response to valid legal requests from public authorities.</li>
          </ul>

          <h5>Your Choices</h5>
          <p>
            You have the following choices regarding your personal data:
          </p>
          <ul className="list-group mb-3">
            <li className="list-group-item">You can update your account information at any time through the account settings on our website.</li>
            <li className="list-group-item">You can opt-out of receiving promotional communications by following the unsubscribe instructions in emails.</li>
            <li className="list-group-item">You can request the deletion of your personal information by contacting us at <a href="mailto:khushalsharma40312@gmail.com">khushalsharma40312@gmail.com</a>.</li>
          </ul>

          <h5>Data Security</h5>
          <p>
            We take the security of your personal information seriously and implement industry-standard measures to protect it from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is completely secure, so we cannot guarantee absolute security.
          </p>

          <h5>Changes to This Policy</h5>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. We will notify you of any significant changes by posting the new policy on our website and updating the "Last Updated" date.
          </p>

          <h5>Contact Us</h5>
          <p>
            If you have any questions about this Privacy Policy or how we handle your data, please contact us at:
          </p>
          <ul className="list-unstyled">
            <li><strong>Email:</strong>khushalsharma40312@gmail.com</li>
            <li><strong>Phone:</strong> +91 (701) 83-40312</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default PrivacyPolicy;
