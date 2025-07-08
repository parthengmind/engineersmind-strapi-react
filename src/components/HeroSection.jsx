import React from "react";
import "../styles/HeroSection.scss";
import { Link } from "react-router-dom";

const HeroSection = ({ heroImage, title }) => {
  const backgroundStyle = {
    backgroundImage: `url(${heroImage || "/assets/liferay-hero-bg.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center",
    backgroundSize: "cover",
    backgroundColor: "#041023",
  };

  return (
    <section className="hero-section" style={backgroundStyle}>
      <div className="hero-overlay">
        <p className="hero-breadcrumb">
          Home &gt; Resources &gt; Blogs &gt; Liferay-client-extensions
        </p>
        <div className="hero-content">
          <h4 className="hero-subtitle">Blog</h4>
          <h1 className="hero-title">
            {title || (
              <>
                HERO SECTION TITLE
              </>
            )}
          </h1>
          <Link to="/contact" className="contact-button">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
