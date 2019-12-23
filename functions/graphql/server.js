const { ApolloServer, gql } = require('apollo-server-express');

const express = require('express');

const typeDefs = gql`
type Query {
  "A simple type for getting started!"
  hello: String
}
`;

const resolvers = {
  Query: {
    hello: () => 'world',
  }
};

function serverFn() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });

  apolloServer.applyMiddleware({
    app,
    path: '/',
    cors: true,
  });

  return app;
}

module.exports = serverFn;