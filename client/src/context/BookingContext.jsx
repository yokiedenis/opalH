import React, { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (cartId) => {
    const updatedItems = cartItems.filter((item) => item.cartId !== cartId);
    setCartItems(updatedItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        setBookings,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        currentBooking,
        setCurrentBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
