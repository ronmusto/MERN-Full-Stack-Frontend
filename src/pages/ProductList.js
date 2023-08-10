import React from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  // Dummy data for products (replace with actual data fetching)
  const products = [
    {
      "Invoice": 489434,
      "StockCode": 85048,
      "Description": "15CM CHRISTMAS GLASS BALL 20 LIGHTS",
      "Quantity": 12,
      "Price": 6.95,
      "Country": "United Kingdom"
    },
    // Add more products as needed
  ];

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <Link to={`/shopping/product/${product.StockCode}`}>
                {product.Description} - ${product.Price} (Available: {product.Quantity})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
