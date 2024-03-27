const { gql } = require('apollo-server');

const productTypeDefs = gql`
  type Product {
    id: ID!
    title: String!
    description: String
    price: Float!
    category: String!
    transactions: [Transaction] 
  }

  extend type Query {
    products: [Product!]!
    product(id: ID!): Product
    userTransactionsWithProducts(userId: ID!): [Transaction!]!
  }

  extend type Mutation {
    createProduct(title: String!, description: String, price: Float!, category: String!): Product
    deleteProduct(id: ID!): Product
    updateProduct(id: ID!, title: String, description: String, price: Float, category: String): Product 
  }
`;

module.exports = productTypeDefs;
