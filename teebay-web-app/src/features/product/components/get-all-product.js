import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql, useApolloClient } from '@apollo/client';
import ProductTable from '../views/product-table';
import  Queries  from '../../../shared/queries'; 
import ProductDataService from '../services/product-data-service';
import { Button } from 'semantic-ui-react';
import ConfirmationModal from '../../../shared/confirmation-modal';


function GetAllProduct() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(Queries.GET_PRODUCTS);
  const client = useApolloClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleUpdateClick = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  const handleDetailClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const onDeleteConfirmed = () => {
    onDelete(selectedProductId);
    setIsModalOpen(false);
  };

    const onDelete = (id) => {
        ProductDataService.deleteProduct(id)
        .then(() => {
            client.cache.evict({ id: client.cache.identify({ __typename: 'Product', id }) });
            client.cache.gc(); 
            client.refetchQueries({
              include: [Queries.GET_PRODUCTS],
            });
          })
          .catch(error => {
            console.error("There was an error deleting the product", error);
          });
    };


    if (loading) return <p>Loading transactions...</p>;
    if (error) return <p>Error loading transactions: {error.message}</p>;

  return (
    <div>
      <h2>All Products</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Button onClick={() => navigate('/create-product')} primary>Create Product</Button>
        <Button onClick={() => navigate('/user-product-transaction')} primary>User Transaction History</Button>
    </div>

     
      <ProductTable products={data.products} onDelete={handleDeleteClick} handleUpdateClick={handleUpdateClick} handleDetailClick={handleDetailClick} />
      <ConfirmationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onDeleteConfirmed}
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
}

export default GetAllProduct;
