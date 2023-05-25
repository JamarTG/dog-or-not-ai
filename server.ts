import express from "express";
import { config } from 'dotenv';
import { ApolloServer } from "apollo-server-express";

import typeDefinitions from "./type-definitions";
import resolvers from "./query-resolvers";

async function startApolloServer() {
  config();
  const app = express();

  const server = new ApolloServer({ typeDefs : typeDefinitions, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port : process.env.PORT }, function () {
    console.log(`🚀 Server started on port ${process.env.PORT}. Access it at http://localhost:${process.env.PORT}`);
  });
}

startApolloServer();

// ts-node server.ts  - to start server
// query API @ localhost:3000/graphql OR Postman

// Example query
// =========================================================
// query {
//   isDogPresent(url: "https://i.imgur.com/Xj3BteF.jpeg")
// }  
// ==========================================================