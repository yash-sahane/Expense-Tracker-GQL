import { signup } from "../../controllers/users.js";

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
    signup: signup,
  },
};

export default userResolvers;
