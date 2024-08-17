import React from 'react';
import './Error.css';

const Error = ({ message }) => {
  return (
    <div className="error">
      <div className="error-icon">⚠️</div>
      <h2 className="error-title">Oops! Something went wrong.</h2>
      <p className="error-message">{message || 'An unexpected error occurred. Please try again later.'}</p>
    </div>
  );
};

export default Error;