import { useEffect, useState } from "react";

const promos = [
  "🔥 Tuesday Special: Buy 2 Pizzas, Get 1 Free!",
  "💰 Family Bundle: Save $10 on 2 Large Pizzas + Sides!",
  "🚗 Free Delivery on Orders Over $25!",
  "🎉 Summer Deal: Get 15% Off All Pizzas — Today Only!"
];

export default function SlimPromoBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % promos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        background: "#ff4d4d",
        color: "white",
        padding: "8px 0",
        textAlign: "center",
        fontSize: "0.95rem",
        fontWeight: "600",
        letterSpacing: "0.5px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        transition: "opacity 0.5s ease",
      }}
    >
      {promos[index]}
    </div>
  );
}
