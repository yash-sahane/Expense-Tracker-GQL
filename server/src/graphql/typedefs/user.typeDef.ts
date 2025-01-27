const userTypeDef = `#graphql
  type User {
    uid : ID!
    fullName : String!
    email : String!
    avatar : String!
  }

  input SignupInput {
    fullName : String!
    email : String!
    avatar : String!
  }

  input LoginInput {
    email : String!
  }

  type UserResponse {
    success : String!
    message : String!
    data : User
  }

  type Query {
    # authUser : User
    user(uid : ID!) : User
  }

  type Mutation{
    signup(data : SignupInput) : UserResponse
    login(data : LoginInput) : UserResponse
    # logout : UserResponse
  }
`;

export default userTypeDef;
