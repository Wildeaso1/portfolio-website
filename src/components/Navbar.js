import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/home" style={{ color: 'White' }}>My Portfolio</Link>
      </div>
      
      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/home" className="nav-button" style={{ color: 'White' }} onClick={closeMobileMenu}>Home</Link>
        <Link to="/about" className="nav-button" style={{ color: 'White' }} onClick={closeMobileMenu}>About</Link>
        <Link to="/projects" className="nav-button" style={{ color: 'White' }} onClick={closeMobileMenu}>Projects</Link>
        <Link to="/contact" className="nav-button" style={{ color: 'White' }} onClick={closeMobileMenu}>Contact</Link>
      </div>
      
      <div className="mobile-menu" onClick={toggleMobileMenu}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>
    </nav>
  );
};

export default Navbar;