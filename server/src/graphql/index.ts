import { ApolloServer } from "@apollo/server";
import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typedefs/index.js";

const connectGraphQL = () => {
  const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolvers,
  });

  return server;
};

export default connectGraphQL;
