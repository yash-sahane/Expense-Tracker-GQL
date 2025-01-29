import { getUser, login, signup } from "../../controllers/users.js";
const userResolvers = {
    Query: {
        getUser: getUser,
    },
    Mutation: {
        signup: signup,
        login: login,
    },
};
export default userResolvers;
