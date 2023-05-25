import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    isDogPresent(url: String!): String
  }
`;

export default typeDefs;