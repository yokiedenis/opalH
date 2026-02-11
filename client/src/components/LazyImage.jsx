import React, { useState } from "react";

/**
 * LazyImage Component - Handles lazy loading with blur-up effect
 * Uses Intersection Observer for better performance
 */
const LazyImage = ({ src, alt, className = "", onLoad, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Placeholder blur image (1x1 pixel blur)
  const placeholderSrc =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3C/svg%3E";

  return (
    <img
      src={isVisible ? src : placeholderSrc}
      alt={alt}
      className={`${className} ${isLoaded ? "loaded" : "loading"}`}
      loading="lazy"
      onLoad={handleImageLoad}
      onIntersection={(entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
        }
      }}
      style={{
        transition: isLoaded ? "opacity 0.3s ease-in" : "none",
        opacity: isLoaded ? 1 : 0.7,
      }}
      {...props}
    />
  );
};

export default LazyImage;
