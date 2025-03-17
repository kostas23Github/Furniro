import { useState } from "react";
import PropTypes from "prop-types";

function FormField({ name, labelName, register, watch, errors, trigger, pattern }) {
  const [focusedField, setFocusedField] = useState(null);

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={name}
        className={`transition-all duration-200 px-1 w-max relative left-1 bg-slate-50 ${
          watch(name) || focusedField === name
            ? "top-0 bg-transparent text-grey-700"
            : "top-[9px] bg-slate-50 text-grey-300"
        } ${errors[name] && "text-rose-300"} ${errors[name] && focusedField === name && "text-rose-600"}`}
      >
        {labelName}
      </label>
      <input
        type="text"
        {...register(name, {
          required: name + " is required",
          pattern: {
            value: pattern.value,
            message: pattern.message,
          },
          onChange: () => trigger(name),
        })}
        className={`bg-transparent mb-2 outline outline-2 ${
          errors[name]
            ? "outline-rose-300 focus:outline-rose-600 text-rose-300 focus:text-rose-500"
            : "outline-grey-300 focus:outline-grey-700 text-grey-300 focus:text-grey-700"
        } px-3 py-2`}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
      />
      {errors[name] && (
        <p className={`${focusedField === name ? "text-rose-600" : "text-rose-300"} text-xs my-1`}>{errors[name].message}</p>
      )}
    </div>
  );
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  trigger: PropTypes.func.isRequired,
  pattern: PropTypes.shape({
    value: PropTypes.instanceOf(RegExp).isRequired,
    message: PropTypes.string.isRequired,
  })
};

export default FormField;
