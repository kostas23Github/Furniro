import { useContext } from "react";
import { ProductsContext } from "../../components/contexts/ProductsContext";
import heroBg from "../../assets/images/hero-bg/home-hero-bg-scandinavian.png";
import Button from "../../components/button/Button.jsx";

function Home() {
  const { products, loading, error } = useContext(ProductsContext);

  return (
    <div>
      <section
        id="hero-section"
        className="h-[716px] px-12 flex flex-row-reverse items-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="w-1/2 h-max bg-gold-light-2 px-10 py-12">
          <div>
            <p className="font-semibold">New Arrival</p>
            <h1 className="text-gold">Discover Our New Collection</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
          </div>
          <Button variant="primary" extraStyles="px-16 py-6 mt-16" titleText="Go to our shop page">
            BUY NOW
          </Button>
          <Button variant="primary" extraStyles="px-16 py-6 mt-16" titleText="Go to our shop page">
            BUY NOW
          </Button>
        </div>
      </section>
      <section id="browse-collection" className="px-12 py-8">
        <header className="flex-col justify-between mx-auto w-max text-center">
          <p className="text-logo">Browse The Range</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </header>
        <div>{/* The 'Category' cards will go here. */}</div>
      </section>
    </div>
  );
}

export default Home;
