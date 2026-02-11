import { useState, useEffect, useRef } from "react";

export const useCountUp = (
  targetValue,
  duration = 2000,
  startOnVisible = true,
) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!startOnVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [startOnVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Parse number from string (e.g., "60-100K" -> use 100 as max, "12" -> 12, "5★" -> 5)
      let numValue;
      if (typeof targetValue === "string") {
        const numbers = targetValue.match(/\d+/g);
        numValue = numbers ? Math.max(...numbers.map(Number)) : 0;
      } else {
        numValue = targetValue;
      }

      // Easing function for elegant animation
      const easeOutQuad = (t) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);
      const currentCount = Math.floor(numValue * easedProgress);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(numValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, targetValue, duration]);

  return { count, elementRef };
};
