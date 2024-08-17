// src/components/Cart/Cart.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2 className="cart-title">Your Cinema Tickets</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty. Add some classic films!</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}>-</button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                  />
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <button className="cart-item-remove" onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;