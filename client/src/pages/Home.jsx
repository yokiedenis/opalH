import React from "react";
import Hero from "../components/Hero.jsx";
import RoomShowcase from "../components/RoomShowcase.jsx";
import FoodMenu from "../components/FoodMenu.jsx";
import Gallery from "../components/Gallery.jsx";
import Reviews from "../components/Reviews.jsx";

const Home = () => {
  return (
    <>
      <Hero />
      <section id="rooms" className="section-rooms">
        <RoomShowcase />
      </section>
      <section id="food" className="section-food">
        <FoodMenu />
      </section>
      <section id="gallery" className="section-gallery">
        <Gallery />
      </section>
      <section id="reviews" className="section-reviews">
        <Reviews />
      </section>
    </>
  );
};

export default Home;
