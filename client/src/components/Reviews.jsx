import React, { useState, useEffect } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import "./Reviews.css";
import { useNotification } from "../context/NotificationContext";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    reviewType: "general",
    rating: 5,
    title: "",
    comment: "",
    guestName: "",
    guestEmail: "",
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const { showNotification } = useNotification();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/reviews`,
      );
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Reviews fetched:", data.data);
        setReviews(data.data || []);
      } else {
        console.error("❌ Failed to fetch reviews:", response.status);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      showNotification("Error loading reviews", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  const handleStarRating = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const resetForm = () => {
    setFormData({
      reviewType: "general",
      rating: 5,
      title: "",
      comment: "",
      guestName: "",
      guestEmail: "",
    });
    setHoveredRating(0);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.comment.trim() ||
      !formData.guestName.trim()
    ) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Review created:", result.data);

        showNotification(
          "✨ Thank you! Your review has been posted!",
          "success",
        );

        // Reset form
        resetForm();
        setShowForm(false);

        // Add new review to the top of the list
        setReviews((prev) => [result.data, ...prev]);
      } else {
        const error = await response.json();
        console.error("❌ Review submission failed:", error);
        showNotification(error.message || "Failed to submit review", "error");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      showNotification("Error submitting review", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (
    rating,
    interactive = false,
    onHover = null,
    hoveredRating = 0,
  ) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`star ${
          i < (hoveredRating || rating) ? "filled" : ""
        } ${interactive ? "interactive" : ""}`}
        onClick={() => interactive && handleStarRating(i + 1)}
        onMouseEnter={() => interactive && onHover && onHover(i + 1)}
        onMouseLeave={() => interactive && onHover && onHover(0)}
      />
    ));
  };

  const reviewTypeLabels = {
    general: "👥 General",
    room: "🛏️ Room",
    food: "🍽️ Food",
    environment: "🌄 Environment",
    experience: "⭐ Overall",
  };

  return (
    <section className="reviews dark-bg">
      <div className="container">
        <div className="reviews-header">
          <h2>Guest Reviews & Testimonials</h2>
          <p className="reviews-subtitle">
            Real experiences from our valued guests
          </p>
        </div>

        <div className="reviews-intro">
          <button
            className={`btn btn-review-cta ${showForm ? "active" : ""}`}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "✕ Close" : "✍️ Share Your Experience"}
          </button>
        </div>

        {showForm && (
          <div className="review-form-container animate-slideIn">
            <button
              className="close-form-btn"
              onClick={() => setShowForm(false)}
              title="Close form"
            >
              <FaTimes />
            </button>

            <form onSubmit={handleSubmitReview} className="review-form">
              <h3>Share Your Experience</h3>
              <p className="form-subtitle">
                Help other guests discover what makes us special
              </p>

              {/* Guest Name */}
              <div className="form-group">
                <label htmlFor="guestName">
                  Your Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="guestName"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  maxLength={50}
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="guestEmail">
                  Email <span className="optional">(Optional)</span>
                </label>
                <input
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  value={formData.guestEmail}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />
              </div>

              {/* Review Type & Rating Row */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="reviewType">
                    Review Type <span className="required">*</span>
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="reviewType"
                      name="reviewType"
                      value={formData.reviewType}
                      onChange={handleInputChange}
                    >
                      <option value="general">👥 General Experience</option>
                      <option value="room">🛏️ Room Experience</option>
                      <option value="food">🍽️ Food & Restaurant</option>
                      <option value="environment">
                        🌄 Environment & Views
                      </option>
                      <option value="experience">⭐ Overall Experience</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Your Rating <span className="required">*</span>
                  </label>
                  <div className="rating-selector">
                    {renderStars(
                      formData.rating,
                      true,
                      setHoveredRating,
                      hoveredRating,
                    )}
                  </div>
                </div>
              </div>

              {/* Review Title */}
              <div className="form-group">
                <label htmlFor="title">
                  Review Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="E.g., Amazing stay with wonderful staff!"
                  required
                  maxLength={100}
                />
                <span className="char-count">{formData.title.length}/100</span>
              </div>

              {/* Review Comment */}
              <div className="form-group">
                <label htmlFor="comment">
                  Your Review <span className="required">*</span>
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Tell us about your experience... What did you love?"
                  rows="6"
                  required
                  maxLength={500}
                ></textarea>
                <span className="char-count">
                  {formData.comment.length}/500
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-gold"
                  disabled={submitting}
                >
                  {submitting ? "Publishing... ⏳" : "✓ Publish Review"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews Display */}
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading amazing reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="no-reviews">
            <div className="no-reviews-content">
              <p className="no-reviews-emoji">💬</p>
              <p>No reviews yet. Be the first to share your experience!</p>
              <button
                className="btn btn-gold"
                onClick={() => setShowForm(true)}
              >
                Leave First Review ✍️
              </button>
            </div>
          </div>
        ) : (
          <div className="reviews-section">
            <div className="reviews-count">
              ⭐ {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}{" "}
              from our guests
            </div>
            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <div
                  key={review._id}
                  className="review-card animate-fadeIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Star Rating */}
                  <div className="review-stars">
                    {renderStars(review.rating)}
                  </div>

                  {/* Review Title */}
                  <h5 className="review-title">{review.title}</h5>

                  {/* Review Comment */}
                  <p className="review-comment">"{review.comment}"</p>

                  {/* Review Footer */}
                  <div className="review-footer">
                    <div className="reviewer-details">
                      <span className="guest-name">{review.guestName}</span>
                      <span className="review-type-badge">
                        {reviewTypeLabels[review.reviewType]}
                      </span>
                    </div>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
