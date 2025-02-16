import { useState } from "react";
import PropTypes from "prop-types";
import Button from "./button/button";
import { MdFilterList } from "react-icons/md";

function SearchBar({
  onFilterCheckboxClick,
  handleCheckbox,
  categories,
  startIndex,
  itemsPerPage,
  productList,
  searchQuery,
  onSearch,
}) {
  // Whether the dropdown list of categories is visible.
  const [isDropdownHidden, setIsDropdownHidden] = useState(true);
  // Possible category values.
  const OPTIONS = ["furniture", "home-decoration", "kitchen-accessories"];

  return (
    <div
      id="searchBar"
      className="bg-gold-light-2 hover:bg-gold-light-3 min-h-24 w-full flex justify-evenly items-center flex-wrap gap-6 px-5 sm:px-10 lg:px-20 py-6 sm:py-8 lg:py-12"
    >
      <div className="filter-container relative" title="Category Filter">
        <Button
          variant="icon"
          extraStyles="bg-transparent outline outline-1 rounded outline-grey-400 focus:outline-2 p-1"
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
        className="bg-transparent px-2 py-1 outline outline-1 rounded outline-grey-400 focus:outline-2 placeholder:text-grey-500"
        type="search"
        name="search"
        id="search"
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
  itemsPerPage: PropTypes.number.isRequired,
  productList: PropTypes.array.isRequired,
  searchQuery: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
