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

  type Response {
    success : String!
    message : String!
    data : User
  }

  type Query {
    users : [User!]
    # authUser : User
    user(uid : ID!) : User
  }

  type Mutation{
    createUser(data : SignupInput) : Response
    signup(data : SignupInput) : Response
    login(data : LoginInput) : Response
    logout : Response
  }
`;
export default userTypeDef;
