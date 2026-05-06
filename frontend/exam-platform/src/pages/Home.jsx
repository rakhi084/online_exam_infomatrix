import React from "react";
import "../css/home.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* <a href="/register">Register</a> */}
      <section className="hero" id="home">
        <div className="home-con-main">
          <div className="left-con">
            <h1>Simply Powerful</h1>
            <span>Online Exams</span>
            <p>
              Easy to get started and intuitive to use. Exam.net equips you with
              all the power and functionality you need to create secure exams
              for your students, your way
            </p>
            <div className="home-btn-con">
              <button className="home-btn-fill">Sign Up for Your Free Trial  </button>
              <button className="home-btn-empty">Book a Demo</button>
            </div>
          </div>
        <div className="right-con">
          <img src="https://cdn2.exam.net/website-2025-11-05/wp-content/uploads/2024/03/home-hero-graphic-1-1024x762.png" alt="" />
        </div>

        </div>
      </section>
    </div>
  );
};

export default Home;
