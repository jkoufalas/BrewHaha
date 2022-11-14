import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID, $subCategory: ID) {
    products(category: $category, subCategory: $subCategory) {
      _id
      category {
        name
        link_name
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
        link_name
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
        type
      }
      details {
        _id
        content
        title
      }
      features {
        _id
        content
        title
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
      reviews {
        _id
        reviewDate
        user_id {
          _id
          firstName
          lastName
        }
        comment
        rating
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

export const QUERY_CATEGORIES_AND_SUBCATEGORIES = gql`
  {
    categories {
      _id
      name
      link_name
    }
    subCategories {
      _id
      name
      link_name
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
      link_name
    }
  }
`;

export const QUERY_SUBCATEGORIES = gql`
  {
    subCategories {
      _id
      name
      link_name
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
