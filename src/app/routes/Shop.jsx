import { useState, useEffect, useContext, useMemo } from "react";
import { useLocation, Link } from "react-router";
import { ProductsContext } from "../../components/contexts/ProductsContext";
import ProductCard from "../../components/ProductCard";
import PaginationControls from "../../components/paginationControls";
import SearchBar from "../../components/SearchBar";
import Loading from "../../components/loadingAnimation/Loading";
import CharacteristicsList from "../../components/CharacteristicsList";
import Hero from "../../components/Hero";
import shopHeroBg from "../../assets/images/hero-bg/Shop-hero-bg.png";

function Shop() {
  // Get product data from ProductsContext in ProductsProvider component.
  const { products, loading } = useContext(ProductsContext);
  // The current list of products being displayed.
  const [productList, setProductList] = useState(products);

  // Which products' categories are checked.
  const [categories, setCategories] = useState([
    "furniture",
    "home-decoration",
    "kitchen-accessories",
  ]);
  // The query from which the user can filter the products list.
  const [searchQuery, setSearchQuery] = useState("");
  // Which part of the product-list is visible.
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();

  // To set the state based on the fact that the user was redirected to this page upon clicking on a category at Home.jsx
  const fromHomePageCategory = location.state?.selectedCategory;

  // I had previously included this logic inside the useEffect hook(apart from the useMemo hook). Now with useMemo it is calculated only when the dependancy array changes and not when the component renders.
  const filteredProducts = useMemo(() => {
    const filteredByCategory = products.filter((product) =>
      categories.includes(product.category)
    );

    return searchQuery
      ? filteredByCategory.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : filteredByCategory;
  }, [products, categories, searchQuery]);

  // Set pagination values.
  const itemsPerPage = 12;
  const totalPages = Math.ceil(productList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const displayedItems = Math.min(12, paginatedItems.length);

  useEffect(() => {
    setProductList(filteredProducts);
  }, [filteredProducts]);

  // Updates categories state on redirection from Home page/categories section.
  useEffect(() => {
    // This if statement ensures that only when the user comes from the home page(categories section) i.e. the fromHomePageCategory has a value, the useEffect logic is executed.
    if (fromHomePageCategory) {
      setCategories([fromHomePageCategory]);
      setCurrentPage(1);
    }
  }, [fromHomePageCategory]);

  // Handles the checkbox options inside filter menu.
  function handleFilterEdgeCases(categories) {
    setCategories(categories);
    setCurrentPage(1);
  }

  // Update categories list state.
  function handleCheckbox(e) {
    const value = e.target.value;
    setCurrentPage(1); // Reset displayed page to avoid SearchBar showing wrong "currently displaying products".
    setCategories(
      (prevCategories) =>
        prevCategories.includes(value)
          ? prevCategories.filter((category) => category !== value) // Deselect option
          : [...prevCategories, value] // Select option
    );
  }

  useEffect(() => {
    // When clicking the search icon in navBar the user is redirected to the Shop.jsx page and scrolled to the searchBar & it becomes focused.
    // This is accomplished by passing as a hash(#) via the url, the id of the searchbar input.
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.focus();
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  // Is passed to to the SearchBar child component & updates the searchQuery state value with the typed search query. Then this searchQuery change triggers the useEffect hook which updates the productList.
  function handleSearchQuery(value) {
    setSearchQuery(value);
  }

  if (loading) return <Loading />;

  return (
    <div>
      <Hero ancestors={["Home"]} currentPage="Shop" hasImage={shopHeroBg} />
      <SearchBar
        onFilterCheckboxClick={handleFilterEdgeCases}
        handleCheckbox={handleCheckbox}
        categories={categories}
        startIndex={startIndex}
        displayedItems={displayedItems}
        productList={productList}
        searchQuery={searchQuery}
        onSearch={handleSearchQuery}
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center w-5/6 mt-10 max-w-[1200px] mx-auto">
        {paginatedItems.map((product) => {
          return (
            <li key={product.id} className="w-full h-full">
              <Link to={`/shop/${product.id}`}>
                <ProductCard key={product.id} product={product} />
              </Link>
            </li>
          );
        })}
      </ul>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <CharacteristicsList />
    </div>
  );
}

export default Shop;
