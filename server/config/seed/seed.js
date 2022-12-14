const db = require("../connection");
const { User, Product, Category, SubCategory } = require("../../models");
const importProducts = require("./Products.json");

db.once("open", async () => {
  await Category.deleteMany();
  await SubCategory.deleteMany();
  await Product.deleteMany();

  const categories = await Category.insertMany([
    { name: "Coffee Machines", link_name: "Coffee_Machines" },
    { name: "Grinders", link_name: "Grinders" },
    { name: "Bartista Products", link_name: "Bartista_Products" },
  ]);

  const subCategories = await SubCategory.insertMany([
    { name: "Home Coffee Machines", link_name: "Home_Coffee_Machines" },
    {
      name: "Automatic Coffee Machines",
      link_name: "Automatic_Coffee_Machines",
    },
    { name: "Auto Grinders", link_name: "Auto_Grinders" },
    { name: "Manual Grinders", link_name: "Manual_Grinders" },
    { name: "Jugs", link_name: "Jugs" },
    { name: "Thermometers", link_name: "Thermometers" },
    { name: "Tampers", link_name: "Tampers" },
  ]);

  const newProducts = importProducts.map((product) => {
    product.category = categories[product.category];
    product.subCategory = subCategories[product.subCategory];
    return product;
  });

  console.log("categories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([...newProducts]);

  console.log("products seeded");

  await User.deleteMany();

  await User.create({
    firstName: "John",
    lastName: "Koufalas",
    email: "eholt@testmail.com",
    address: "111 fake place",
    phoneNumber: "041554445",
    password: "password",
  });

  console.log("users seeded");

  process.exit();
});
