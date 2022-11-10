const db = require("../connection");
const { User, Product, Category, SubCategory } = require("../../models");
const importProducts = require("./Products.json");

db.once("open", async () => {
  await Category.deleteMany();
  await SubCategory.deleteMany();
  await Product.deleteMany();

  const categories = await Category.insertMany([
    { name: "Coffee Machines" },
    { name: "Grinders" },
    { name: "Bartista Products" },
  ]);

  const subCategories = await SubCategory.insertMany([
    { name: "Home Coffee Machines" },
    { name: "Automatic Coffee Machines" },
    { name: "Auto Grinders" },
    { name: "Manual Grinders" },
    { name: "Jugs" },
    { name: "Thermometers" },
    { name: "Tampers" },
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

  /* await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  }); */

  /*   console.log('users seeded'); */

  process.exit();
});
