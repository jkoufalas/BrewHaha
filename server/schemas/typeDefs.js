const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
    link_name: String
  }

  type SubCategory {
    _id: ID
    name: String
    link_name: String
  }

  type Product {
    _id: ID
    brand: String
    name: String
    description: [ProductDesc]
    features: [ProductFeatures]
    includes: [ProductIncludes]
    details: [ProductDetails]
    images: [ProductImage]
    quantity: Int
    price: Float
    category: Category
    subCategory: SubCategory
    reviews: [Review]
  }

  type ProductDesc {
    _id: ID
    type: String
    content: String
  }

  type ProductFeatures {
    _id: ID
    title: String
    content: String
  }

  type ProductIncludes {
    _id: ID
    name: String
  }

  type ProductDetails {
    _id: ID
    title: String
    content: String
  }

  type ProductImage {
    _id: ID
    image: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Review {
    _id: ID
    reviewDate: String
    user_id: User
    comment: String
    rating: Int
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    address: String
    phoneNumber: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    subCategories: [SubCategory]
    products(category: ID, subCategory: ID): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      address: String
      phoneNumber: String!
      email: String!
      password: String!
    ): Auth
    addOrder(products: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateProduct(_id: ID!, quantity: Int!): Product
    addReview(_id: ID!, comment: String!, rating: Int!): Review
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
