
import React from 'react';
import ProductTable from './product-table';

function GetAllProduct(){
      // Sample products data
  const sampleProducts = [
        {
            title: 'Ultra HD TV',
            category: 'Electronics',
            description: 'A large, ultra HD television, perfect for family movie nights.',
            price: '999.99',
        },
        {
            title: 'Bookshelf',
            category: 'Furniture',
            description: 'A wooden bookshelf with five shelves, ideal for any living room or study.',
            price: '249.99',
        },
        {
            title: 'Running Shoes',
            category: 'Sportswear',
            description: 'Lightweight running shoes with excellent grip and comfort.',
            price: '79.99',
        },
    // Add more products as needed
    ];

    return (
        <div>
            <h2>All Products</h2>
            <ProductTable products={sampleProducts} />
        </div>
    );
}

export default GetAllProduct;