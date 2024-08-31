import React from "react";
import logo from "../assets/logoShopping.png";
import userProfile from "../assets/user.png";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => (
  <div className="navbar">
     <Link to="/">
     <img className="logo" alt="logo" src={logo} />
     </Link>
     <img src={userProfile} className="profile" alt="profile" />
  </div>
);
export default Navbar;