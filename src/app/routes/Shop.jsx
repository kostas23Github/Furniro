import { useState, useEffect, useContext } from "react";
import { MdFilterList } from "react-icons/md";
import { ProductsContext } from "../../components/contexts/ProductsContext";
import Button from "../../components/button/Button";
import ProductCard from "../../components/productCard";
import PaginationControls from "../../components/paginationControls";

function Shop() {
  // Get product data from ProductsContext in ProductsProvider component.
  const { products } = useContext(ProductsContext);
  // The current list of products being displayed.
  const [productList, setProductList] = useState(products);
  // Which products' categories are checked.
  const [categories, setCategories] = useState([
    "furniture",
    "home-decoration",
    "kitchen-accessories",
  ]);
  // Whether the dropdown list of categories is visible.
  const [isDropdownHidden, setIsDropdownHidden] = useState(true);
  // The query from which the user can filter the products list.
  const [searchQuery, setSearchQuery] = useState("");
  // Which part of the product-list is visible.
  const [currentPage, setCurrentPage] = useState(1);

  // Possible category values.
  const OPTIONS = ["furniture", "home-decoration", "kitchen-accessories"];
  // Set pagination values.
  const itemsPerPage = 12;
  const totalPages = Math.ceil(productList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = productList.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Sync productList whenever products, categories, or searchQuery changes.
  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      categories.includes(product.category)
    );

    const finalProducts = searchQuery
      ? filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : filteredProducts;

    setProductList(finalProducts);
  }, [products, categories, searchQuery]);

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

  return (
    <>
      <div
        id="searchBar"
        className="bg-gold-light-3 h-24 w-full flex justify-evenly items-center"
      >
        <div className="filter-container relative" title="Category Filter">
          <Button
            variant="icon"
            extraStyles="border rounded border-gray p-1"
            tooltipOptions={{
              text: "Filter",
              position: "bottom",
              distance: "150",
            }}
            onClick={() => setIsDropdownHidden(!isDropdownHidden)}
          >
            <MdFilterList />
          </Button>
          {!isDropdownHidden && (
            <div className="absolute top-[120%] -left-1/2 bg-white border rounded shadow-md px-2 w-max z-10">
              <div className="flex justify-between">
                <Button
                  variant="text"
                  onClick={() => {
                    setCategories(OPTIONS);
                    setCurrentPage(1);
                  }}
                >
                  Select All
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    setCategories([]);
                    setCurrentPage(1);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
              {OPTIONS.map((option) => (
                <label
                  key={option}
                  className="flex justify-between items-center gap-2 py-1"
                >
                  <span>{option}</span>
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    value={option}
                    checked={categories.includes(option)}
                    onChange={handleCheckbox}
                  />
                </label>
              ))}
            </div>
          )}
        </div>
        <span>
          Showing {startIndex} of{" "}
          {startIndex + itemsPerPage > productList.length
            ? productList.length
            : startIndex + itemsPerPage}{" "}
          products
        </span>
        <input
          className=" bg-transparent border rounded border-gray px-2 py-1 focus:outline-none"
          type="search"
          name="search"
          id="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center w-5/6 mt-10 mx-auto">
        {paginatedItems.map((product) => (
          <li key={product.id} className="w-full h-full">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default Shop;
