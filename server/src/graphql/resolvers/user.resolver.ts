import { createUser } from "../../controllers/users.js";
import ErrorHandler from "../../middlewares/error.js";

const userResolvers = {
  Query: {
    // users: () => {
    //   return users;
    // },
    // user: (parent: any, arg: { userId: String }) => {
    //   const filteredUsers = users.find((user) => user._id === arg.userId);
    //   console.log(filteredUsers);
    //   return filteredUsers;
    // },
  },

  Mutation: {
    createUser: createUser,
  },
};

export default userResolvers;
