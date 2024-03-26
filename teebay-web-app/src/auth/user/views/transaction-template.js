import React, { useState } from 'react';

const TransactionTemplate = () => {
  // State to manage active tab
    const [activeTab, setActiveTab] = useState('Bought');

  // Function to render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
        case 'Bought':
            return (
                <div className="product-detail">
                    <h2>{product.title}</h2>
                    <p>Description: {product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Category: {product.category}</p>
                </div>
            );
        case 'Sold':
            return <div>Sold content goes here.</div>;
        case 'Lend':
            return <div>Lend content goes here.</div>;
        case 'Borrow':
            return <div>Borrow content goes here.</div>;
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
