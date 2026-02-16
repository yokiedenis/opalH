import React from "react";
import {
  FaFacebook,
  FaTiktok,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* About */}
            <div className="footer-section">
              <h3>Opal Heights Hotel</h3>
              <p>
                Experience and comfort at the heart of Yesu Amala. We offer
                world-class accommodation, delicious food, and exceptional
                service.
              </p>
              <div className="social-links">
                <a href="#" title="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" title="TikTok">
                  <FaTiktok />
                </a>
                <a href="#" title="Instagram">
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/rooms">Rooms</a>
                </li>
                <li>
                  <a href="/food">Food & Pizza</a>
                </li>
                <li>
                  <a href="/gallery">Gallery</a>
                </li>
                <li>
                  <a href="/reviews">Reviews</a>
                </li>
                <li>
                  <a href="/booking">Book Now</a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>
                  <a href="#">Room Booking</a>
                </li>
                <li>
                  <a href="#">Food Delivery</a>
                </li>
                <li>
                  <a href="#">Event Hosting</a>
                </li>
                <li>
                  <a href="#">Restaurant</a>
                </li>
                <li>
                  <a href="#">Bar Service</a>
                </li>
                <li>
                  <a href="#">24/7 Support</a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-section">
              <h4>Contact Us</h4>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <div>
                  <p>Kabulengwa Road, Yesu Amala</p>
                  <p>Next to Kamapla Kids Primary School</p>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone />
                <a href="tel:+256700000000">+256 700 000 000</a>
              </div>
              <div className="contact-item">
                <FaEnvelope />
                <a href="mailto:info@opalhighshotel.com">
                  info@opalhighshotel.com
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {currentYear} Opal Heights Hotel. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
