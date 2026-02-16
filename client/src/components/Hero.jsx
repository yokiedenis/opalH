import React from "react";
import { Link } from "react-router-dom";
import {
  FaChevronDown,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaComments,
} from "react-icons/fa";
import heroImg from "@assets/images/bannerImage.png";
import "./Hero.css";

const Hero = () => {
  const scrollToFood = () => {
    const foodSection = document.getElementById("food");
    if (foodSection) {
      foodSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          <h1>Opal Heights Hotel</h1>
          <p className="tagline">Discover Affordable </p>
          <p className="location">📍Nansana | Yesu Amala | Kabulengwa Road</p>
          <div className="hero-buttons">
            <Link to="/booking" className="btn btn-primary">
              Book Your Room
            </Link>
            <a href="#food" className="btn btn-outline">
              Order Food
            </a>
          </div>

          <div className="hero-stats">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon facebook"
              title="Follow on Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon instagram"
              title="Follow on Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon twitter"
              title="Follow on Twitter"
            >
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="hero-image">
          <img
            src={heroImg}
            alt="Opal Heights Hotel"
            className="hero-img"
            loading="lazy"
          />
        </div>
      </div>

      <div className="scroll-indicator" onClick={scrollToFood} title="Scroll down to explore">
        <FaChevronDown />
      </div>
    </section>
  );
};

export default Hero;
