import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Cart from '../../components/Cart/Cart';
import Error from '../../components/Error/Error';
import './Checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { cart } = useCart();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Here you would typically send the order to your backend
      console.log('Order submitted:', { cart, customerInfo: formData });
      alert('Thank you for your order!');
      navigate('/');
    } catch (err) {
      setError('Failed to submit order. Please try again.');
    }
  };

  if (error) return <Error message={error} />;

  return (
    <div className="checkout">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-content">
          <div className="cart-summary">
            <Cart />
          </div>
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2 className="form-title">Shipping Information</h2>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="place-order-btn">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;