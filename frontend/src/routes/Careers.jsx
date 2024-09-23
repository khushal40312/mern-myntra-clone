import React from 'react';

const Careers = () => {
    return (
        <div style={{marginTop:"100px"}} className="container">
        <div className="container my-5">
            <div className="card shadow">
                <div style={{backgroundColor: "rgb(168, 114, 154)" }} className="card-header  text-white">
                    <h3 className="card-title">Careers at Arigato!</h3>
                </div>
                <div className="card-body">
                    <p className="lead">Join our dynamic team and help us shape the future of e-commerce at Arigato!</p>

                    <h5>Why Work With Us?</h5>
                    <p>
                        At Arigato!, we are passionate about delivering the best products and experiences to our customers. We believe in fostering a collaborative, innovative, and inclusive work environment
                        where every team member can thrive. If you're driven, creative, and ready to make an impact, we'd love to hear from you!
                    </p>

                    <h5>Open Positions</h5>
                    <ul className="list-group mb-3">
                        <li className="list-group-item">
                            <strong>Front-End Developer</strong>
                            <p>
                                We're looking for a talented front-end developer with experience in React and Bootstrap to help build responsive, user-friendly web applications.
                            </p>
                            <p><strong>Location:</strong> Remote</p>
                            <a href="mailto:khushalsharma40312@gmail.com"> <button className="btn btn-primary">Apply Now</button></a>

                        </li>
                        <li className="list-group-item">
                            <strong>Product Manager</strong>
                            <p>
                                As a product manager at Arigato!, you will drive the vision, strategy, and execution of new product lines. Experience in e-commerce is a plus.
                            </p>
                            <p><strong>Location:</strong> New York, NY</p>
                            <a href="mailto:khushalsharma40312@gmail.com"> <button className="btn btn-primary">Apply Now</button></a>
                        </li>
                        <li className="list-group-item">
                            <strong>Customer Support Specialist</strong>
                            <p>
                                We are looking for a customer support specialist to assist our clients with product queries, order tracking, and issue resolution.
                            </p>
                            <p><strong>Location:</strong> Remote</p>
                            <a href="mailto:khushalsharma40312@gmail.com"> <button className="btn btn-primary">Apply Now</button></a>

                        </li>
                    </ul>

                    <h5>Life at Arigato!</h5>
                    <p>
                        At Arigato!, we believe in work-life balance and offer flexible work hours, remote work opportunities, and a supportive team environment. Our culture is built around growth,
                        creativity, and respect for all team members.
                    </p>

                    <h5>Perks and Benefits</h5>
                    <ul className="list-group mb-3">
                        <li className="list-group-item"><strong>Flexible Working Hours</strong></li>
                        <li className="list-group-item"><strong>Health and Wellness Programs</strong></li>
                        <li className="list-group-item"><strong>Professional Development Opportunities</strong></li>
                        <li className="list-group-item"><strong>Generous Vacation Time</strong></li>
                    </ul>

                    <h5>How to Apply</h5>
                    <p>
                        If you're interested in joining our team, send your resume and a cover letter to <a href="mailto:khushalsharma40312@gmail.com">khushalsharma40312@gmail.com</a>.
                        Please include the position you're applying for in the subject line.
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Careers;
