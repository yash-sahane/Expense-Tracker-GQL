import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
} from "../../controllers/transactions.js";

const transactionResolvers = {
  Query: {
    transactions: getTransactions,
    // transaction: getTransaction,
  },

  Mutation: {
    // createTransaction: createTransaction,
    // updateTransaction: updateTransaction,
    // deleteTransaction: deleteTransaction,
  },
};

export default transactionResolvers;
