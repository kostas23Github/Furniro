import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {
  // Initialize state directly from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : []; // Use stored cart or fallback to empty array
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return []; // Fallback to empty cart on error
    }
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const updateCart = (product, action, value) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (cartItem) => cartItem.id === product.id
      );

      if (existingProduct) {
        if (action === "increment") {
          if (existingProduct.quantity < product.stock) {
            // Increment quantity up to stock limit if below stock limit.
            return prevCart.map((cartItem) =>
              cartItem.id === product.id
                ? {
                    ...cartItem,
                    quantity: Math.min(
                      cartItem.quantity + value,
                      product.stock
                    ),
                  }
                : cartItem
            );
          }
        } else if (action === "decrement") {
          if (existingProduct.quantity > 1) {
            // Decrement quantity if greater than 1.
            return prevCart.map((cartItem) =>
              cartItem.id === product.id
                ? // If the value quantity drops below 1, 1 is returned.
                  {
                    ...cartItem,
                    quantity: Math.max(1, cartItem.quantity - value),
                  }
                : cartItem
            );
          } else {
            // If quantity is already at 1, item is removed.
            return prevCart.filter((cartItem) => cartItem.id !== product.id);
          }
        }
      } else if (action === "increment") {
        // The product doesn't exist in cart, added by the shop page via the increment action.
        if (product.stock <= 0) return prevCart;
        return [...prevCart, { ...product, quantity: value }];
      }

      return prevCart; // No changes if action is neither increment nor decrement
    });
  };

  const removeItem = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== productId)
    );
  };

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

export default CartProvider;