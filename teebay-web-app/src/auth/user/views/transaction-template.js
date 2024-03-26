import React, { useState } from 'react';

const TransactionTemplate = ({ buyTransactions, rentTransactions }) => {
  const [activeTab, setActiveTab] = useState('Bought');

  const renderTransactions = (transactions) => transactions.map((transaction, index) => (
    <div key={index} className="product-detail">
      <h2>{transaction.product.title}</h2>
      <p>Description: {transaction.product.description}</p>
      <p>Price: ${transaction.product.price}</p>
      <p>Category: {transaction.product.category}</p>
    </div>
  ));

  const renderContent = () => {
    switch (activeTab) {
      case 'Bought':
        return renderTransactions(buyTransactions);
      case 'Sold':
        // Placeholder for sold transactions, adjust as needed
        return <div>Sold content goes here.</div>;
      case 'Lend':
        // Placeholder for lend transactions, adjust as needed
        return <div>Lend content goes here.</div>;
      case 'Borrow':
        return renderTransactions(rentTransactions);
      default:
        return <div>Select a tab.</div>;
    }
  };

  return (
    <div>
      <ul className="tab-list">
        {['Bought', 'Sold', 'Lend', 'Borrow'].map((tab) => (
          <li
            key={tab}
            className={`tab-list-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
};

export default TransactionTemplate;
