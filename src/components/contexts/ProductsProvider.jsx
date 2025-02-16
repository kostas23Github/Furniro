// ***ENTRY POINT OF DUMMY PRODUCT DATA***

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Get the separatly created context, next I will add its values(products, loading state, error state).
import { ProductsContext } from "./ProductsContext"; 

const fetchCategoryProducts = async (category) => {
  const response = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const data = await response.json();
  return data.products;
};

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categories = [
          "furniture",
          "home-decoration",
          "kitchen-accessories",
        ];
        const categoryProducts = await Promise.all(
          categories.map((category) => fetchCategoryProducts(category))
        );

        // Combine each category array of products returned from the above promises into one flat array of products.
        setProducts(categoryProducts.flat());

        // Adjust for irregular discount data. Some are 0.29 others 29. Make all of them match the format of 29!
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.discountPercentage < 1
              ? {
                  ...product,
                  discountPercentage: Math.round(
                    product.discountPercentage * 100
                  ),
                }
              : { ...product }
          )
        );

        setLoading(false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductsProvider;
