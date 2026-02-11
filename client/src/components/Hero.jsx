import React from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import heroImg from "@assets/images/bannerImage.png";
import { useCountUp } from "../hooks/useCountUp.js";
import "./Hero.css";

const Hero = () => {
  const { count: roomsCount, elementRef: roomsRef } = useCountUp(12, 2000);
  const { count: ratingCount, elementRef: ratingRef } = useCountUp(5, 2000);
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          <h1>Opal Heights Hotel</h1>
          <p className="tagline">Discover Affordable Luxury</p>
          <p className="location">📍Nansana | Yesu Amala | Kabulengwa Road</p>
          <div className="hero-buttons">
            <Link to="/booking" className="btn btn-primary">
              Book Your Room
            </Link>
            <Link to="/food" className="btn btn-outline">
              Order Food
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat" ref={roomsRef}>
              <h3>{roomsCount}</h3>
              <p>Luxury Rooms</p>
            </div>
            <div className="stat">
              <h3>100K</h3>
              <p>Max Rate</p>
            </div>
            <div className="stat" ref={ratingRef}>
              <h3>{ratingCount}★</h3>
              <p>Guest Rating</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Opal Heights Hotel" className="hero-img" />
        </div>
      </div>

      <div className="scroll-indicator">
        <FaChevronDown />
      </div>
    </section>
  );
};

export default Hero;
