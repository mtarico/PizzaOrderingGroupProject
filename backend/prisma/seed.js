const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.menuItem.deleteMany();
  await prisma.menuItem.createMany({
    data: [
      { category: "pizza", name: "Margherita", description: "Classic tomato, mozzarella, basil", price: 12.99, image: "https://tse2.mm.bing.net/th/id/OIP.tbpzNJD-t8c7latKf_QXvwHaE7?pid=Api&h=220&P=0" },
      { category: "pizza", name: "Pepperoni", description: "Loaded with pepperoni and cheese", price: 14.99, image: "https://oercommons.s3.amazonaws.com/media/courseware/lesson/image/Pizza.png" },
      { category: "pizza", name: "BBQ Chicken", description: "BBQ sauce, grilled chicken, red onion", price: 15.99, image: "https://farm1.staticflickr.com/636/20985151678_3fab294b3d_c.jpg" },
      { category: "pizza", name: "Veggie Supreme", description: "Bell peppers, mushrooms, olives, onions", price: 13.99, image: "https://tse4.mm.bing.net/th/id/OIP.R3WOktJg3aEux3di5-URIwHaKO?pid=Api&h=220&P=0" },
      { category: "sides", name: "Garlic Bread", description: "Toasted with garlic butter", price: 4.99, image: "https://tse4.mm.bing.net/th/id/OIP._b0cY3ejRHuuAdM0mzz6tQAAAA?pid=Api&h=220&P=0" },
      { category: "sides", name: "Chicken Wings (6pc)", description: "Choice of buffalo or BBQ", price: 8.99, image: "https://cf.foodista.com/content/fp/halvpxditncieofl.jpg" },
      { category: "sides", name: "Caesar Salad", description: "Romaine, croutons, parmesan", price: 6.99, image: "https://tse3.mm.bing.net/th/id/OIP.uN5UzDu-3RGwrygn0iWfMQAAAA?pid=Api&h=220&P=0" },
      { category: "desserts", name: "Tiramisu", description: "Classic Italian espresso dessert", price: 5.99, image: "https://www.kochwiki.org/images/thumb/a/ae/Tiramisu_8.jpg/480px-Tiramisu_8.jpg" },
      { category: "desserts", name: "Chocolate Lava Cake", description: "Warm, gooey chocolate center", price: 5.49, image: "https://live.staticflickr.com/1309/1172059708_6e14f183e2.jpg" },
      { category: "drinks", name: "Soda (20oz)", description: "Coke, Diet Coke, Sprite, or Root Beer", price: 2.49, image: "https://www.foodandwine.com/thmb/bOaWQih2xVJGI8aPCBxpV76k2O0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Root-Beer-Guide-FT-BLOG0524-db7459f2d0b240ef9c4ad81864ea6916.jpg" },
      { category: "drinks", name: "Lemonade", description: "Fresh-squeezed house lemonade", price: 3.49, image: "https://www.freeimageslive.co.uk/files/images009/homemade_lemonade_drink.preview.jpg" },
      { category: "pasta", name: "Spaghetti Bolognese", description: "House meat sauce, parmesan", price: 11.99, image: "https://cloud.foodista.com/content/images/d151c3c14a9103ff483724cb74d8a3c3935c8888_607x400.jpg" },
      { category: "pasta", name: "Fettuccine Alfredo", description: "Creamy alfredo, grilled chicken", price: 12.99, image: "https://tse3.mm.bing.net/th/id/OIP.WLQytuq6CLeHlP9qYzlC0wHaHa?pid=Api&h=220&P=0" },
    ],
  });
  console.log("Seeded menu items.");

  await prisma.promo.deleteMany();
  await prisma.promo.createMany({
    data: [
      { label: "Tuesday Special", description: "Buy 2 pizzas, get 1 free!", badge: "🔥 HOT DEAL", discountType: "buy2get1", discountValue: 0, active: true },
      { label: "Family Bundle", description: "2 Large Pizzas + Sides + Drinks — $39.99", badge: "💰 BUNDLE DEAL", discountType: "bundle", discountValue: 39.99, active: true },
      { label: "Free Delivery", description: "Free delivery on orders over $25", badge: "🚗 FREE", discountType: "freeDelivery", discountValue: 0, active: true },
    ],
  });
  console.log("Seeded promos.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
