import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import resolvers from "./resolvers/resolvers.js";
import schema from "./schema.js";

dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/graphql")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log(err));

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
  csrfPrevention: true,
  cache: "bounded",
});

startStandaloneServer(server, {
  listen: { port: 4024 },
  context: ({ req }) => {
    const token = req.headers.authorization;

    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET || "secret");
        return user;
      } catch (err) {
        console.log(err);
      }
    }
  },
})
  .then(({ url }) => {
    console.log(`Server start at ${url}`);
  })
  .catch((err) => console.log(err));
