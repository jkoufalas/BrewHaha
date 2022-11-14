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
  mutation addOrder($products: [ID]!, $quantity: [Int]!) {
    addOrder(products: $products, quantity: $quantity) {
      _id
      products {
        _id
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

export const UPDATE_USER = gql`
  mutation updateUser(
    $firstname: String
    $lastname: String
    $address: String
    $phoneNumber: String
    $email: String
  ) {
    updateUser(
      firstName: $firstname
      lastName: $lastname
      address: $address
      phoneNumber: $phoneNumber
      email: $email
    ) {
      _id
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
