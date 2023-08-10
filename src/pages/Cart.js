import React from 'react';

function Cart() {
  // Dummy data for the cart
  const cartItems = [
    { id: 1, name: 'Product 1', price: 100, quantity: 2 },
    // Add more items as needed
  ];

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      {/* Checkout button and other cart functionality */}
    </div>
  );
}

export default Cart;
