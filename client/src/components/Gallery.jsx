import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import "./Gallery.css";

// Import images from assets
import img from "@assets/images/bed1.png";
import img1 from "@assets/images/bed2.png";
import bar from "@assets/images/bar.png";
import deli from "@assets/images/delivery.png";
import surroundingView from "@assets/images/bannerImage.png";
import restu from "@assets/images/restu.png";
import pineamelon from "@assets/images/juice.png";
import posho from "@assets/images/grilledduarterchicken.jpg";
import beef from "@assets/images/beefRolex.png";

// Import videos from assets
import { allVideos } from "@assets/images";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    // ROOM IMAGES
    {
      id: 2,
      category: "rooms",
      type: "image",
      title: "Single Bed",
      image: img,
    },
    {
      id: 3,
      category: "rooms",
      type: "image",
      title: "Double Bed",
      image: img1,
    },
    // FACILITIES IMAGES
    {
      id: 4,
      category: "facilities",
      type: "image",
      title: "Lounge Area",
      image: restu,
    },
    {
      id: 5,
      category: "facilities",
      type: "image",
      title: "Rooftop Plants",
      image: deli,
    },
    {
      id: 6,
      category: "facilities",
      type: "image",
      title: "Surrounding Views",
      image: surroundingView,
    },
    // RESTAURANT & FOOD IMAGES
    {
      id: 7,
      category: "restaurant",
      type: "image",
      title: "Fruits & Juice",
      image: pineamelon,
    },
    {
      id: 8,
      category: "restaurant",
      type: "image",
      title: "Meals",
      image: posho,
    },
    {
      id: 9,
      category: "restaurant",
      type: "image",
      title: "Breakfast",
      image: beef,
    },
    // BAR IMAGES
    {
      id: 10,
      category: "bar",
      type: "image",
      title: "events",
      image: bar,
    },
    // BREAKFAST VIDEOS
    {
      id: 11,
      category: "breakfast-videos",
      type: "video",
      title: "Big Breakfast",
      video: allVideos.breakfast.bigBreakfast,
      thumbnail: beef,
    },
    {
      id: 12,
      category: "breakfast-videos",
      type: "video",
      title: "Big Breakfast Serving",
      video: allVideos.breakfast.bigBreakfastServing,
      thumbnail: beef,
    },
    {
      id: 13,
      category: "breakfast-videos",
      type: "video",
      title: "Breakfast Prep",
      video: allVideos.breakfast.breakfastPrep,
      thumbnail: beef,
    },
    {
      id: 14,
      category: "breakfast-videos",
      type: "video",
      title: "Breakfast Prep 2",
      video: allVideos.breakfast.breakfastPrep2,
      thumbnail: beef,
    },
    {
      id: 15,
      category: "breakfast-videos",
      type: "video",
      title: "Breakfast Prep 3",
      video: allVideos.breakfast.breakfastPrep3,
      thumbnail: beef,
    },
    // MEAL VIDEOS
    {
      id: 16,
      category: "meals-videos",
      type: "video",
      title: "Chapati & Beef",
      video: allVideos.meals.chapatiBeef,
      thumbnail: posho,
    },
    {
      id: 17,
      category: "meals-videos",
      type: "video",
      title: "Chips & Beef",
      video: allVideos.meals.chipsBeef,
      thumbnail: posho,
    },
    {
      id: 18,
      category: "meals-videos",
      type: "video",
      title: "Posho & Beef",
      video: allVideos.meals.poshoBeef,
      thumbnail: posho,
    },
    // RESTAURANT SERVICE VIDEOS
    {
      id: 19,
      category: "service-videos",
      type: "video",
      title: "Pizza Packaging",
      video: allVideos.restaurant.pizzaPackaging,
      thumbnail: pineamelon,
    },
    {
      id: 20,
      category: "service-videos",
      type: "video",
      title: "Waiter Serving Tea",
      video: allVideos.restaurant.waiterServingTea,
      thumbnail: restu,
    },
    {
      id: 21,
      category: "service-videos",
      type: "video",
      title: "After Meal Service",
      video: allVideos.restaurant.afterMeal,
      thumbnail: restu,
    },
    // TESTIMONIALS VIDEOS
    {
      id: 22,
      category: "testimonials",
      type: "video",
      title: "Cute Waiter",
      video: allVideos.testimonials.cuteWaiter,
      // thumbnail: imgWA0006,
    },
    {
      id: 23,
      category: "testimonials",
      type: "video",
      title: "Waiter Serving Lunch",
      video: allVideos.testimonials.cuteWaiterServingLunch,
      // thumbnail: imgWA0006,
    },
    {
      id: 24,
      category: "testimonials",
      type: "video",
      title: "Satisfied Customer",
      video: allVideos.testimonials.satisfiedCustomer,
      // thumbnail: imgWA0006,
    },
  ];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section className="gallery dark-bg">
      <div className="container">
        <h2>Gallery</h2>

        <div className="gallery-filters">
          {[
            "all",
            "rooms",
            "facilities",
            "restaurant",
            "bar",
            "breakfast-videos",
            "meals-videos",
            "service-videos",
            "testimonials",
          ].map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "breakfast-videos"
                ? "Breakfast Videos"
                : filter === "meals-videos"
                  ? "Meal Videos"
                  : filter === "service-videos"
                    ? "Service Videos"
                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="gallery-item"
              onClick={() => setSelectedImage(item)}
            >
              <div className="gallery-image">
                <img
                  src={item.type === "video" ? item.thumbnail : item.image}
                  alt={item.title}
                />
                {item.type === "video" && (
                  <div className="play-button">
                    <FaPlay />
                  </div>
                )}
              </div>
              <p className="gallery-title">{item.title}</p>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="lightbox" onClick={() => setSelectedImage(null)}>
            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              <div className="lightbox-image">
                {selectedImage.type === "video" ? (
                  <video
                    src={selectedImage.video}
                    controls
                    autoPlay
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "80vh",
                    }}
                  />
                ) : (
                  <img src={selectedImage.image} alt={selectedImage.title} />
                )}
              </div>
              <p className="lightbox-title">{selectedImage.title}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
