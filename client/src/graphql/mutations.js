import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignupUser($userNew: UserInput!) {
    signupUser(userNew: $userNew) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation signinUser($userSignin: UserSigninInput!) {
    signinUser(userSignin: $userSignin) {
      token
    }
  }
`;
