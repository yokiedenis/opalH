import React, { useState, useContext, useEffect } from "react";
import { BookingContext } from "../context/BookingContext.jsx";
import "../styles/BookingPage.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const RELWORX_MERCHANT_ID =
  import.meta.env.VITE_RELWORX_MERCHANT_ID || "YOUR_MERCHANT_ID";
const RELWORX_API_KEY = import.meta.env.VITE_RELWORX_API_KEY || "YOUR_API_KEY";
const RELWORX_API_URL =
  import.meta.env.VITE_RELWORX_API_URL || "https://api.relworx.com/api/v1";

const BookingPage = () => {
  const { setCurrentBooking } = useContext(BookingContext);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [paymentStep, setPaymentStep] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: 1,
    specialRequests: "",
    breakfastIncluded: false,
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/rooms`);
      const data = await response.json();

      if (data.success) {
        setRooms(data.data || []);
      } else if (Array.isArray(data)) {
        setRooms(data);
      }
    } catch (err) {
      console.error("Error fetching rooms:", err);
      setError("Failed to load available rooms");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const calculateNights = () => {
    if (!formData.checkInDate || !formData.checkOutDate) return 0;
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const calculateTotalPrice = () => {
    if (!formData.roomId) return 0;
    const room = rooms.find((r) => r._id === formData.roomId);
    if (!room) return 0;

    const nights = calculateNights();
    const roomTotal = room.price * nights;
    const breakfastTotal = formData.breakfastIncluded ? 20000 * nights : 0;

    return roomTotal + breakfastTotal;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (!formData.guestName || !formData.guestEmail || !formData.guestPhone) {
      setError("Please fill in all required fields");
      return;
    }

    if (!formData.roomId) {
      setError("Please select a room");
      return;
    }

    if (calculateNights() <= 0) {
      setError("Check-out date must be after check-in date");
      return;
    }

    // Move to payment step instead of directly submitting
    setPaymentStep(true);
    setError(null);
  };

  const nights = calculateNights();
  const totalPrice = calculateTotalPrice();

  const handlePayment = async (e) => {
    e.preventDefault();
    setError(null);
    setPaymentLoading(true);

    try {
      // Prepare booking data
      const bookingData = {
        ...formData,
        totalPrice: totalPrice,
        breakfastPrice: formData.breakfastIncluded ? 20000 * nights : 0,
        paymentMethod: paymentMethod,
      };

      // Process payment via Relworx API
      if (paymentMethod === "card") {
        const cardData = new FormData(e.target);
        const cardNumber = cardData.get("cardNumber");
        const cardExpiry = cardData.get("cardExpiry");
        const cardCvv = cardData.get("cardCvv");

        // Create Relworx payment request
        const relworxPayload = {
          merchant_id: RELWORX_MERCHANT_ID,
          amount: totalPrice.toString(),
          currency: "UGX",
          description: `Hotel Booking - ${rooms.find((r) => r._id === formData.roomId)?.roomNumber}`,
          customer_email: formData.guestEmail,
          customer_phone: formData.guestPhone,
          customer_name: formData.guestName,
          reference: `BOOKING-${Date.now()}`,
          card_number: cardNumber.replace(/\s/g, ""),
          card_expiry: cardExpiry,
          card_cvv: cardCvv,
        };

        console.log("🔒 Processing Relworx payment...", relworxPayload);

        // Call Relworx API
        const paymentResponse = await fetch(
          `${RELWORX_API_URL}/payments/charge`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${RELWORX_API_KEY}`,
            },
            body: JSON.stringify(relworxPayload),
          },
        );

        const paymentData = await paymentResponse.json();

        if (!paymentResponse.ok) {
          throw new Error(paymentData.message || "Payment processing failed");
        }

        console.log("✅ Payment successful:", paymentData);

        // Payment successful, create booking in backend
        bookingData.paymentId = paymentData.transaction_id;
        bookingData.paymentStatus = "completed";
      }

      // Create booking with payment info
      const bookingResponse = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const bookingResult = await bookingResponse.json();

      if (!bookingResponse.ok) {
        throw new Error(bookingResult.message || "Booking failed");
      }

      setSuccess("🎉 Booking confirmed! Payment successful!");
      setCurrentBooking(bookingResult.data);

      // Reset form
      setFormData({
        guestName: "",
        guestEmail: "",
        guestPhone: "",
        roomId: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfGuests: 1,
        specialRequests: "",
        breakfastIncluded: false,
      });
      setPaymentStep(false);

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/";
      }, 2500);
    } catch (err) {
      console.error("❌ Payment error:", err);
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="container">
        <h1>Make a Booking</h1>

        <div className="booking-content">
          {!paymentStep ? (
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h2>Your Information</h2>

                <div className="form-group">
                  <label htmlFor="guestName">Full Name *</label>
                  <input
                    type="text"
                    id="guestName"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="guestEmail">Email *</label>
                  <input
                    type="email"
                    id="guestEmail"
                    name="guestEmail"
                    value={formData.guestEmail}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="guestPhone">Phone Number *</label>
                  <input
                    type="tel"
                    id="guestPhone"
                    name="guestPhone"
                    value={formData.guestPhone}
                    onChange={handleChange}
                    required
                    placeholder="+256..."
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Booking Details</h2>

                <div className="form-group">
                  <label htmlFor="roomId">Select Room *</label>
                  <select
                    id="roomId"
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a room...</option>
                    {rooms.map((room) => (
                      <option key={room._id} value={room._id}>
                        Room {room.roomNumber} - {room.type} (
                        {room.price.toLocaleString()} UGX/night)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group date-group">
                    <label htmlFor="checkInDate">📅 Check-in Date *</label>
                    <div className="date-input-wrapper">
                      <input
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleChange}
                        required
                        className="date-input"
                      />
                      <span className="date-icon">📆</span>
                    </div>
                    {formData.checkInDate && (
                      <span className="date-display">
                        {new Date(formData.checkInDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    )}
                  </div>

                  <div className="form-group date-group">
                    <label htmlFor="checkOutDate">📅 Check-out Date *</label>
                    <div className="date-input-wrapper">
                      <input
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={formData.checkOutDate}
                        onChange={handleChange}
                        required
                        className="date-input"
                      />
                      <span className="date-icon">📆</span>
                    </div>
                    {formData.checkOutDate && (
                      <span className="date-display">
                        {new Date(formData.checkOutDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="numberOfGuests">Number of Guests *</label>
                    <input
                      type="number"
                      id="numberOfGuests"
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group checkbox">
                    <label htmlFor="breakfastIncluded">
                      <input
                        type="checkbox"
                        id="breakfastIncluded"
                        name="breakfastIncluded"
                        checked={formData.breakfastIncluded}
                        onChange={handleChange}
                      />
                      Include Breakfast? (+20,000 UGX/night)
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="specialRequests">Special Requests</label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="Any special requests?"
                    rows="4"
                  />
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={submitting || loading}
                >
                  {submitting ? "Submitting..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          ) : (
            <form
              className="booking-form payment-form"
              onSubmit={handlePayment}
            >
              <div className="form-section">
                <h2>💳 Payment Details</h2>
                <p className="payment-info">
                  Complete your booking by entering payment information
                </p>

                <div className="form-group">
                  <label>Payment Method</label>
                  <div className="payment-methods">
                    <button
                      type="button"
                      className={`payment-method-btn ${
                        paymentMethod === "card" ? "active" : ""
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      💳 Credit Card
                    </button>
                    <button
                      type="button"
                      className={`payment-method-btn ${
                        paymentMethod === "mobile" ? "active" : ""
                      }`}
                      onClick={() => setPaymentMethod("mobile")}
                    >
                      📱 Mobile Money
                    </button>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <>
                    <div className="form-group">
                      <label htmlFor="cardName">Cardholder Name</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        placeholder="John Doe"
                        defaultValue={formData.guestName}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="cardExpiry">Expiry Date</label>
                        <input
                          type="text"
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cardCvv">CVV</label>
                        <input
                          type="text"
                          id="cardCvv"
                          name="cardCvv"
                          placeholder="123"
                          maxLength="4"
                          required
                        />
                      </div>
                    </div>

                    <div className="security-info">
                      <span>🔒 Your payment is secure and encrypted</span>
                    </div>
                  </>
                )}

                {paymentMethod === "mobile" && (
                  <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Money Number</label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      name="mobileNumber"
                      placeholder="+256..."
                      defaultValue={formData.guestPhone}
                      required
                    />
                  </div>
                )}
              </div>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-large"
                  onClick={() => setPaymentStep(false)}
                  disabled={paymentLoading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-large"
                  disabled={paymentLoading}
                >
                  {paymentLoading
                    ? "Processing..."
                    : `Pay ${totalPrice.toLocaleString()} UGX`}
                </button>
              </div>
            </form>
          )}

          <div className="booking-summary">
            <h2>Booking Summary</h2>

            {formData.roomId &&
              rooms.find((r) => r._id === formData.roomId) && (
                <div className="summary-room-card">
                  {rooms.find((r) => r._id === formData.roomId).images?.[0] && (
                    <img
                      src={
                        rooms.find((r) => r._id === formData.roomId).images[0]
                      }
                      alt="room"
                      className="summary-room-image"
                    />
                  )}
                  <div className="summary-room-info">
                    <h3>
                      {rooms.find((r) => r._id === formData.roomId).roomNumber}
                    </h3>
                    <p className="room-type">
                      {rooms.find((r) => r._id === formData.roomId).type}
                    </p>
                    <p className="room-description">
                      {rooms.find((r) => r._id === formData.roomId).description}
                    </p>
                    {rooms.find((r) => r._id === formData.roomId).amenities && (
                      <div className="room-amenities-list">
                        {rooms
                          .find((r) => r._id === formData.roomId)
                          .amenities.map((amenity, idx) => (
                            <span key={idx} className="amenity-tag">
                              {amenity}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

            {nights > 0 && (
              <div className="summary-dates">
                <div className="summary-item">
                  <span>Check-in:</span>
                  <strong>{formData.checkInDate}</strong>
                </div>
                <div className="summary-item">
                  <span>Check-out:</span>
                  <strong>{formData.checkOutDate}</strong>
                </div>
                <div className="summary-item">
                  <span>Nights:</span>
                  <strong>{nights}</strong>
                </div>
              </div>
            )}

            {formData.roomId && nights > 0 && (
              <div className="summary-pricing">
                <div className="summary-item">
                  <span>Room Rate:</span>
                  <strong>
                    {(
                      rooms.find((r) => r._id === formData.roomId).price *
                      nights
                    ).toLocaleString()}{" "}
                    UGX
                  </strong>
                </div>

                {formData.breakfastIncluded && (
                  <div className="summary-item">
                    <span>Breakfast:</span>
                    <strong>{(20000 * nights).toLocaleString()} UGX</strong>
                  </div>
                )}

                <div className="summary-item total">
                  <span>Total Price:</span>
                  <strong className="total-price">
                    {totalPrice.toLocaleString()} UGX
                  </strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
