import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch unique products from the new API endpoint
    fetch('http://localhost:4200/unique-products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching unique products:', error));
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.StockCode}>
            <Link to={`/shopping/product/${product.StockCode}`}>
                {product.Description} - ${product.Price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
