import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDataService from '../services/product-data-service';
import ProductDescription from '../views/product-description';
import ProductModal from '../views/product-model';
import ProductTransactionModelService from '../services/product-transaction-model-service';


// Functional Component
const DetailProduct = () => {
  const { productId } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);

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
    console.log(`Renting from ${fromDate} to ${toDate}`);
    const productRentObject = await ProductTransactionModelService.setRentTransaction(productId, product.price, fromDate, toDate);
    console.log(productRentObject);
    const response = await ProductDataService.rentProduct(productRentObject);
    console.log(response.data);
    handleModalClose();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product: {error.message}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
        <ProductDescription product={product} />
        <button onClick={handleRentClick}>Rent</button>
        <ProductModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          onDateSubmit={handleDateSubmit}
          fromValue={fromDate}
          onFromChange={(e) => setFromDate(e.target.value)}
          toValue={toDate}
          onToChange={(e) => setToDate(e.target.value)}
        />
      </div>
    );
};

export default DetailProduct;
