import { gql } from "@apollo/client";

export const signup = gql(`
    mutation signup($data: SignupInput!){
      signup(data : $data){
        success,
        message,
        data{
          uid,
          fullName,
          email,
          avatar
        }
      }
    }
  `);
