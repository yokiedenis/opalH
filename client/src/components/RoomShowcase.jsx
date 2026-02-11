import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBed,
  FaWifi,
  FaTv,
  FaSnowflake,
  FaUsers,
  FaCheckCircle,
  FaHotTub,
  FaWindowMaximize,
  FaConciergeBell,
} from "react-icons/fa";
import * as RoomImages from "@assets/images/index.js";
import "./RoomShowcase.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Map room image filenames to imports
const IMAGE_MAP = {
  "bed1.png": RoomImages.roomImages.singleRoom,
  "bed2.png": RoomImages.roomImages.doubleRoom,
  "conferenceHall.png": RoomImages.roomImages.conferenceHall,
  "pooltable.png": RoomImages.roomImages.rooftopGarden,
  "dinnerParty.png": RoomImages.roomImages.restaurant,
};

const RoomShowcase = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      console.log(`🔍 [RoomShowcase] Fetching rooms from: ${API_BASE}/rooms`);

      const response = await fetch(`${API_BASE}/rooms`);
      console.log(`📊 [RoomShowcase] Response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ [RoomShowcase] Data received:`, data);

      // Handle both successful and error responses
      if (data.success) {
        setRooms(data.data || []);
        console.log(
          `✨ [RoomShowcase] Rooms loaded:`,
          data.data?.length,
          "rooms",
        );
      } else if (Array.isArray(data)) {
        setRooms(data);
        console.log(
          `✨ [RoomShowcase] Array data loaded:`,
          data.length,
          "rooms",
        );
      } else {
        setRooms([]);
        console.warn(`⚠️ [RoomShowcase] Unexpected data format:`, data);
      }

      setError(null);
    } catch (err) {
      console.error("❌ [RoomShowcase] Error fetching rooms:", err);
      setError(err.message);
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const getAmenityIcon = (amenity) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes("wifi")) return <FaWifi />;
    if (lowerAmenity.includes("tv")) return <FaTv />;
    if (lowerAmenity.includes("ac")) return <FaSnowflake />;
    if (lowerAmenity.includes("hot water")) return <FaHotTub />;
    if (lowerAmenity.includes("balcony")) return <FaWindowMaximize />;
    if (lowerAmenity.includes("service")) return <FaConciergeBell />;
    return <FaBed />;
  };

  // Function to resolve image paths
  const getImagePath = (imagePath) => {
    if (!imagePath) return null;
    // Extract filename from path (e.g., "bed1.png" or "/src/assets/images/bed1.png")
    const filename = imagePath.split("/").pop();
    const resolvedImage = IMAGE_MAP[filename];
    console.log(
      `🖼️ [RoomShowcase] Resolving image: ${imagePath} → ${filename} → ${resolvedImage ? "✅ Found in IMAGE_MAP" : "❌ Not found"}`,
    );
    return resolvedImage || imagePath;
  };

  // Filter rooms by type
  const filteredRooms =
    filter === "all" ? rooms : rooms.filter((room) => room.type === filter);

  // Separate rooms and facilities
  const bedrooms = rooms.filter((r) => r.type !== "facilities");
  const facilities = rooms.filter((r) => r.type === "facilities");

  const getRoomTypeLabel = (type) => {
    return type?.charAt(0).toUpperCase() + type?.slice(1) || "Room";
  };

  return (
    <section className="room-showcase light-bg" id="rooms">
      <div className="container">
        {/* Header Section */}
        <div className="showcase-header">
          <span className="section-label">✨ Premium Accommodations</span>
          <h2 className="showcase-title">
            Exceptional Rooms & Premium Facilities
          </h2>
          <p className="showcase-subtitle">
            Experience luxury hospitality with our carefully curated selection
            of rooms and facilities, each designed to exceed your expectations
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span>⚠️ Error loading rooms: {error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading luxury rooms...</p>
          </div>
        ) : (
          <>
            {/* Bedrooms Section */}
            {bedrooms.length > 0 && (
              <div className="rooms-section">
                <div className="section-header">
                  <h3>🛏️ Comfortable Bedrooms</h3>
                  <p>Private spaces designed for your comfort</p>
                </div>
                <div className="rooms-grid">
                  {bedrooms.map((room) => (
                    <RoomCard
                      key={room._id || room.id}
                      room={room}
                      getImagePath={getImagePath}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Facilities Section */}
            {facilities.length > 0 && (
              <div className="rooms-section facilities-section">
                <div className="section-header">
                  <h3>🏢 Premium Facilities</h3>
                  <p>Versatile spaces for events and gatherings</p>
                </div>
                <div className="rooms-grid facilities-grid">
                  {facilities.map((room) => (
                    <RoomCard
                      key={room._id || room.id}
                      room={room}
                      getImagePath={getImagePath}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* No Rooms */}
            {rooms.length === 0 && (
              <div className="no-rooms">
                <p>No rooms available at the moment</p>
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <div className="rooms-cta-section">
          <div className="cta-content">
            <h3>Ready to Experience Luxury?</h3>
            <p>Book your stay today and enjoy world-class hospitality</p>
            <Link to="/booking" className="btn btn-primary btn-lg">
              Book Your Room Now
            </Link>
          </div>
          <div className="cta-features">
            <div className="feature-item">
              <FaCheckCircle />
              <span>24/7 Security</span>
            </div>
            <div className="feature-item">
              <FaConciergeBell />
              <span>Room Service</span>
            </div>
            <div className="feature-item">
              <FaUsers />
              <span>Housekeeping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Separate Component for Room Card
const RoomCard = ({ room, getImagePath }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);

  const getAmenityIcon = (amenity) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes("wifi")) return <FaWifi />;
    if (lowerAmenity.includes("tv")) return <FaTv />;
    if (lowerAmenity.includes("ac")) return <FaSnowflake />;
    if (lowerAmenity.includes("hot water")) return <FaHotTub />;
    if (lowerAmenity.includes("balcony")) return <FaWindowMaximize />;
    if (lowerAmenity.includes("service")) return <FaConciergeBell />;
    return <FaBed />;
  };

  const getRoomTypeLabel = (type) => {
    return type?.charAt(0).toUpperCase() + type?.slice(1) || "Room";
  };

  return (
    <div
      className="room-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="room-image">
        {room.images && room.images[0] ? (
          <>
            {console.log(
              `🏨 [RoomCard] Rendering image for room: ${room.roomNumber}, image path: ${room.images[0]}`,
            )}
            <img src={getImagePath(room.images[0])} alt={room.type} />
            <div className="image-overlay"></div>
          </>
        ) : (
          <div className="placeholder">
            <FaBed />
            <span>{room.roomNumber || "Room"}</span>
          </div>
        )}
        <span className={`room-badge ${room.type}`}>
          {getRoomTypeLabel(room.type)}
        </span>
        {room.isAvailable && (
          <span className="availability-badge">Available</span>
        )}
      </div>

      <div className="room-info">
        <div className="room-header">
          <h3>{room.roomNumber}</h3>
          <div className="room-meta">
            <span className="capacity">
              <FaUsers /> {room.capacity}{" "}
              {room.capacity === 1 ? "Guest" : "Guests"}
            </span>
          </div>
        </div>

        {room.description && <p className="description">{room.description}</p>}

        {room.amenities && room.amenities.length > 0 && (
          <div className="amenities">
            {(showMoreAmenities
              ? room.amenities
              : room.amenities.slice(0, 4)
            ).map((amenity, idx) => (
              <span key={idx} className="amenity">
                {getAmenityIcon(amenity)}
                <span className="amenity-label">{amenity}</span>
              </span>
            ))}
            {room.amenities.length > 4 && (
              <button
                className="amenity more-amenities"
                onClick={() => setShowMoreAmenities(!showMoreAmenities)}
                title={showMoreAmenities ? "Show less" : "Show more amenities"}
              >
                {showMoreAmenities
                  ? "Show less"
                  : `+${room.amenities.length - 4} more`}
              </button>
            )}
          </div>
        )}

        <div className="room-footer">
          <div className="price-section">
            <span className="currency">UGX</span>
            <span className="amount">{room.price?.toLocaleString()}</span>
            <span className="period">per night</span>
          </div>
          <Link to="/booking" className="btn btn-primary btn-small">
            Book Now →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomShowcase;
