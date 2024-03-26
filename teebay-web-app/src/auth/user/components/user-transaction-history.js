
import React, {useEffect, useState } from 'react';

import TransactionTemplate from '../views/transaction-template';
import UserDataService from '../services/user-data-service';

function UserTransactionHistory(){


    const [buyTransactions, setBuyTransactions] = useState([]);
    const [rentTransactions, setRentTransactions] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const user = localStorage.getItem('user');
                const userObject = JSON.parse(user);
                const userId = userObject.id;
                const data = await UserDataService.getAllUserTransactions(userId);
                const buyTransactionsArray = data.filter(data => data.transaction_type === "buy");
                const rentTransactionsArray = data.filter(data => data.transaction_type === "rent");
                setBuyTransactions(buyTransactionsArray);
                setRentTransactions(rentTransactionsArray);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        getProducts();
    }, []); 

   


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