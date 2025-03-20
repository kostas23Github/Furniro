import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Button from "./button/button";
import { MdFilterList } from "react-icons/md";
import useOutsideClick from "./hooks/useOutsideClick";

function SearchBar({
  onFilterCheckboxClick,
  handleCheckbox,
  categories,
  startIndex,
  displayedItems,
  productList,
  searchQuery,
  onSearch,
}) {
  // Whether the dropdown list of categories is visible.
  const [isDropdownHidden, setIsDropdownHidden] = useState(true);

  const menuRef = useRef(null);

  function toggleDropdown() {
    setIsDropdownHidden((prev) => !prev);
  }

  function closeDropdown() {
    setIsDropdownHidden(true);
  }

  // Hide the filter menu when clicking outside of it.
  useOutsideClick(menuRef, closeDropdown);

  // Possible category values.
  const OPTIONS = ["furniture", "home-decoration", "kitchen-accessories"];

  return (
    <div className="bg-gold-dark-3 hover:bg-gold-dark-2 min-h-24 w-full flex justify-evenly items-center flex-wrap gap-6 px-5 sm:px-10 lg:px-20 py-6 sm:py-8 lg:py-12">
      <div
        ref={menuRef}
        className="filter-container relative"
        title="Category Filter"
      >
        <Button
          variant="icon"
          extraStyles="bg-transparent outline outline-1 rounded outline-grey-400 dark:outline-grey-100 focus:outline-2 p-1"
          tooltipOptions={{
            text: "Filter",
            position: "bottom",
            distance: "150",
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        >
          <MdFilterList />
        </Button>
        {!isDropdownHidden && (
          <div className="absolute top-[120%] -left-1/2 bg-slate-50 dark:bg-slate-800 outline outline-2 outline-grey-400 dark:outline-gold-dark-3 rounded shadow-md px-2 w-max z-10">
            <div className="flex justify-between">
              <Button
                variant="text"
                onClick={() => onFilterCheckboxClick(OPTIONS)}
              >
                Select All
              </Button>
              <Button variant="text" onClick={() => onFilterCheckboxClick([])}>
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
                  className="dark:accent-gold-dark-3 cursor-pointer"
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
      {productList.length < 1 ? (
        <span>Showing 0 products</span>
      ) : (
        <span>
          Showing [{startIndex + 1} - {startIndex + displayedItems}] of{" "}
          {productList.length} products
        </span>
      )}
      <input
        className="bg-transparent px-2 py-1 outline outline-1 rounded outline-grey-400 dark:outline-grey-100 focus:outline-4 placeholder:text-grey-500 dark:placeholder:text-grey-100"
        type="search"
        name="search"
        id="searchProducts"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  onFilterCheckboxClick: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  startIndex: PropTypes.number.isRequired,
  displayedItems: PropTypes.number.isRequired,
  productList: PropTypes.array.isRequired,
  searchQuery: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
