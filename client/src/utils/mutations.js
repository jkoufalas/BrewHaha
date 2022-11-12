import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      _id
      products {
        _id
        brand
      }
      purchaseDate
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstname: String!
    $lastname: String!
    $address: String
    $phoneNumber: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstname
      lastName: $lastname
      address: $address
      phoneNumber: $phoneNumber
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($id: ID!, $comment: String!, $rating: Int!) {
    addReview(_id: $id, comment: $comment, rating: $rating) {
      _id
      comment
      rating
      reviewDate
    }
  }
`;
