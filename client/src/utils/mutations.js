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
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
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
