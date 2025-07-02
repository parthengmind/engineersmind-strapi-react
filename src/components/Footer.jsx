import React from "react";
import "../styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Logo & Social */}
        <div className="footer__section">
          <div className="footer__logo">
            <div className="footer__social-icon">in</div>
            <div className="footer__brand">
              engineers<br /><strong>mind</strong>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="footer__section footer__links">
          <h4>LINKS</h4>
          <div className="footer__grid">
            <ul>
              <li>Industries</li>
              <li>Services</li>
              <li>Technologies</li>
              <li>Resources</li>
              <li>About Us</li>
            </ul>
            <ul>
              <li>News</li>
              <li>Success Stories</li>
              <li>Blogs</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>

        {/* Policy */}
        <div className="footer__section">
          <h4>POLICY</h4>
          <ul>
            <li>PRIVACY & POLICY</li>
            <li>TERMS OF USE</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__section">
          <ul className="footer__contact">
            <li>solutions@engineersmind.com</li>
            <li>+1 888 291 8757</li>
            <li>Corporate Headquarters</li>
            <li>Engineersmind Corp</li>
            <li>185 Hudson Street</li>
            <li>Jersey City, NJ 07302 USA</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        © 2025 Engineersmind. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
