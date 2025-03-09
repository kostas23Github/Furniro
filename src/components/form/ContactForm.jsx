import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "./button/Button";

function ContactForm() {
  const {
    register,
    handleSubmit,
    watch, // useStatelike, keeps track of form's element's values
    formState: { errors }, // The formState is a property in React Hook Form that holds the state of the form, including errors, touched fields, and other form-level states. When you're using formState: { errors }, you're destructuring the errors object from the form state, which holds the validation error messages for the form fields.
    trigger, // This method is used to manually validate one or multiple fields before form submission. This is useful when you want real-time validation.
  } = useForm({
    reValidateMode: "onChange", // This ensures validation is triggered as the input changes
  });

  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Tracks each form element's value.
  const nameValue = watch("name");
  const emailValue = watch("email");
  const subjectValue = watch("subject");
  const messageValue = watch("message"); 

  const onSubmit = (data) => {
    console.log(data); // Add data to local storage.
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`mx-auto grow max-w-[500px] md:max-w-[600px] ${submitted ? "h-max md:my-auto" : ""}`}
    >
      {submitted ? (
        // Comfirmation msg upon form submittion.
        <div className="my-10 md:text-center">
          ✅ Thank you! Your message has been received.
        </div>
      ) : (
        <>
          {/* Name Input Field */}
          <div className="relative flex flex-col">
            <label
              htmlFor={"name"}
              className={`transition-all duration-200 px-1 w-max relative left-1 bg-slate-50 ${
                nameValue || focusedField === "name"
                  ? "top-0 bg-transparent text-grey-700"
                  : "top-[10px] bg-slate-50 text-grey-300"
              } ${errors.name && "text-red"}`}
            >
              Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/i, // Only letters (case-insensitive)
                  message: "Only letters and spaces are allowed",
                },
                onChange: () => trigger("name"),
              })}
              className={`mb-2 outline outline-2 ${
                errors.name ? "outline-red text-red" : "outline-grey-300"
              } px-3 py-2 focus:outline-grey-700`}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.name && (
              <p className="red-600 text-xs my-1">{errors.name.message}</p>
            )}
          </div>
          {/* Email Input Field */}
          <div className="relative flex flex-col">
            <label
              htmlFor={"email"}
              className={`transition-all duration-200 px-1 w-max relative left-1 bg-slate-50 ${
                emailValue || focusedField === "email"
                  ? "top-0 bg-transparent text-grey-700"
                  : "top-[10px] bg-slate-50 text-grey-300"
              } ${errors.email && "text-red"}`}
            >
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "E-mail is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
                onChange: () => trigger("email"),
              })}
              className={`outline outline-2 ${
                errors.email ? "outline-red text-red" : "outline-grey-300"
              } px-3 py-2 focus:outline-grey-700`}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.email && (
              <p className="red-600 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          {/* Subject Input Field */}
          <div className="relative flex flex-col">
            <label
              htmlFor={"subject"}
              className={`transition-all duration-200 px-1 w-max relative left-1 bg-slate-50 ${
                subjectValue || focusedField === "subject"
                  ? "top-0 bg-transparent text-grey-700"
                  : "top-[10px] bg-slate-50 text-grey-300"
              } ${errors.subject && "text-red"}`}
            >
              Subject
            </label>
            <input
              type="text"
              {...register("subject", {
                required: "Message subject is required",
                onChange: () => trigger("name"),
              })}
              className={`mb-2 outline outline-2 ${
                errors.subject ? "outline-red text-red" : "outline-grey-300"
              } px-3 py-2 focus:outline-grey-700`}
              onFocus={() => setFocusedField("subject")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.subject && (
              <p className="red-600 text-xs mt-1">{errors.subject.message}</p>
            )}
          </div>
          {/* Message Input Field */}
          <div className="relative flex flex-col">
            <label
              htmlFor="message"
              className={`transition-all duration-200 px-1 relative left-1 w-max ${
                messageValue || focusedField === "message"
                  ? "top-0 bg-transparent text-grey-700"
                  : "top-[10px] bg-slate-50 text-grey-300"
              } ${errors.subject && "text-red"}`}
            >
              Message
            </label>
            <textarea
              {...register("message", {
                required: "Message is required",
                onChange: () => trigger("name"),
              })}
              className={`mb-2 outline outline-2 ${
                errors.message ? "outline-red text-red" : "outline-grey-300"
              } p-2 focus:outline-grey-700`}
              placeholder="Type your message..."
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
          <Button
            variant="primary"
            type="submit"
            extraStyles={`mt-4 px-5 py-1 md:px-10 md:py-2 ${
              Object.keys(errors).length > 0
                ? "disabled opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={Object.keys(errors).length > 0}
          >
            Submit
          </Button>
        </>
      )}
    </form>
  );
}

export default ContactForm;

{
  /* 
      {formFields.map((field) => {
        const value = watch(field); // Track input value
        return (
          <div key={field} className="relative flex flex-col">
            <label
              htmlFor={field}
              className={`text-gray-500 transition-all ${value ? "px-1" : ""}`}
            >
              {capitalizeFirstChar(field)}
            </label>
            {field !== "message" ? (
              <input
                type={field}
                {...register(field, {
                  required: `${capitalizeFirstChar(field)} is required`,
                })}
                className={`mb-2 outline ${
                  errors[name] ? "outline-red-500" : "outline-grey-400"
                } px-3 py-2 focus:outline-2`}
              />
            ) : (
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mb-8 outline outline-grey-400 p-2"
              />
            )}
            {errors[field] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field].message}
              </p>
            )}
          </div>
        );
      })} */
}
