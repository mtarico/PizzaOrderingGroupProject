import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

import pizzaImg    from "../../assets/pizza.png";
import sidesImg    from "../../assets/sides.png";
import dessertsImg from "../../assets/desserts.png";
import drinksImg   from "../../assets/drinks.png";
import pastaImg    from "../../assets/pasta.png";

const categoryImages = {
  pizza:    pizzaImg,
  sides:    sidesImg,
  desserts: dessertsImg,
  drinks:   drinksImg,
  pasta:    pastaImg,
};

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <button
      className="category-card"
      onClick={() => navigate(`/menu?category=${category.id}`)}
    >
      <div className="category-image-wrapper">
        <img
          src={categoryImages[category.id]}
          alt={category.label}
          className="category-image"
        />
      </div>
      <span className="category-label">{category.label}</span>
    </button>
  );
}
