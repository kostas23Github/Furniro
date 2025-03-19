import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import FormField from "./FormField";
import Button from "../button/button";
import PropTypes from "prop-types";

function LoginForm({ isXS }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger,
  } = useForm({ reValidateMode: "onChange" });

  const [loading, setLoading] = useState(true);
  const [formType, setFormType] = useState("login");
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  useEffect(() => {
    // Check if user is logged in (name exists in localStorage as "loggedUser" value).
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (user) {
      setIsLoggedIn(true);
      setLoggedInUserData(user);
    }
    setLoading(false);
  }, []);

  const handleLogin = (data) => {
    localStorage.setItem("loggedUser", JSON.stringify(data));
    setIsLoggedIn(true);
    setLoggedInUserData(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setIsLoggedIn(false);
    setLoggedInUserData(null);
  };

  const onSubmit = (data) => {
    const members = JSON.parse(localStorage.getItem("members")) || [];

    if (formType === "login") {
      // Validate logging user by name.
      const userLoggingIndex = members.findIndex(
        (member) => member.name === data.name
      );
      if (userLoggingIndex === -1) {
        setConfirmationMsg("User not found. Please sign up.");
        return;
      }
      if (members[userLoggingIndex].password !== data.password) {
        setConfirmationMsg("Wrong password!");
        return;
      }
      handleLogin(data);
      setConfirmationMsg("Logged In");
      return;
    }

    // Validate signing user by email.
    const userSigningInIndex = members.findIndex(
      (member) => member.email === data.email
    );

    if (userSigningInIndex !== -1) {
      setConfirmationMsg("You are already a member.");
      return;
    }

    members.push({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    localStorage.setItem("members", JSON.stringify(members));
    setConfirmationMsg("✅ You have successfully signed up.");
  };

  // While loading state is true render nth. It will be set to false once the useEffect hook has finished checking if the user is already loggedIn.
  if (loading) return;

  if (isLoggedIn) {
    return (
      <div className="p-5">
        <p>Welcome, {loggedInUserData.name}!</p>
        <Button variant="text" extraStyles="mt-4" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6">
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
      {formType === "sign" && (
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
      )}
      <FormField
        name="password"
        labelName="Password"
        type="password"
        register={register}
        watch={watch}
        errors={errors}
        trigger={trigger}
        pattern={{
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
          message:
            "Password must be at least 8 characters, contain at least one letter and one number",
        }}
        validate={(value) => {
          // Custom validation to check if passwords match
          if (formType === "login") {
            return true;
          }
          const confirmPassword = watch("confirmPassword"); // Watch password value
          if (value !== confirmPassword) {
            return "Passwords do not match."; // Custom error message
          }
          return true; // Return true if passwords match
        }}
      />
      {formType === "sign" && (
        <FormField
          name="confirmPassword"
          labelName="Confirm Password"
          type="password"
          register={register}
          watch={watch}
          errors={errors}
          trigger={trigger}
          pattern={{
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
            message: "Passwords do not match.",
          }}
          validate={(value) => {
            // Custom validation to check if passwords match
            const password = watch("password"); // Watch password value
            if (value !== password) {
              return "Passwords do not match."; // Custom error message
            }
            return true; // Return true if passwords match
          }}
        />
      )}
      <div
        className={`${
          !isXS ? "flex flex-col justify-center items-center" : ""
        }`}
      >
        <Button
          variant="primary"
          type="submit"
          disabled={!isValid}
          extraStyles={`w-max my-4 px-5 md:px-10 py-1 md:py-2 ${
            !isValid ? "disabled opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {formType === "login" ? "Login" : "Sign Up"}
        </Button>
        {confirmationMsg && <p>{confirmationMsg}</p>}
        {formType === "login" && (
          <Button
            variant="text"
            extraStyles="mt-4"
            handleClick={() => setFormType("sign")}
          >
            Create an account
          </Button>
        )}
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  isXS: PropTypes.bool.isRequired,
};

export default LoginForm;
