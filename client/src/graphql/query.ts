import { gql } from "@apollo/client";

export const createUser = gql(`
  mutation createUser($data: String) {
    createUser(data: $data) {
      success
      message
      data {
        uid
        fullName
        email
        avatar
      }
    }
  }
`);
