import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "expense_tracker" })
    .then(() => console.log("Database has been connected"))
    .catch((e) => console.log(e));
};

export default connectDB;
