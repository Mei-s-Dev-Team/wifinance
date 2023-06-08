import React, { useState, useEffect } from "react";
import wifi1 from "./wifi1.jpg";
import wifi2 from "./wifi2.jpg";
import wifi3 from "./wifi3.jpg";
import "./home.css"; // Import CSS file for styling

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const images = [wifi1, wifi2, wifi3];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <img
          key={index}
          className={`slideshow-image ${index === slideIndex ? "active" : ""}`}
          src={image}
          alt={`Slide ${index + 1}`}
          style={{
            transform: `translateX(${(index - slideIndex) * 100}%)`,
          }}
        />
      ))}
    </div>
  );
};

export default Slideshow;
