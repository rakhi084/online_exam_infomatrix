import React from "react";
import "../css/navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            exam.net
          </a>
          <ul id="nav-mobile" className="right">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
          <div className="btn-con">
            <button className="btn" >
              signup
            </button>
            <button className="btn" >
              login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
