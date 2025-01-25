import { useState, useEffect, useContext } from "react";
import { ProductsContext } from "../../components/contexts/ProductsContext";
import ProductCard from "../../components/productCard";
import PaginationControls from "../../components/paginationControls";
import SearchBar from "../../components/SearchBar";

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
  // The query from which the user can filter the products list.
  const [searchQuery, setSearchQuery] = useState("");
  // Which part of the product-list is visible.
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div>
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
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Shop;
