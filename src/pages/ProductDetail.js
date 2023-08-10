import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { productId } = useParams();

  // Fetch the product details using the productId (StockCode)
  // For now, using dummy data
  const product = {
    "Invoice": 489434,
    "StockCode": productId,
    "Description": "15CM CHRISTMAS GLASS BALL 20 LIGHTS",
    "Quantity": 12,
    "Price": 6.95,
    "Country": "United Kingdom"
  };

  return (
    <div>
      <h2>{product.Description}</h2>
      <p>Price: ${product.Price}</p>
      <p>Available Quantity: {product.Quantity}</p>
      <p>Country: {product.Country}</p>
      {/* Add to cart button and other details */}
    </div>
  );
}

export default ProductDetail;
