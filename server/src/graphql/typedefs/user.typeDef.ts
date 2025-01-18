const userTypeDef = `#graphql
  type User {
    _id : ID!
    fullName : String!
    userName : String!
    password : String!
    gender : String!
  }

  input SignupData {
    fullName : String!
    userName : String!
    gender : String!
    password : String!
  }

  input LoginData {
    userName : String!
    password : String!
  }

  type Response {
    success : String!
    message : String!
    data : String
  }

  type Query {
    users : [User!]
    authUser : User
    user(userId : ID!) : User
  }

  type Mutation{
    signup(data : SignupData) : Response
    login(data : LoginData) : Response
    logout : Response
  }
`;

export default userTypeDef;
