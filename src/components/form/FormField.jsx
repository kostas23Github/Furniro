import { useState } from "react";
import PropTypes from "prop-types";

function FormField({ name, labelName, type="text", register, watch, errors, trigger, pattern, validate }) {
  const [focusedField, setFocusedField] = useState(null);

  function expandTrigger(name) {
    if (type === "password" || type === "confirmPassword") {
      return () => {trigger("password"); trigger("confirmPassword")}
    } else {
      return () => trigger(name);
    }
  }

  return (
    <div className="relative flex flex-col">
      <label
        htmlFor={name}
        className={`transition-all duration-200 px-1 w-max relative left-1 bg-slate-50 dark:bg-slate-700 ${
          watch(name) || focusedField === name
            ? "top-0 bg-transparent text-grey-700 dark:text-grey-100"
            : "top-[9px] text-grey-300"
        } ${errors[name] && "text-rose-300 dark:text-rose-300"} ${errors[name] && focusedField === name && "text-rose-600 dark:text-rose-600"}`}
      >
        {labelName}
      </label>
      <input
        type={type}
        {...register(name, {
          required: name + " is required",
          pattern: {
            value: pattern.value,
            message: pattern.message,
          },
          validate: validate, // Custom logic(returns boolean) defined in LoginForm to handle is value is valid(matches the other password field).
          onChange: expandTrigger(name),
        })}
        className={`bg-transparent mb-2 outline outline-2 ${
          errors[name]
            ? "outline-rose-300 focus:outline-rose-600 text-rose-300 focus:text-rose-500"
            : "outline-grey-300 focus:outline-grey-700 dark:outline-grey-100 text-grey-300 focus:text-grey-700 dark:text-grey-100"
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
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  trigger: PropTypes.func.isRequired,
  pattern: PropTypes.shape({
    value: PropTypes.instanceOf(RegExp).isRequired,
    message: PropTypes.string.isRequired,
  }),
  validate: PropTypes.func,
};

export default FormField;
