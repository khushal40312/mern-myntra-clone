import React from 'react';

const FAQ = () => {
  return (
    <div style={{marginTop:"100px"}} className="container">
    <div  className="container my-5">
      <div className="card shadow">
        <div style={{ backgroundColor: "rgb(168, 114, 154)" }} className="card-header  text-white">
          <h3 className="card-title">Frequently Asked Questions (FAQ)</h3>
        </div>
        <div className="card-body">
          <p className="lead">Find answers to some of the most common questions below. If you can't find your answer, feel free to contact us!</p>
          
          <div className="accordion" id="faqAccordion">
            
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  How do I place an order?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  To place an order, browse through our products, add items to your cart, and proceed to checkout. Follow the instructions to enter your payment and shipping information.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  What payment methods are accepted?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  We accept a wide range of payment methods including credit/debit cards, PayPal, and Apple Pay.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  How can I track my order?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  After placing your order, you will receive a confirmation email with a tracking number. You can track your order status through the "My Orders" section in your account.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  Can I cancel or change my order?
                </button>
              </h2>
              <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  You can cancel or modify your order before it is shipped. After shipment, you can initiate a return once you receive the item.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                  How do I return an item?
                </button>
              </h2>
              <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  You can return an item within 30 days of receiving it. Go to "My Orders", select the item you want to return, and follow the return instructions.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSix">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                  How do I contact customer support?
                </button>
              </h2>
              <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  You can reach our customer support team via email at support@arigato.com or call us at +1 (123) 456-7890. We also offer live chat support 24/7.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FAQ;
