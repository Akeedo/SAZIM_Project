const { gql } = require('apollo-server');

const transactionTypeDefs = gql`
  type Transaction {
    id: ID!
    product_id: Int!
    user_id: Int!
    transaction_type: String!
    date: String!
    amount: Float!
    product: Product!
    user: User!
  }
`;

module.exports = transactionTypeDefs;
