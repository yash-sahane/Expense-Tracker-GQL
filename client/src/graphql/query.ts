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
        }
      }
    }
  `);

export const login = gql(`
    mutation login($data : LoginInput!){
      login(data : $data){
        success,
        message,
        data{
          uid,
          fullName,
          email,
        }
      }
    }
  `);

export const getUser = gql(`
    query getUser{
      getUser{
        success,
        data{
          uid,
          fullName, 
          email
        }
      }
    }
  `);
