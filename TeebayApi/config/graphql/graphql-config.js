const { ApolloServer, gql } = require('apollo-server-express');
const axios = require('axios');
const typeDefs = require('./schema/index');
const resolvers = require('./resolvers/index');
const jwt = require('jsonwebtoken');

const setupApolloServer = async (app) => {
    const server = new ApolloServer({ 
      typeDefs, 
      resolvers,
    });
  
    await server.start();
    
    server.applyMiddleware({ app, path: '/graphql' });
  
    return server;
  };
  module.exports = setupApolloServer;