import React from 'react';

const OurStory = () => {
  return (
    <div style={{marginTop:"100px"}} className="container">
    <div className="container my-5">
      <div className="card shadow">
        <div style={{ backgroundColor: "rgb(168, 114, 154)" }}  className="card-header  text-white">
          <h3 className="card-title">Our Story</h3>
        </div>
        <div className="card-body">
          <p className="lead">Welcome to Arigato! Here's how we started and what drives us every day.</p>

          <h5>How It All Began</h5>
          <p>
            Arigato! was born from a simple idea: to make quality products accessible to everyone. Our founders, driven by a passion for excellence and customer satisfaction, 
            started this journey in [2024]. What began as a small project has grown into a thriving business, thanks to the love and support of our customers.
          </p>

          <h5>Our Mission</h5>
          <p>
            At Arigato!, our mission is to deliver exceptional products and a seamless shopping experience. We believe in the power of great design, quality craftsmanship, and 
            the joy of discovering new, exciting products. Every item we offer is carefully curated, with our customers' needs in mind.
          </p>

          <h5>The Arigato! Difference</h5>
          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>Quality Products:</strong> We go the extra mile to ensure that everything we offer is top-notch, from materials to functionality.
            </li>
            <li className="list-group-item">
              <strong>Customer-Centric Approach:</strong> Our customers are at the heart of everything we do. Your satisfaction is our priority, and we strive to exceed your expectations every time.
            </li>
            <li className="list-group-item">
              <strong>Innovative Shopping Experience:</strong> We continuously work on making our platform more user-friendly, efficient, and fun to use.
            </li>
          </ul>

          <h5>Looking Ahead</h5>
          <p>
            As we continue to grow, our commitment to providing the best products and customer experience remains stronger than ever. We're excited for the future and look forward to 
            bringing even more value to our customers through innovation and dedication.
          </p>

          <p className="text-center mt-5">
            <em>"Thank you for being part of our journey. Together, we make Arigato! special."</em>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OurStory;
