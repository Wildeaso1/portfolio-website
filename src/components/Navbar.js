import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" style={{ color: 'White' }}>My Portfolio</Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-button" style={{ color: 'White' }}>Home</Link>
        <Link to="/about" className="nav-button" style={{ color: 'White' }}>About</Link>
        <Link to="/projects" className="nav-button" style={{ color: 'White' }}>Projects</Link>
        <Link to="/contact" className="nav-button" style={{ color: 'White' }}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;