import { useContext } from "react";
import { Link } from "react-router";
import { ProductsContext } from "../../components/contexts/ProductsContext";
import heroBg from "../../assets/images/hero-bg/home-hero-bg-scandinavian.png";
import Button from "../../components/button/Button.jsx";

function Home() {
  const { products, loading } = useContext(ProductsContext);

  const CATEGORIES = [
    { name: "furniture", selectedProduct: products[2] },
    { name: "home-decoration", selectedProduct: products[5] },
    { name: "kitchen-accessories", selectedProduct: products[11] },
  ];

  return loading ? (
    <div>Loading....</div>
  ) : (
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
          <Button
            variant="primary"
            extraStyles="px-16 py-6 mt-16"
            tooltipOptions={{
              text: "Visit our shop page",
              position: "bottom",
              distance: "100",
            }}
          >
            BUY NOW
          </Button>
        </div>
      </section>
      <section id="browse-collection" className="px-12 py-8">
        <header className="mb-6 flex-col justify-between mx-auto text-center">
          <p className="mb-1 text-logo">Browse The Range</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </header>
        <div id="categories" className="flex gap-3 mx-20">
          {CATEGORIES.map((category) => (
            <Link
              key={category.name}
              to="/shop"
              state={{ selectedCategory: category.name }}
              className="mb-10"
            >
              <img
                className="aspect-[0.80] bg-gold/60 rounded-2xl"
                src={category.selectedProduct.images[0]}
                alt={category.selectedProduct.title}
              />
              <p className="my-4 text-2xl text-center">
                {category.selectedProduct.category.toUpperCase()}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section id="share-your-setup">
        <header className="flex flex-col gap-1 text-center">
          <p className="text-2xl">Share your setup with</p>
          <p className="text-logo">#FurniroFurniture</p>
        </header>
        <div className="relative overflow-hidden">
          <div className="flex justify-center items-center relative w-[110%] right-[5%] my-6 mx-auto">
            <div className="flex flex-row-reverse flex-wrap items-baseline w-2/5">
              <img
                className="m-1 w-[70%] aspect-[1.45] bg-gold/60 rounded-2xl"
                src={products[10].images[0]}
                alt={products[10].title}
              />
              <img
                className="m-1 w-[25%] aspect-[0.72] bg-gold/70 rounded-2xl"
                src={products[11].images[0]}
                alt={products[11].title}
              />
              <img
                className="m-1 w-[50%] aspect-[1.18] bg-yellow-600/80 rounded-2xl self-start"
                src={products[12].images[0]}
                alt={products[12].title}
              />
              <img
                className="m-1 w-[40%] aspect-[1.42] bg-gold/90 rounded-2xl self-start"
                src={products[13].images[0]}
                alt={products[13].title}
              />
            </div>
            <img
              className="m-1 w-[18%] lg:w-[20%] aspect-[3/4] bg-gold/80 rounded-2xl"
              src={products[14].images[0]}
              alt={products[14].title}
            />
            <div className="flex flex-wrap items-baseline w-2/5">
              <img
                className="m-1 w-[42%] aspect-[0.83] bg-yellow-700/90 rounded-2xl"
                src={products[15].images[0]}
                alt={products[15].title}
              />
              <img
                className="m-1 w-[53%] aspect-[0.98] bg-gold/60 rounded-2xl"
                src={products[16].images[0]}
                alt={products[16].title}
              />
              <img
                className="m-1 self-start w-[25%] aspect-[0.74] bg-gold/50 rounded-2xl"
                src={products[17].images[0]}
                alt={products[17].title}
              />
              <img
                className="m-1 self-start w-[40%] aspect-[1.32] bg-gold/50 rounded-2xl"
                src={products[18].images[0]}
                alt={products[18].title}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
