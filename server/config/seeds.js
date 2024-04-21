const db = require("./connection");
const { User, Product, Category } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Category", "categories");
  await cleanDB("Product", "products");
  await cleanDB("User", "users");

  const categories = await Category.insertMany([
    { name: "Smartphones" },
    { name: "Laptops" },
    { name: "TVs" },
    { name: "Headphones" },
    { name: "Smart home" },
  ]);

  console.log("categories seeded");

  const products = await Product.insertMany([
    // Smartphones
    {
      name: "iPhone 13 Pro",
      description: "The latest iPhone with advanced features.",
      image: "iphone-13-pro.jpg",
      category: categories[0]._id,
      price: 999.99,
      quantity: 100,
    },
    {
      name: "Samsung Galaxy S22",
      description: "Powerful Android smartphone with a stunning display.",
      image: "samsung-galaxy-s22.jpg",
      category: categories[0]._id,
      price: 899.99,
      quantity: 150,
    },
    // Laptops
    {
      name: "MacBook Pro 16-inch",
      description: "Apple's flagship laptop for professionals.",
      image: "macbook-pro-16-inch.jpg",
      category: categories[1]._id,
      price: 2399.99,
      quantity: 50,
    },
    {
      name: "Dell XPS 15",
      description: "Powerful Windows laptop with a stunning display.",
      image: "dell-xps-15.jpg",
      category: categories[1]._id,
      price: 1799.99,
      quantity: 80,
    },
    // TVs
    {
      name: "Sony Bravia OLED A8H",
      description: "Immersive OLED TV with stunning picture quality.",
      image: "sony-bravia-oled-a8h.jpg",
      category: categories[2]._id,
      price: 1999.99,
      quantity: 30,
    },
    {
      name: "Samsung QN90A Neo QLED",
      description: "High-performance QLED TV with advanced features.",
      image: "samsung-qn90a.jpg",
      category: categories[2]._id,
      price: 2499.99,
      quantity: 40,
    },
    // Headphones
    {
      name: "Sony WH-1000XM4",
      description:
        "Premium noise-canceling headphones with exceptional sound quality.",
      image: "sony-wh-1000xm4.jpg",
      category: categories[3]._id,
      price: 349.99,
      quantity: 100,
    },
    {
      name: "Apple AirPods Pro",
      description: "Wireless earbuds with active noise cancellation.",
      image: "apple-airpods-pro.jpg",
      category: categories[3]._id,
      price: 249.99,
      quantity: 150,
    },
    // Smart home
    {
      name: "Amazon Echo (4th Gen)",
      description: "Smart speaker with Alexa voice control.",
      image: "amazon-echo.jpg",
      category: categories[4]._id,
      price: 99.99,
      quantity: 200,
    },
    {
      name: "Google Nest Learning Thermostat",
      description: "Smart thermostat that learns your preferences.",
      image: "google-nest-thermostat.jpg",
      category: categories[4]._id,
      price: 249.99,
      quantity: 50,
    },
  ]);

  console.log("products seeded");

  await User.create({
    firstName: "Mahmoud",
    lastName: "Ahmed",
    email: "Mahmoud@testmail.com",
    password: "password12345",
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "User02",
    lastName: "User02",
    email: "User02@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
