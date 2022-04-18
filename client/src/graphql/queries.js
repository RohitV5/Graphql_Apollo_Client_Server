import { gql } from "@apollo/client";

export const GETALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;
