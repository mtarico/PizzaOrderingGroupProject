const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.menuItem.deleteMany();
  await prisma.menuItem.createMany({
    data: [
      { category: "pizza", name: "Margherita", description: "Classic tomato, mozzarella, basil", price: 12.99, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80" },
      { category: "pizza", name: "Pepperoni", description: "Loaded with pepperoni and cheese", price: 14.99, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80" },
      { category: "pizza", name: "BBQ Chicken", description: "BBQ sauce, grilled chicken, red onion", price: 15.99, image: "https://images.unsplash.com/photo-1548365328-8c6db3220e4c?auto=format&fit=crop&w=900&q=80" },
      { category: "pizza", name: "Veggie Supreme", description: "Bell peppers, mushrooms, olives, onions", price: 13.99, image: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=900&q=80" },
      { category: "sides", name: "Garlic Bread", description: "Toasted with garlic butter", price: 4.99, image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=900&q=80" },
      { category: "sides", name: "Chicken Wings (6pc)", description: "Choice of buffalo or BBQ", price: 8.99, image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=80" },
      { category: "sides", name: "Caesar Salad", description: "Romaine, croutons, parmesan", price: 6.99, image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80" },
      { category: "desserts", name: "Tiramisu", description: "Classic Italian espresso dessert", price: 5.99, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80" },
      { category: "desserts", name: "Chocolate Lava Cake", description: "Warm, gooey chocolate center", price: 5.49, image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=900&q=80" },
      { category: "drinks", name: "Soda (20oz)", description: "Coke, Diet Coke, Sprite, or Root Beer", price: 2.49, image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=900&q=80" },
      { category: "drinks", name: "Lemonade", description: "Fresh-squeezed house lemonade", price: 3.49, image: "https://images.unsplash.com/photo-1621509555710-6f1c8a9b5caa?auto=format&fit=crop&w=900&q=80" },
      { category: "pasta", name: "Spaghetti Bolognese", description: "House meat sauce, parmesan", price: 11.99, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80" },
      { category: "pasta", name: "Fettuccine Alfredo", description: "Creamy alfredo, grilled chicken", price: 12.99, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=900&q=80" },
    ],
  });
  console.log("Seeded menu items.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
