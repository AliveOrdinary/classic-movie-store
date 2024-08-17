import React, { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (movie) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === movie.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...movie, quantity: 1 }]
    })
  }

  const removeFromCart = (movieId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== movieId))
  }

  const updateQuantity = (movieId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === movieId ? { ...item, quantity: quantity } : item
      )
    )
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}