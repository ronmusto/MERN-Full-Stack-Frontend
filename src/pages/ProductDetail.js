import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product details using the productId (StockCode)
    fetch(`/product-detail/${productId}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [productId]);

  return (
    product ? (
      <div>
        <h2>{product.Description}</h2>
        <p>Price: ${product.Price}</p>
        <p>Available Quantity: {product.Quantity}</p>
        <p>Country: {product.Country}</p>
        {/* Add to cart button and other details */}
      </div>
    ) : <div>Loading...</div>
  );
}

export default ProductDetail;
