
import React, {useEffect, useState } from 'react';
import ProductTable from './product-table';
import axios from 'axios';

function GetAllProduct(){

   const [APIData, setAPIData] = useState([]);
    useEffect(() => {
        axios.get('https://65f88c14df151452460fa890.mockapi.io/api/v1/products')
        .then((response) => {
            setAPIData(response.data);
        });
    }, []);
 return (
        <div>
            <h2>All Products</h2>
            <ProductTable products={APIData} />
        </div>
    );
}

export default GetAllProduct;