// ProductModal.js
import React from 'react';

const ProductModal = ({ isOpen, onClose, onDateSubmit, fromValue, onFromChange, toValue, onToChange }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Select Rental Dates</h3>
        <form onSubmit={onDateSubmit}>
          <label>
            From:
            <input type="date" value={fromValue} onChange={onFromChange} />
          </label>
          <label>
            To:
            <input type="date" value={toValue} onChange={onToChange} />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
