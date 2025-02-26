import { useState, useEffect, useContext, useMemo } from "react";
import { useLocation, Link } from "react-router";
import { ProductsContext } from "../../components/contexts/ProductsContext";
import ProductCard from "../../components/productCard";
import PaginationControls from "../../components/paginationControls";
import SearchBar from "../../components/SearchBar";
import Loading from "../../components/loadingAnimation/Loading";
import CharacteristicsList from "../../components/CharacteristicsList";
import Hero from "../../components/hero";
import shopHeroBg from "../../assets/images/hero-bg/Shop-hero-bg.png";

function Shop() {
  // Get product data from ProductsContext in ProductsProvider component.
  const { products } = useContext(ProductsContext);
  // Content is a bit laggyyy
  // Content loading, filtering, scrollToTop(redirecting from home page).
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    setIsLoading(true);
    setProductList(filteredProducts);
    setIsLoading(false);
  }, [filteredProducts]);

  // Updates categories state on redirection from Home page/categories section.
  useEffect(() => {
    // This if statement ensures that only when the user comes from the home page(categories section) i.e. the fromHomePageCategory has a value, the useEffect logic is executed.
    if (fromHomePageCategory) {
      setIsLoading(true);
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
    setCategories(
      (prevCategories) =>
        prevCategories.includes(value)
          ? prevCategories.filter((category) => category !== value) // Deselect option
          : [...prevCategories, value] // Select option
    );
  }

  // Is passed to to the SearchBar child component & updates the searchQuery state value with the typed search query. Then this searchQuery change triggers the useEffect hook which updates the productList.
  function handleSearchQuery(value) {
    setSearchQuery(value);
  }

  if (isLoading) return <Loading />;

  return (
    <div>
      <Hero ancestors={["Home"]} currentPage="Shop" hasImage={shopHeroBg} />
      <SearchBar
        onFilterCheckboxClick={handleFilterEdgeCases}
        handleCheckbox={handleCheckbox}
        categories={categories}
        startIndex={startIndex}
        itemsPerPage={itemsPerPage}
        productList={productList}
        searchQuery={searchQuery}
        onSearch={handleSearchQuery}
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center w-5/6 mt-10 mx-auto">
        {paginatedItems.map((product) => (
          <li key={product.id} className="w-full h-full">
            <Link to={`/shop/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          </li>
        ))}
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
