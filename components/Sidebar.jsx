import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({isOpen, setIsOpen}) => {

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="menu-icon" onClick={toggleSidebar}>
       {isOpen ? '✖' : '☰'}
      </div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>Product Details</Link></li>
          <li><Link to="/compare" onClick={toggleSidebar}>Compare Products</Link></li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
