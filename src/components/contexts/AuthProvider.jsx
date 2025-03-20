import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";

// AuthProvider Component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // 🔹 Start as null

  // 🔹 Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // 🔹 Effect to sync with localStorage changes (for cross-tab updates)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "loggedUser") {
        setUser(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Login Function
  const login = (userData) => {
    localStorage.setItem("loggedUser", JSON.stringify(userData));
    setUser(userData); // Update state
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;