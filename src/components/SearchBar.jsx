import { useState } from "react";
import PropTypes from "prop-types";
import Button from "./button/Button";
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
        className=" bg-transparent border rounded border-gray px-2 py-1 focus:outline-none"
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
