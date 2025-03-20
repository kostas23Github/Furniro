import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import FavoritesContext from "./FavoritesContext";
import AuthContext from "./AuthContext";

function FavoritesProvider({ children }) {
  const { user } = useContext(AuthContext);
  // Favorites state should update localStorage's user's favorites array of products. This should happen in the specific user's members item.
  const [favorites, setFavorites] = useState([]);

  // Load user's favorites when they log in
  useEffect(() => {
    if (!user) {
      setFavorites([]); // Clear favorites on logout
      return;
    }

    const members = JSON.parse(localStorage.getItem("members")) || [];
    const storedUser = members.find((member) => member.name === user.name);

    if (storedUser) {
      setFavorites(storedUser.favorites || []); // ✅ Update favorites when user logs in
    }
  }, [user]); // <-- Runs every time user logs in

  // Update localStorage whenever favorites change
  useEffect(() => {
    if (!user) return;

    const members = JSON.parse(localStorage.getItem("members")) || [];
    const updatedMembers = members.map((member) =>
      member.name === user.name ? { ...member, favorites } : member
    );

    localStorage.setItem("members", JSON.stringify(updatedMembers));
  }, [favorites, user]);

  function addToFavorites(product) {
    // User isn't logged in.
    if (!user) {
      alert(
        "You must first login to be able to add products to your favorites list!"
      );
      return;
    }
    setFavorites((prevFavorites) => {
      // Find if product exists.
      const existingProduct = prevFavorites.some(
        (favoritesItem) => favoritesItem.id === product.id
      );

      // If product already present, exit.
      if (existingProduct) return prevFavorites;

      // Else add it to the list.
      return [...prevFavorites, product];
    });
  }

  // Filter out the product whose id matches one from the favorites list.
  function removeFromFavorites(productID) {
    // User isn't logged in.
    if (!user) {
      alert(
        "You must first login to be able to add products to your favorites list!"
      );
      return;
    }
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favoritesItem) => favoritesItem.id !== productID)
    );
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FavoritesProvider;
