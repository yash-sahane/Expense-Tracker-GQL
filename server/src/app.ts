import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import connectDB from "./database/db.js";
import connectGraphQL from "./graphql/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

const app = express();

config();
app.use(cors());

const port = Number(process.env.PORT);

connectDB();

const server = connectGraphQL();
await server.start();

app.use(express.json());
app.use(
  "/graphql",
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      return { req }; // Ensure request object is available
    },
  }) as any
);

app.listen(port, () => {
  console.log("Server is listening on port", port);
});
