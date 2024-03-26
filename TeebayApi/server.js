const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');


const cors = require('cors');
const Joi = require('joi');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ProductRoutes = require('./features/product/product-route');
const AuthRoutes = require('./features/authentication/auth-route');
const UserRoutes = require('./features/user/user-routes');
const typeDefs = require('./config/graphql/schema/index')
const { ApolloServer } = require('apollo-server');

const app = express();
app.use(bodyParser.json());

app.use(cors());
const prisma = new PrismaClient();

// Joi schema definition
const userSchema = Joi.object({
    userName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });

// Validation middleware
const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  };

  app.use('/auth', AuthRoutes);
  app.use('/products', ProductRoutes);
  app.use('/users', UserRoutes);

const resolvers = {
  Query: {
    products: async () => {
      return await prisma.products.findMany({
        include: {
          transactions: true, 
        },
      });
    },
    product: async (_, args) => {
      const { id } = args;
      return await prisma.products.findUnique({
        where: { id: parseInt(id) },
        include: {
          transactions: true, 
        },
      });
    },
  },
  Product: {
    price: (parent) => parent.price.toNumber(),
    transactions: (parent) => parent.transactions,
  },
  Transaction: {
    date: (parent) => parent.date.toISOString(),
    product: async (parent) => {
      return await prisma.products.findUnique({
        where: { id: parent.product_id },
      });
    },
    user: async (parent) => {
      return await prisma.users.findUnique({
        where: { id: parent.user_id },
      });
    },
  },
};


const server = new ApolloServer({ typeDefs, resolvers });

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
