import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID, $subCategory: ID) {
    products(category: $category, subCategory: $subCategory) {
      _id
      category {
        name
      }
      description {
        content
        type
      }
      details {
        content
        title
      }
      features {
        content
        title
      }
      images {
        image
      }
      includes {
        name
      }
      brand
      name
      price
      quantity
      subCategory {
        name
      }
    }
  }
`;

export const QUERY_PRODUCT = gql`
  query Product($id: ID!) {
    product(_id: $id) {
      _id
      brand
      category {
        _id
        name
      }
      description {
        _id
        content
      }
      details {
        _id
        content
      }
      features {
        _id
        content
      }
      images {
        _id
        image
      }
      includes {
        _id
        name
      }
      name
      price
      quantity
      subCategory {
        _id
        name
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
