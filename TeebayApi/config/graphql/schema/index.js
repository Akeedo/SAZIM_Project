const { gql } = require('apollo-server');
const productTypeDefs = require('../../../features/product/schema/product-schema');
const transactionTypeDefs = require('../../../features/product/schema/transaction-schema');
const userTypeDefs = require('../../../features/user/schema/user-schema');

const linkTypeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkTypeDefs, productTypeDefs, transactionTypeDefs, userTypeDefs];
