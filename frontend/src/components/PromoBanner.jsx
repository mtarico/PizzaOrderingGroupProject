import { useState, useEffect } from "react";

import bbqchicken from "../assets/bbqchicken.png";
import caesarsalad from "../assets/caesarsalad.png";
import cannoli from "../assets/cannoli.png";
import chickenwings6pc from "../assets/chickenwings6pc.png";
import chocolatelavacake from "../assets/chocolatelavacake.png";
import garlicbread from "../assets/garlicbread.png";
import margherita from "../assets/margherita.png";
import meatlovers from "../assets/meatlovers.png";
import pepperoni from "../assets/pepperoni.png";
import tiramisu from "../assets/tiramisu.png";
import veggie from "../assets/veggie.png";
import zeppole from "../assets/zeppole.png";

const images = [
  bbqchicken,
  margherita,
  meatlovers,
  pepperoni,
  veggie,
  chickenwings6pc,
  garlicbread,
  caesarsalad,
  cannoli,
  chocolatelavacake,
  tiramisu,
  zeppole
];

export default function PromoBanner() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Get the 3 images to show at once
  const visibleImages = [
    images[index],
    images[(index + 1) % images.length],
    images[(index + 2) % images.length]
  ];

  return (
    <div
      style={{
        width: "100%",
        padding: "30px 0",
        background: "#fafafa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
      }}
    >
      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "20px",
          background: "white",
          border: "none",
          fontSize: "2rem",
          cursor: "pointer",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        ‹
      </button>

      {/* IMAGE ROW */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          transition: "all 0.5s ease"
        }}
      >
        {visibleImages.map((img, i) => (
          <div
            key={i}
            style={{
              width: "220px",
              height: "160px",
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img
              src={img}
              alt="promo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "8px"
              }}
            />
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          right: "20px",
          background: "white",
          border: "none",
          fontSize: "2rem",
          cursor: "pointer",
          borderRadius: "50%",
          width: "45px",
          height: "45px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}
      >
        ›
      </button>
    </div>
  );
}
