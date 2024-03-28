import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProductDataService from '../services/product-data-service';
import ProductDescription from '../views/product-description';
import ProductModal from '../views/product-model';
import ProductTransactionModelService from '../services/product-transaction-model-service';
import ConfirmationModal from '../../../shared/confirmation-modal';

// Functional Component
const DetailProduct = () => {
  const { productId } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const data = await ProductDataService.getProductById(productId);
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching the product", error);
        setError(error);
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  
  const [modalOpen, setModalOpen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleRentClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDateSubmit = async (e) => {
    e.preventDefault();
    const productRentObject = await ProductTransactionModelService.setRentTransaction(productId, product.price, fromDate, toDate);
    console.log(productRentObject);
    const response = await ProductDataService.rentProduct(productRentObject);
    console.log(response.data);
    alert(response.message);
    
    handleModalClose();
    navigate('/');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleBuySubmit = async (e) => {
    e.preventDefault();
    const productBuyObject = await ProductTransactionModelService.setBuyTransaction(productId, product.price);
    const response = await ProductDataService.buyProduct(productBuyObject);
    alert(response.message);
    navigate('/');
    setIsModalOpen(false);
  };


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
        <ProductDescription product={product} />
        <button onClick={handleRentClick}>Rent</button>
        <button onClick={() => setIsModalOpen(true)}>Buy Product</button>
        <ProductModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          onDateSubmit={handleDateSubmit}
          fromValue={fromDate}
          onFromChange={(e) => setFromDate(e.target.value)}
          toValue={toDate}
          onToChange={(e) => setToDate(e.target.value)}
        />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBuySubmit}
        message="Are you sure you want to Buy this product?"
      />
    </div>
    );
};

export default DetailProduct;
