
import React, {useEffect, useState } from 'react';
import ProductTable from '../views/product-table';
import ProductDataService from '../services/product-data-service';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GetAllProduct(){

    const navigate = useNavigate();

    const handleUpdateClick = (productId) => {
        navigate(`/update-product/${productId}`);
    };

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

    const onDelete = (id) => {
        ProductDataService.deleteProduct(id)
            .then(() => {
                reload();
            })
            .catch(error => {
                console.error("There was an error deleting the product", error);
            });
    };

    const reload = () => {
        window.location.reload();
    }


    return (
        <div>
            <h2>All Products</h2>
            <ProductTable products={APIData} onDelete={onDelete} handleUpdateClick={handleUpdateClick} />
        </div>
    );
}

export default GetAllProduct;