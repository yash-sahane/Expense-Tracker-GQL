const transactionTypeDef = `#graphql
  type Transaction {
    uid : ID!
    description : String!
    paymentType : String!
    category : String!
    amount : Int!
    date : String!
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

  type TransactionResponse{
    success : Boolean
    message : String
    data : Transaction
  }

  type Query {
    transactions : [Transaction!]
    transaction(transactionId : ID) : Transaction
  }

  type Mutation {
    createTransaction(data : createTransactionInput): TransactionResponse
    updateTransaction(data : updateTransactionInput) : TransactionResponse
    deleteTransaction(transactionId : ID!) : TransactionResponse
  }
`;

export default transactionTypeDef;
