import Transaction from "../model/transaction.model.js";

export const getTransactions = async (_, __, { user }) => {
  try {
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const transactions = await Transaction.find({ uid: user.uid });
    return {
      success: true,
      data: transactions,
    };
  } catch (e) {
    console.log(e.message);
  }
};

export const getTransaction = async (_, { transactionId }) => {
  try {
    const transaction = await Transaction.find({ uid: transactionId });
    if (!transaction) {
      return {
        success: false,
        message: "Transaction not found",
      };
    }

    return {
      success: true,
      data: transaction,
    };
  } catch (e) {
    console.log(e.message);
  }
};

export const createTransaction = async (_, { data }, { user }) => {
  try {
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const transaction = new Transaction({ ...data, uid: user.uid });
    await transaction.save();

    return {
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    };
  } catch (e) {
    console.log(e.message);
  }
};

export const updateTransaction = async (_, { data }, { user }) => {
  try {
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const transaction = await Transaction.findByIdAndUpdate(
      data.transactionId,
      data,
      { new: true }
    );

    return {
      success: true,
      message: "Transaction updated successfully",
      data: transaction,
    };
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteTransaction = async (_, { transactionId }, { user }) => {
  try {
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const transaction = await Transaction.findByIdAndDelete(transactionId);

    return {
      success: true,
      message: "Transaction deleted successfully",
      data: transaction,
    };
  } catch (e) {
    console.log(e.message);
  }
};
