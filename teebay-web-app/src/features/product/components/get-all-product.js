import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ProductTable from '../views/product-table';
import  Queries  from '../../../shared/queries'; 
import ProductDataService from '../services/product-data-service';



function GetAllProduct() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(Queries.GET_PRODUCTS);

  const handleUpdateClick = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  const handleDetailClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

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
      {/* Ensure ProductTable can handle the data structure */}
      <ProductTable products={data.products} onDelete={onDelete} handleUpdateClick={handleUpdateClick} handleDetailClick={handleDetailClick} />
    </div>
  );
}

export default GetAllProduct;
