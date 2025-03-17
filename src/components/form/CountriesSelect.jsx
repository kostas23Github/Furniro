import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

function CountrySelect({ name, labelName }) {
  const {
    watch,
    formState: { errors },
  } = useForm({ reValidateMode: "onChange" });

  const [focusedField, setFocusedField] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.map((country) => country.name.common));
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={name}
        className={`transition-all duration-200 px-1 w-max relative left-1 bg-slate-50 ${
          watch(name) || focusedField === name
            ? "top-0 bg-transparent text-grey-700"
            : "top-[10px] bg-slate-50 text-grey-300"
        } ${errors[name] && "text-rose-500"}`}
      >
        {labelName}
      </label>
      <select
        id={name}
        name={name}
        className={`bg-transparent mb-2 outline outline-2 ${
          errors[name]
            ? "outline-rose-500 focus:rose-500 text-rose-500"
            : "outline-grey-300"
        } px-3 py-2 focus:outline-grey-700`}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
      >
        {countries.length > 0 ? (
          countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))
        ) : (
          <option>Loading...</option>
        )}
      </select>
      {errors[name] && (
        <p className="text-rose-500 text-xs my-1">{errors[name].message}</p>
      )}
    </div>
  );
}

CountrySelect.propTypes = {
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
};

export default CountrySelect;
