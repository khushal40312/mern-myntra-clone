import React from 'react';

const Press = () => {
  return (
    <div style={{marginTop:"100px"}} className="container">

    <div className="container my-5">
      <div className="card shadow">
        <div style={{ backgroundColor: "rgb(168, 114, 154)" }}  className="card-header  text-white">
          <h3 className="card-title">Press & Media</h3>
        </div>
        <div className="card-body">
          <p className="lead">Arigato! has been featured in numerous media outlets and publications. Here’s what the press has to say about us!</p>

          <h5>Featured Articles</h5>
          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>"Arigato! Revolutionizing E-commerce" - TechCrunch</strong>
              <p>
                In a recent interview with TechCrunch, our founders shared how Arigato! is leading innovation in the e-commerce industry with cutting-edge technology and a customer-first approach.
              </p>
              <a style={{ backgroundColor: "rgb(168, 114, 154)" }}  href="https://www.instagram.com/___terror____/" target="_blank" rel="noopener noreferrer" className="btn text-white">Read More</a>
            </li>
            <li className="list-group-item">
              <strong>"Top 10 Startups to Watch" - Forbes</strong>
              <p>
                Arigato! was listed as one of Forbes’ "Top 10 Startups to Watch" for its rapid growth and impact in the e-commerce world.
              </p>
              <a style={{ backgroundColor: "rgb(168, 114, 154)" }} href="https://www.instagram.com/___terror____/" target="_blank" rel="noopener noreferrer" className="btn text-white">Read More</a>
            </li>
            <li className="list-group-item">
              <strong>"How Arigato! is Redefining Online Shopping" - The Verge</strong>
              <p>
                The Verge explores how Arigato! has transformed the shopping experience by focusing on quality, convenience, and customer satisfaction.
              </p>
              <a style={{ backgroundColor: "rgb(168, 114, 154)" }} href="https://www.instagram.com/___terror____/" target="_blank" rel="noopener noreferrer" className="btn text-white">Read More</a>
            </li>
          </ul>

          <h5>Press Contact</h5>
          <p>
            For media inquiries, interviews, or to request more information, please contact our press team at:
          </p>
          <ul className="list-unstyled">
            <li><strong>Email:</strong> press@arigato.com</li>
            <li><strong>Phone:</strong> +91 (701) 83-40312</li>
          </ul>

          <h5>Press Resources</h5>
          <p>Download our latest press kit, logos, and brand guidelines:</p>
          <a href="" className="btn btn-outline-secondary">Download Press Kit</a>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Press;
