const { gql } = require('apollo-server');

const userTypeDefs = gql`
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    address: String
    phone_number: String
    email: String!
    password: String!
    transactions: [Transaction!]!
  }
`;

module.exports = userTypeDefs;
