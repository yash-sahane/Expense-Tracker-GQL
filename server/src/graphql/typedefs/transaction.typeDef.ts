const transactionTypeDef = `#graphql
  type Transaction {
    _id : ID!
    uid : ID!
    description : String!
    paymentType : String!
    category : String!
    amount : Int!
    Date : String!
  }

  input createTransactionInput {
    description : String!
    paymentType : String!
    category : String!
    amount : Int!
  }

  input updateTransactionInput {
    transactionId : ID!
    description : String
    paymentType : String
    category : String
    amount : Int
  }

  type Response{
    success : String!
    message : String!
    data : String
  }

  type Query {
    transactions : [Transaction!]
    transaction(transactionId : ID) : Transaction
  }

  type Mutation {
    createTransaction(data : createTransactionInput): Response
    updateTransaction(data : updateTransactionInput) : Response
    deleteTransaction(transactionId : ID!) : Response
  }
`;

export default transactionTypeDef;
