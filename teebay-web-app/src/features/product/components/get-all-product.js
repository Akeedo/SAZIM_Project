
import React, {useEffect, useState } from 'react';
import ProductTable from '../views/product-table';
import ProductDataService from '../services/product-data-service';
import axios from 'axios';

function GetAllProduct(){

    const [APIData, setAPIData] = useState([]);
   
    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await ProductDataService.getAllProducts();
                setAPIData(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        getProducts();
    }, []); 


    return (
        <div>
            <h2>All Products</h2>
            <ProductTable products={APIData} />
        </div>
    );
}

export default GetAllProduct;