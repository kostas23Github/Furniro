import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../button/button";
import FormModal from "../modals/FormModal";

function SubscribeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({ reValidateMode: "onChange" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState(""); // Store modal message in state

  function onSubmit(data) {
    // data contains the currently submitted form values as an object.
    const subscribedUsers =
      JSON.parse(localStorage.getItem("subscribedUsers")) || [];

    // Find the user by email
    const existingUser = subscribedUsers.find(
      (user) => user.toLowerCase() === data.email.toLowerCase()
    );

    if (existingUser) {
      // call modal with msg sth like "already subscribed"
      setModalMsg("You have already subscribed!");
    } else {
      subscribedUsers.push(data.email);
      setModalMsg("Your email is submitted!");
      localStorage.setItem("subscribedUsers", JSON.stringify(subscribedUsers));
    }

    setIsModalOpen(true);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        placeholder="Enter Your Email Address"
        className="block bg-transparent placeholder:italic border-b-4 focus:border-grey-400 me-2 focus:outline-0"
      />
      {errors.email && (
        <p className="text-red text-xs mt-1">{errors.email.message}</p>
      )}
      <Button type="submit">SUBSCRIBE</Button>
      {isModalOpen && <FormModal setIsModalOpen={setIsModalOpen} message={modalMsg}/>}
    </form>
  );
}

export default SubscribeForm;
