const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  Product,
  Category,
  Order,
  Review,
  SubCategory,
} = require("../models");
const { signToken } = require("../utils/auth");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SERVER_KEY);

const resolvers = {
  Query: {
    categories: async () => {
      //get all catagories
      return await Category.find();
    },
    subCategories: async () => {
      //get all subCatagories
      return await SubCategory.find();
    },
    products: async (parent, { category, subCategory }) => {
      //can query all products
      const params = {};

      //if catagory and/or subcatagory submitted add to params
      if (category) {
        params.category = category;
      }

      if (subCategory) {
        params.subCategory = subCategory;
      }

      //find all products by params, populate catagory and subcat
      return await Product.find(params)
        .populate("category")
        .populate("subCategory");
      //i was going to use params, but found that filtering after was more flexible with react
    },
    product: async (parent, { _id }) => {
      //find a product by id
      return await Product.findById(_id)
        .populate("category")
        .populate("subCategory")
        .populate({ path: "reviews", populate: { path: "user_id" } });
    },
    //find user, but can only be queried by themselves as determined by context
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });
        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    //query a user and their order data
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "products",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    //checkout with stripe
    checkout: async (parent, args, context) => {
      //setup url
      const url = new URL(context.headers.referer).origin;
      //setup order
      const order = new Order({ products: args.products });
      //setup empty line_items
      const line_items = [];

      const { products } = await order.populate("products");
      //give me all the products from that order

      //for each product
      for (let i = 0; i < products.length; i++) {
        //create a product for each product element, with name and desc and images
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description[0].content,
          images: [`${url}${products[i].images[0].image}`],
        });
        //create price for product
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "aud",
        });
        //add to line_item
        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      //create session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
      //return session
      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products, quantity }, context) => {
      if (context.user) {
        const order = new Order({ products, quantity });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    addReview: async (parent, { _id, comment, rating }, context) => {
      const user_id = context.user._id;
      if (context.user) {
        const review = new Review({ user_id, comment, rating });

        await Product.findByIdAndUpdate(_id, {
          $push: { reviews: review },
        });

        return review;
      }

      throw new AuthenticationError("Not logged in");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
