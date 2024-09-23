import React from 'react';

const InvestorRelations = () => {
  return (
    <div style={{marginTop:"100px"}} className="container">

    <div className="container my-5">
      <div className="card shadow">
        <div style={{ background: "rgb(168, 114, 154)" }} className="card-header  text-white">
          <h3 className="card-title">Investor Relations</h3>
        </div>
        <div className="card-body">
          <p className="lead">
            Stay informed about Arigato!'s financial performance, strategic direction, and growth opportunities. Here’s everything you need to know as an investor.
          </p>

          <h5>About Arigato!</h5>
          <p>
            Arigato! is a fast-growing e-commerce platform that prioritizes customer experience and innovation. Our mission is to revolutionize online shopping by delivering 
            high-quality products with a seamless shopping experience.
          </p>

          <h5>Financial Reports</h5>
          <p>Access our latest financial reports, earnings statements, and quarterly results.</p>
          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>Q2 2024 Financial Results</strong>
              <a href="/images/logo.png" className="btn btn-outline-secondary float-end">
                Download Report
              </a>
            </li>
            <li className="list-group-item">
              <strong>2023 Annual Report</strong>
              <a href="/images/logo.png" className="btn btn-outline-secondary float-end">
                Download Report
              </a>
            </li>
            <li className="list-group-item">
              <strong>Investor Presentation 2024</strong>
              <a href="/images/logo.png" className="btn btn-outline-secondary float-end">
                Download Presentation
              </a>
            </li>
          </ul>

          <h5>Stock Information</h5>
          <p>
            Learn more about Arigato!'s stock performance, including current share price, historical data, and market capitalization. 
            For real-time updates, please visit our stock exchange listing page.
          </p>
          <a style={{ background: "rgb(168, 114, 154)" }} href="/images/logo.png" target="_blank" rel="noopener noreferrer" className="btn text-white">
            View Stock Information
          </a>

          <h5>Investor Contact</h5>
          <p>
            For investor-related inquiries, please contact our Investor Relations team at:
          </p>
          <ul className="list-unstyled">
            <li><strong>Email:</strong> investors@arigato.com</li>
            <li><strong>Phone:</strong> +91 (701) 83-40312</li>
          </ul>

          <h5>Corporate Governance</h5>
          <p>
            At Arigato!, we uphold the highest standards of corporate governance. To learn more about our Board of Directors, committees, and governance policies, 
            download our corporate governance report.
          </p>
          <a href="/images/logo.png" className="btn btn-outline-secondary">Download Corporate Governance Report</a>

        </div>
      </div>
    </div>
    </div>

  );
};

export default InvestorRelations;
