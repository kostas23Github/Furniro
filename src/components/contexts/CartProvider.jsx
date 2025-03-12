import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CartContext from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      // Only parse if the storedCart exists (not null or undefined)
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]); // Fallback to empty array if no cart in localStorage
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      setCart([]); // Fallback to empty array if JSON parsing fails
    }
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const updateCart = (product, action) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        if (action === "increment") {
          if (existingProduct.quantity < product.stock) {
            // Increment quantity if below stock limit
            return prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
        } else if (action === "decrement") {
          if (existingProduct.quantity > 1) {
            // Decrement quantity if greater than 1
            return prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
          } else {
            // Remove the product from the cart if quantity is 1 and decrement is attempted
            return prevCart.filter((item) => item.id !== product.id);
          }
        }
      } else if (action === "increment") {
        // Add new product to cart when incrementing
        if (product.stock === 0) return prevCart;
        return [...prevCart, { ...product, quantity: 1 }];
      }

      return prevCart; // No changes if action is neither increment nor decrement
    });
  };

  const removeItem = (productId) => {
    setCart(prevCart=>prevCart.filter(item=>item.id !== productId))
  }

  // Clear cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider value={{ cart, updateCart, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
