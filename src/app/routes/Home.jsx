import { useContext } from "react";
import { Link } from "react-router";
import ProductsContext from "../../components/contexts/ProductsContext";
import heroBg from "../../assets/images/hero-bg/home-hero-bg-scandinavian.png";
import Button from "../../components/button/Button.jsx";
import Carousel from "../../components/Carousel.jsx";
import Loading from "../../components/loadingAnimation/Loading.jsx";
import { useScreenSize } from "../../components/contexts/ScreenSizeProvider.jsx";

function Home() {
  const { products, loading } = useContext(ProductsContext);
  const { isXXS, isSM, isLG } = useScreenSize();

  const CATEGORIES = [
    { name: "furniture", selectedProduct: products[2] },
    { name: "home-decoration", selectedProduct: products[5] },
    { name: "kitchen-accessories", selectedProduct: products[11] },
  ];

  // A compact line of code that: Array(3) -> [ , , ], .fill(null) -> (null, null, null) is mandatory since flatMap would otherwise skip empty slots. .flatMap() = flat+Map.
  const carouselitems = Array(6)
    .fill(null)
    .flatMap(() =>
      products.filter((product) => product.category === "home-decoration")
    );

  if (loading) return <Loading />;

  return (
    <div>
      <section
        id="hero-section"
        className="h-max md:h-[716px] md:px-12 flex items-center md:relative"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover" }}
      >
        <div className="md:max-w-[743px] md:w-[60%] lg:w-[40%] md:absolute md:left-[30%] lg:left-[50%] bg-gold-light-2/70 dark:bg-slate-700/50 md:bg-gold-light-3 md:dark:bg-slate-700 px-10 py-12">
          <div>
            <p className="font-semibold">New Arrival</p>
            <p className="dark:text-slate-700 text-gold dark:md:text-gold text-5xl md:text-7xl">
              Discover Our New Collection
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
          </div>
          <Link to={"/shop"}>
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
          </Link>
        </div>
      </section>
      <section
        id="browse-collection"
        className="px-12 py-8 max-w-[1200px] mx-auto"
      >
        <header className="mb-6 flex-col justify-between mx-auto text-center">
          <p className="mb-1 text-logo">Browse The Range</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </header>
        {isXXS ? (
          <div>
            {CATEGORIES.map((category, index) => (
              <Link
                to="/shop"
                state={{ selectedCategory: category.name }}
                className={`flex justify-between items-center mb-10 w-full ${
                  index === 1 ? "flex-row-reverse" : ""
                }`}
                key={category.name}
              >
                <img
                  className="shrink-0 w-[120px] h-[150px] bg-gold/60 rounded-2xl"
                  src={category.selectedProduct.images[0]}
                  alt={category.selectedProduct.title}
                />
                <p className="w-[140px] text-1xl text-center">
                  {category.selectedProduct.category.toUpperCase()}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-row gap-3 md:gap-5 md:mx-20">
            {CATEGORIES.map((category) => (
              <Link
                key={category.name}
                to="/shop"
                // Using react-router's state functionality to pass to the target page a given state to predetermine the content displayed/functionality.
                state={{ selectedCategory: category.name }}
                className="min-w-1/3 lg:min-w-[250px]"
              >
                <img
                  className="shrink-0 aspect-[0.8] bg-gold/60 rounded-2xl"
                  src={category.selectedProduct.images[0]}
                  alt={category.selectedProduct.title}
                />
                <p className="my-4 text-2xl text-center">
                  {category.selectedProduct.category.toUpperCase()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
      <section
        id="what-to-expect"
        className="bg-gold-light dark:bg-slate-700 px-12 py-8 md:flex gap-5 md:items-center "
      >
        <div className="what-to-expect-title text-center md:text-left mx-auto md:w-1/3 max-w-xs shrink-0">
          <p className="text-5xl mb-2">
            <span className="">100s</span> of items {!isLG && <br />} to choose
            from...
          </p>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing
            {!isLG || (isSM && <br />)} elit. Recusandae, repudiandae!
          </p>
          <Link to={"/shop"}>
            <Button
              variant="primary"
              extraStyles="px-6 py-2 mt-6"
              tooltipOptions={{
                text: "Browse Products",
                position: "right",
                distance: "100",
              }}
            >
              Explore More
            </Button>
          </Link>
        </div>
        <Carousel items={carouselitems} />
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
                className="m-[1px] sm:m-[3px] md:m-1 xl:m-[6px] w-[70%] aspect-[1.45] bg-gold/60 rounded-lg md:rounded-2xl hover:shadow-[0_0_15px_#d4a941] hover:scale-110 hover:bg-gold duration-100"
                src={products[10].images[0]}
                alt={products[10].title}
              />
              <img
                className="m-[1px] sm:m-[3px] md:m-1 xl:m-[6px] w-[25%] aspect-[0.72] bg-gold/70 rounded-lg md:rounded-2xl hover:shadow-[0_0_15px_#d4a941] hover:scale-110 hover:bg-gold duration-100"
                src={products[11].images[0]}
                alt={products[11].title}
              />
              <img
                className="m-[1px] sm:m-[3px] md:m-1 xl:m-[6px] w-[50%] aspect-[1.18] bg-yellow-600/80 rounded-lg md:rounded-2xl self-start hover:shadow-[0_0_15px_#d4a941] hover:scale-110 hover:bg-gold duration-100"
                src={products[12].images[0]}
                alt={products[12].title}
              />
              <img
                className="m-[1px] sm:m-[3px] md:m-1 xl:m-[6px] w-[40%] aspect-[1.42] bg-gold/90 rounded-lg md:rounded-2xl self-start hover:shadow-[0_0_15px_#d4a941] hover:scale-110 hover:bg-gold duration-100"
                src={products[13].images[0]}
                alt={products[13].title}
              />
            </div>
            <img
              className="m-1 w-[18%] lg:w-[20%] aspect-[3/4] bg-gold/80 rounded-2xl shadow-[0_0_15px_#d4a941] hover:scale-125 hover:bg-gold duration-100"
              src={products[14].images[0]}
              alt={products[14].title}
            />
            <div className="flex flex-wrap items-baseline w-2/5">
              <img
                className="m-[1px] sm:m-[3px] md:m-1 xl:m-[6px] w-[42%] aspect-[0.83] bg-yellow-700/90 rounded-lg md:rounded-2xl hover:scale-110 hover:bg-gold duration-100"
                src={products[15].images[0]}
                alt={products[15].title}
              />
              <img
                className="m-[1px] sm:m-[3px] md:m-1 xl:m-[6px] w-[53%] aspect-[0.98] bg-gold/60 rounded-lg md:rounded-2xl hover:scale-110 hover:bg-gold duration-100"
                src={products[16].images[0]}
                alt={products[16].title}
              />
              <img
                className="m-[1px] sm:m-[3px] md:m-1 xl:m-[6px]  self-start w-[25%] aspect-[0.74] bg-gold/50 rounded-lg md:rounded-2xl hover:scale-110 hover:bg-gold duration-100"
                src={products[17].images[0]}
                alt={products[17].title}
              />
              <img
                className="m-[1px] sm:m-[3px] md:m-1 xl:m-[6px] self-start w-[40%] aspect-[1.32] bg-gold/50 rounded-lg md:rounded-2xl hover:scale-110 hover:bg-gold duration-100"
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
