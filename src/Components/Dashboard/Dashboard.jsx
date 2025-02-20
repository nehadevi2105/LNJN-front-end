import React from "react";
import './dashboard.scss';

import relatedlink from '../../assets/img/link2.png';
import img1 from '../../assets/img/slides-1.jpg';
import img2 from '../../assets/img/slides-2.jpg';
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
    <div className="dashboard-container">
      <main id="main" className="main">
        <div className="pagetitle">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">
            {[
              { img: userimg, title: "User", className: "c1" },
              { img: CMS, title: "CMS", className: "c2" },
              { img: Footer, title: "Footer", className: "c3" },
              { img: WhatsNew, title: "Whats New", className: "c4" },
              { img: Banner, title: "Banner", className: "c5" },
              { img: relatedlink, title: "Related Links", className: "c6" },
              { img: Profile, title: "Profile", className: "c7" },
              { img: contact, title: "Contact Us", className: "c8" },
            ].map((item, index) => (
              <div className="col-md-3" key={index}>
                <div className={`card cr-box ${item.className}`}>
                  <img src={item.img} className="card-img-top" alt={item.title} />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
