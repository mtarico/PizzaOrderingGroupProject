const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.menuItem.deleteMany();
  await prisma.menuItem.createMany({
    data: [
      { category: "pizza", name: "Margherita", description: "Classic tomato, mozzarella, basil", price: 12.99 },
      { category: "pizza", name: "Pepperoni", description: "Loaded with pepperoni and cheese", price: 14.99 },
      { category: "pizza", name: "BBQ Chicken", description: "BBQ sauce, grilled chicken, red onion", price: 15.99 },
      { category: "pizza", name: "Veggie Supreme", description: "Bell peppers, mushrooms, olives, onions", price: 13.99 },
      { category: "sides", name: "Garlic Bread", description: "Toasted with garlic butter", price: 4.99 },
      { category: "sides", name: "Chicken Wings (6pc)", description: "Choice of buffalo or BBQ", price: 8.99 },
      { category: "sides", name: "Caesar Salad", description: "Romaine, croutons, parmesan", price: 6.99 },
      { category: "desserts", name: "Tiramisu", description: "Classic Italian espresso dessert", price: 5.99 },
      { category: "desserts", name: "Chocolate Lava Cake", description: "Warm, gooey chocolate center", price: 5.49 },
      { category: "drinks", name: "Soda (20oz)", description: "Coke, Diet Coke, Sprite, or Root Beer", price: 2.49 },
      { category: "drinks", name: "Lemonade", description: "Fresh-squeezed house lemonade", price: 3.49 },
      { category: "pasta", name: "Spaghetti Bolognese", description: "House meat sauce, parmesan", price: 11.99 },
      { category: "pasta", name: "Fettuccine Alfredo", description: "Creamy alfredo, grilled chicken", price: 12.99 },
    ],
  });
  console.log("Seeded menu items.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
