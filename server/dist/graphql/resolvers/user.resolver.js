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
        createUser: (_, { data }, { req, res, next }) => {
            const token = req.headers.authorization || "";
            if (!token) {
                return next(new ErrorHandler(401, "Please login to access this route"));
            }
        },
    },
};
export default userResolvers;
