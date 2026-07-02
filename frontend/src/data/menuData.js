export const categories = [
  { id: "pizza", label: "Pizza", emoji: "🍕" },
  { id: "sides", label: "Sides", emoji: "🧄" },
  { id: "desserts", label: "Desserts", emoji: "🍰" },
  { id: "drinks", label: "Drinks", emoji: "🥤" },
  { id: "pasta", label: "Pasta", emoji: "🍝" },
];

// IMPORT REAL IMAGES
import margheritaImg from "../assets/margherita.png";
import pepperoniImg from "../assets/pepperoni.png";
import bbqImg from "../assets/bbqchicken.png";
import veggieImg from "../assets/veggie.png";
import garlicBreadImg from "../assets/garlicbread.png";
import wingsImg from "../assets/chickenwings6pc.png";
import caesarImg from "../assets/caesarsalad.png";
import tiramisuImg from "../assets/tiramisu.png";
import lavaCakeImg from "../assets/chocolatelavacake.png";
import cannoliImg from "../assets/cannoli.png";
import zeppoleImg from "../assets/zeppole.png";

// MENU ITEMS WITH IMAGES
export const menuItems = [
  { id: 1, category: "pizza", name: "Margherita", description: "Classic tomato, mozzarella, basil", price: 12.99, image: margheritaImg },
  { id: 2, category: "pizza", name: "Pepperoni", description: "Loaded with pepperoni and cheese", price: 14.99, image: pepperoniImg },
  { id: 3, category: "pizza", name: "BBQ Chicken", description: "BBQ sauce, grilled chicken, red onion", price: 15.99, image: bbqImg },
  { id: 4, category: "pizza", name: "Veggie Supreme", description: "Bell peppers, mushrooms, olives, onions", price: 13.99, image: veggieImg },

  { id: 5, category: "sides", name: "Garlic Bread", description: "Toasted with garlic butter", price: 4.99, image: garlicBreadImg },
  { id: 6, category: "sides", name: "Chicken Wings (6pc)", description: "Choice of buffalo or BBQ", price: 8.99, image: wingsImg },
  { id: 7, category: "sides", name: "Caesar Salad", description: "Romaine, croutons, parmesan", price: 6.99, image: caesarImg },

  { id: 8, category: "desserts", name: "Tiramisu", description: "Classic Italian espresso dessert", price: 5.99, image: tiramisuImg },
  { id: 9, category: "desserts", name: "Chocolate Lava Cake", description: "Warm, gooey chocolate center", price: 5.49, image: lavaCakeImg },
  { id: 10, category: "desserts", name: "Cannoli", description: "Crispy shell, sweet ricotta filling", price: 4.99, image: cannoliImg },
  { id: 11, category: "desserts", name: "Zeppole", description: "Italian fried dough with powdered sugar", price: 4.49, image: zeppoleImg },

  { id: 12, category: "drinks", name: "Soda (20oz)", description: "Coke, Diet Coke, Sprite, or Root Beer", price: 2.49, image: null },
  { id: 13, category: "drinks", name: "Lemonade", description: "Fresh-squeezed house lemonade", price: 3.49, image: null },

  { id: 14, category: "pasta", name: "Spaghetti Bolognese", description: "House meat sauce, parmesan", price: 11.99, image: null },
  { id: 15, category: "pasta", name: "Fettuccine Alfredo", description: "Creamy alfredo, grilled chicken", price: 12.99, image: null },
];

// PROMOS
export const promos = [
  { id: 1, label: "Tuesday Special", description: "Buy 2 pizzas, get 1 free!", badge: "🔥 HOT DEAL" },
  { id: 2, label: "Family Bundle", description: "2 Large Pizzas + Sides + Drinks — $39.99", badge: "💰 SAVE $10" },
  { id: 3, label: "Free Delivery", description: "Free delivery on orders over $25", badge: "🚗 FREE" },
];

// RESTAURANT INFO
export const restaurantInfo = {
  name: "Eats-A-Pizza",
  hours: "Open daily from 11:00 AM to 11:00 PM",
  location: "128 Pepperoni Lane, Downtown District",
  history:
    "Founded in 1998, Eats-A-Pizza began as a family-owned neighborhood pizzeria and grew into a local favorite known for handcrafted dough and house-made sauces.",
};
