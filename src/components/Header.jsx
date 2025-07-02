// import React from "react";
// import "./../styles/Header.scss";

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="header-inner">
//         <div className="logo">
//           engineers<br />
//           <strong>mind</strong>
//         </div>
//         <nav className="nav">
//           <a href="#">Industries</a>
//           <a href="#">Services</a>
//           <a href="#">Technologies</a>
//           <a href="#">Contact</a>
//           <div className="menu-icon">
//             <span></span>
//             <span></span>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;



// components/Header.jsx
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
            <span className="header__logo-text">engineers</span>
            <span className="header__logo-accent">mind</span>
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
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;