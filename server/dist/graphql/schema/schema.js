const Schema = `#graphql
  type User {
    _id : ID!
    full_name : String!
    user_name : String!
    password : String!
    gender : String!
  }

  type Query {
    users : [User!]
    authUser : User
    user(userId : ID!) : User
  }

  input SignupData {
    full_name : String!
    user_name : String!
    gender : String!
    password : String!
  }

  input LoginData {
    user_name : String!
    password : String!
  }

  type Response {
    success : String
    message : String
    data : String
  }

  type Mutation{
    signup(data : SignupData) : Response
    login(data : LoginData) : Response
    logout : Response
  }
`;
export default Schema;
