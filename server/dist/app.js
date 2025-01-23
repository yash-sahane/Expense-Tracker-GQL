import express from "express";
import { config } from "dotenv";
import connectDB from "./database/db.js";
import connectGraphQL from "./graphql/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import { errMiddleware } from "./middlewares/error.js";
const app = express();
config();
const port = Number(process.env.PORT);
connectDB();
const server = connectGraphQL();
await server.start();
app.use(express.json());
app.use("/graphql", expressMiddleware(server));
app.listen(port, () => {
    console.log("Server is listening on port", port);
});
app.use((err, req, res, next) => {
    errMiddleware(err, req, res, next);
});
