import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.scss';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link to="/">
            <div className="header__logo-text">engineers</div>
            <div className="header__logo-accent">mind</div>
          </Link>
        </div>

        <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__nav-list">
            <li><a href="#industries">Industries</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#technologies">Technologies</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <button
          className="header__mobile-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
