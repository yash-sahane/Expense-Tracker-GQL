import { users } from "../../DummyData/index.js";
const userResolvers = {
    Query: {
        users: () => {
            return users;
        },
        user: (parent, arg) => {
            const filteredUsers = users.find((user) => user._id === arg.userId);
            console.log(filteredUsers);
            return filteredUsers;
        },
    },
};
export default userResolvers;
