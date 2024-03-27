import React from 'react';
import { useQuery } from '@apollo/client';
import TransactionTemplate from '../views/transaction-template';
import  Queries  from '../../../shared/queries'; 

function UserTransactionHistory() {
  const user = localStorage.getItem('user');
  const userObject = JSON.parse(user);
  const userId = userObject?.id;

  const { loading, error, data } = useQuery(Queries.GET_USER_TRANSACTIONS_WITH_PRODUCTS, {
    variables: { userId },
  });

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error loading transactions: {error.message}</p>;

  // Filter transactions by type after fetching
  const buyTransactions = data?.userTransactionsWithProducts.filter(transaction => transaction.transaction_type === "buy") || [];
  const rentTransactions = data?.userTransactionsWithProducts.filter(transaction => transaction.transaction_type === "rent") || [];

  return (
    <div>
      <h2>All The Transaction</h2>
      <TransactionTemplate 
          buyTransactions={buyTransactions} 
          rentTransactions={rentTransactions} 
      />
    </div>
  );
}

export default UserTransactionHistory;
