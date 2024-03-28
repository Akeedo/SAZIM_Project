import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query Product {
    products {
      id
      title
      description
      price
      category
      transactions {
        id
        transaction_type
        date
        amount
      }
    }
  }
`;

const GET_USER_TRANSACTIONS_WITH_PRODUCTS = gql`
    query GetUserTransactionsWithProducts($userId: ID!) {
        userTransactionsWithProducts(userId: $userId) {
            transaction_type
            product {
                id
                title
                description
                category
                price
            }
        }
    }
`;

export default { GET_PRODUCTS, GET_USER_TRANSACTIONS_WITH_PRODUCTS };