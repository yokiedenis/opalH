import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send to backend API
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="contact light-bg">
      <div className="container">
        <h2>Get in Touch</h2>

        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info">
            <h3>Contact Information</h3>

            <div className="info-item">
              <div className="icon">
                <FaMapMarkerAlt />
              </div>
              <div className="content">
                <h4>Location</h4>
                <p>Kabulengwa Road, Yesu Amala</p>
                <p>Next to Kamapla Kids Primary School</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon">
                <FaPhone />
              </div>
              <div className="content">
                <h4>Phone</h4>
                <a href="tel:+256700000000">+256 700 000 000</a>
                <p>Available 24/7</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon">
                <FaEnvelope />
              </div>
              <div className="content">
                <h4>Email</h4>
                <a href="mailto:info@opalhighshotel.com">
                  info@opalhighshotel.com
                </a>
                <p>We respond within 2 hours</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon">
                <FaClock />
              </div>
              <div className="content">
                <h4>Working Hours</h4>
                <p>Monday - Friday: 8:00 AM - 10:00 PM</p>
                <p>Saturday - Sunday: 7:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <h3>Send us a Message</h3>

            {submitted && (
              <div className="success-message">
                ✓ Thank you! We've received your message and will get back to
                you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+256 700 000 000"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h3>Find Us on the Map</h3>
          <div className="map-placeholder">
            <p>📍 Google Maps Integration Coming Soon</p>
            <p>Kabulengwa Road, Yesu Amala</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
