import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../button/Button";
import FormField from "./FormField";

function ContactForm() {
  const {
    register,
    handleSubmit,
    watch, // useStatelike, keeps track of form's element's values
    formState: { errors, isValid }, // The formState is a property in React Hook Form that holds the state of the form, including errors, touched fields, and other form-level states. When you're using formState: { errors }, you're destructuring the errors object from the form state, which holds the validation error messages for the form fields.
    trigger, // This method is used to manually validate one or multiple fields before form submission. This is useful when you want real-time validation.
  } = useForm({
    reValidateMode: "onChange", // This ensures validation is triggered as the input changes
  });

  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    // data contains the currently submitted form values as an object.
    const usersForContact =
      JSON.parse(localStorage.getItem("to-be-contacted")) || [];

    // Find user's index by name & email
    const existingUserIndex = usersForContact.findIndex(
      (user) =>
        user.name.toLowerCase() === data.name.toLowerCase() &&
        user.email.toLowerCase() === data.email.toLowerCase()
    );

    if (existingUserIndex !== -1) {
      // Add new subject & message as an object
      usersForContact[existingUserIndex].messages.push({
        subject: data.subject,
        message: data.message,
      });
    } else {
      // If user doesn't exist, add them
      usersForContact.push({
        name: data.name,
        email: data.email,
        messages: [{ subject: data.subject, message: data.message }],
      });
    }

    // Save back to localStorage
    localStorage.setItem("to-be-contacted", JSON.stringify(usersForContact));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      // Comfirmation msg upon form submition.
      <div className="my-10 md:text-center">
        ✅ Thank you! Your message has been received.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`mx-auto grow max-w-[500px] md:max-w-[600px] ${
        submitted ? "h-max md:my-auto" : ""
      }`}
    >
      {/* Name Input Field */}
      <FormField
        name="name"
        labelName="Name"
        register={register}
        watch={watch}
        errors={errors}
        trigger={trigger}
        pattern={{
          value: /^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ\s]+$/i,
          message: "Only letters and spaces are allowed.",
        }}
      />
      {/* Email Input Field */}
      <FormField
        name="email"
        labelName="Email Address"
        register={register}
        watch={watch}
        errors={errors}
        trigger={trigger}
        pattern={{
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "someone@email.com",
        }}
      />
      {/* Subject Input Field */}
      <FormField
        name="subject"
        labelName="Subject"
        register={register}
        watch={watch}
        errors={errors}
        trigger={trigger}
        pattern={{
          value: /^[A-Za-z0-9Α-Ωα-ωΆ-Ώά-ώ\s]+$/i,
          message: "Only letters, numbers, and spaces are allowed",
        }}
      />
      {/* Message Input Field */}
      <div className={`${errors.message ? "text-rose-300 focus:text-rose-600" : "text-grey-700 dark:text-grey-100"} relative flex flex-col`}>
        <label
          htmlFor="message"
          className={`transition-all duration-200 px-1 relative left-1 w-max bg-slate-50 dark:bg-slate-700 ${
            watch("message") || focusedField === "message"
              ? "top-0 bg-transparent text-grey-700 dark:text-grey-100"
              : "top-[9px] text-grey-300"
          }`}
        >
          Message
        </label>
        <textarea
          {...register("message", {
            required: "Message is required",
            onChange: () => trigger("message"),
          })}
          className={`bg-transparent mb-2 outline outline-2 ${
            errors.message ? "outline-rose-300 focus:outline-rose-300 dark:focus:outline-rose-300" : "outline-grey-100"
          } p-2 focus:outline-grey-700 dark:focus:outline-grey-100`}
          placeholder="Type your message..."
          onFocus={() => setFocusedField("message")}
          onBlur={() => setFocusedField(null)}
        />
        {errors.message && (
          <p className="text-rose-300 text-xs mt-1">{errors.message.message}</p>
        )}
      </div>
      <Button
        variant="primary"
        type="submit"
        extraStyles={`mt-4 px-5 py-1 md:px-10 md:py-2 ${
          !isValid ? "disabled opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!isValid}
      >
        Submit
      </Button>
    </form>
  );
}

export default ContactForm;
