import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <button
      className="category-card"
      onClick={() => navigate(`/menu?category=${category.id}`)}
    >
      <div className="category-emoji">{category.emoji}</div>
      <span className="category-label">{category.label}</span>
    </button>
  );
}
