import express from "express";
import { config } from "dotenv";
import connectDB from "./database/db.js";
import connectGraphQL from "./graphql/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import admin from "./config/firebase.js";
import User from "./model/user.model.js";

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
      const token = req.headers.authorization;

      if (!token) {
        return { req, user: null };
      }

      try {
        const decodedToken = await admin
          .auth()
          .verifyIdToken(token.replace("Bearer ", ""));

        const { uid } = decodedToken;

        const user = await User.findOne({ uid });

        if (!user) {
          throw new Error("User not found");
        }
        return { req, user };
      } catch (e) {
        console.log(e.message);
        return { req, user: null };
      }
    },
  })
);

app.listen(port, () => {
  console.log("Server is listening on port", port);
});
