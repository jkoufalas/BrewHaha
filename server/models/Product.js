const mongoose = require("mongoose");

const { Schema } = mongoose;
const Review = require("./Review");

const productSchema = new Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: [
    {
      type: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  ],
  features: [
    {
      title: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  ],
  includes: [
    {
      name: {
        type: String,
      },
    },
  ],
  details: [
    {
      title: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  ],
  images: [
    {
      image: {
        type: String,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
    min: 0.99,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  reviews: [Review.schema],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
