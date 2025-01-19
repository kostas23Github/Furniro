import { useContext } from 'react';
import { ProductsContext } from "../../components/contexts/ProductsContext";

function About() {
  const { products, loading, error } = useContext(ProductsContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <h2>{product.title}</h2>
        </li>
      ))}
    </ul>
  )
}

export default About;