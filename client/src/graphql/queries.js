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

export const GET_MSGS = gql`
  query MessagesByUser($receiverId: Int!) {
    messagesByUser(receiverId: $receiverId) {
      id
      text
      receiverId
      createdAt
      senderId
    }
  }
`;
