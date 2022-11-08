import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID, $subCategory: ID) {
    products(category: $category, subCategory: $subCategory) {
      _id
      name
      description {
        type: String
        content: String
      }
      features: {
        title: String
        content: String
      }
      includes: {
        name: String
      }
      details: {
        title: String
        content: String
      }
      images: {
        image: String
      }
      price
      quantity
      category {
        _id
      }
      subCategory {
        _id
      }
    }
  }
`;
