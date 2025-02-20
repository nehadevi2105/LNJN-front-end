import React from "react";
import './dashboard.scss';

import relatedlink from '../../assets/img/link2.png';
import img1 from '../../assets/img/slides-1.jpg';
import img2 from '../../assets/img/slides-2.jpg';
import img3 from '../../assets/img/slides-3.jpg';
import userimg from '../../assets/img/userdashboard.jpg';
import CMS from '../../assets/img/cms2.jpg';
import Footer from '../../assets/img/footer.png';
import WhatsNew from '../../assets/img/whatsnew.png';
import Banner from '../../assets/img/banner1.png';
import Profile from '../../assets/img/Profile.png';
import contact from '../../assets/img/contact.png';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const storedUserString = localStorage.getItem("user");
  const user = storedUserString ? JSON.parse(storedUserString) : {};

  return (
    <>
      
        <div>
          <main id="main" className="main">
            <div className="pagetitle">
              {/* <h1>Dashboard</h1> */}
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </nav>
            </div>

            <section className="section dashboard">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-xxl-12 col-md-12">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Good Morning, {user.r_name}</h5>
                          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" aria-label="Slide 1"></button>
                              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" className="active" aria-current="true" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                              <div className="carousel-item">
                                <img src={img1} className="d-block w-100 hero-img" alt="Slide 1" />
                                <div className="carousel-caption d-none d-md-block">
                                  <h5>Welcome to the Our family!</h5>
                                  <p>Welcome to our dashboard. Manage your account and your subscriptions.</p>
                                </div>
                              </div>
                              <div className="carousel-item">
                                <img src={img2} className="d-block w-100 hero-img" alt="Slide 2" />
                                <div className="carousel-caption d-none d-md-block">
                                  <h5>Welcome to the Our family!</h5>
                                  <p>Welcome to our dashboard. Manage your account and your subscriptions.</p>
                                </div>
                              </div>
                              <div className="carousel-item active">
                                <img src={img3} className="d-block w-100 hero-img" alt="Slide 3" />
                                <div className="carousel-caption d-none d-md-block">
                                  <h5>Welcome to the Our family!</h5>
                                  <p>Welcome to our dashboard. Manage your account and your subscriptions.</p>
                                </div>
                              </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                              <span className="carousel-control-next-icon" aria-hidden="true"></span>
                              <span className="visually-hidden">Next</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="card cr-box">
                    <img src={userimg} className="card-img-top" alt="User" />
                    <div className="card-body c1">
                      <h5 className="card-title">User</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card cr-box">
                    <img src={CMS} className="card-img-top" alt="CMS" />
                    <div className="card-body c2">
                      <h5 className="card-title">CMS</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card cr-box">
                    <img src={Footer} className="card-img-top" alt="Footer" />
                    <div className="card-body c3">
                      <h5 className="card-title">Footer</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card cr-box">
                    <img src={WhatsNew} className="card-img-top" alt="Whats New" />
                    <div className="card-body c4">
                      <h5 className="card-title">Whats New</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="card cr-box">
                    <img src={Banner} className="card-img-top" alt="Banner" />
                    <div className="card-body c5">
                      <h5 className="card-title">Banner</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card cr-box">
                    <img src={relatedlink} className="card-img-top" alt="Related Links" />
                    <div className="card-body c6">
                      <h5 className="card-title">Related Links</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card cr-box">
                    <img src={Profile} className="card-img-top" alt="Profile" />
                    <div className="card-body c7">
                      <h5 className="card-title">Profile</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card cr-box">
                    <img src={contact} className="card-img-top" alt="Contact Us" />
                    <div className="card-body c8">
                      <h5 className="card-title">Contact Us</h5>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      
    </>
  );
};

export default Dashboard;
