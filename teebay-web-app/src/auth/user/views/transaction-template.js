import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const TransactionTemplate = ({ buyTransactions, rentTransactions }) => {
  const [activeTab, setActiveTab] = useState('Bought');
  const navigate = useNavigate();
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
        >{tab}
        </li>
      ))}
    </ul>
    
    <div className="tab-content">{renderContent()}</div>
    
    <Button onClick={() => navigate('/')} >Back to Products</Button>
  </div>

  );
};

export default TransactionTemplate;
