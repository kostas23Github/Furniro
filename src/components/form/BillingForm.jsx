import { useForm } from "react-hook-form";
import { useState } from "react";
import { useLocation } from "react-router";
import CountrySelect from "./CountriesSelect";
import FormField from "./FormField";
import Button from "../button/Button";

function BillingForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm({ reValidateMode: "onChange" });
  const location = useLocation();
  const { subTotal, vat, discount, total } = location.state || {};

  const [placeOrder, setPlaceOrder] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const onSubmit = (data) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Extract specific fields (id, title, quantity, price) for each cart item
    const simplifiedCartItems = cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      totalPrice: (item.price * item.quantity).toFixed(2),
    }));

    // Create the order object, combining form data, simplified cart details, and total values
    const order = {
      customerInfo: data, // The billing form data
      cartItems: simplifiedCartItems, // Simplified cart items with specific fields
      totalAmount: total, // The total value from the form state (passed via location)
      vatIncluded: vat, // Whether VAT is included
      discountIncluded: discount, // Whether a discount is included
      orderDate: new Date().toISOString(), // Timestamp of when the order was placed
    };

    // Get existing orders from localStorage or initialize as an empty array
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Update orders value with the currently submitted new order.
    const updatedOrders = [...orders, order];
    // console.log(updatedOrders);

    // Save back to localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    console.log(order);

    // Set placeOrder to true to show the confirmation message
    setPlaceOrder(true);
  };

  if (placeOrder) {
    return (
      <div className="my-10 md:text-center">
        <p>✅ Thank you! The following order has been received.</p>
        <p>⚠️ Check your e-mail for order updates.</p>
          <pre className="my-5 mx-auto py-5 border-t-4 border-b-4 border-grey-500 w-max" style={{fontFamily: "inherit"}}>
            {JSON.stringify(
              JSON.parse(localStorage.getItem("orders") || "[]").slice(-1)[0] ||
                {},
              null,
              2
            )}
          </pre>
        {/* Maybe show order details, i.e. order variable above. */}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 sm:p-10 lg:p-20 flex flex-wrap justify-evenly relative"
    >
      <div className="w-full sm:max-w-sm">
        <p className="text-5xl">Billing details</p>
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
        {/* Country/Region Field  */}
        <CountrySelect name="countryRegion" labelName="Country/Region" />
        {/* Street/Address Field */}
        <FormField
          name="streetAddress"
          labelName="Street Address"
          register={register}
          watch={watch}
          errors={errors}
          trigger={trigger}
          pattern={{
            value: /^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ\s,.'-]+(\s\d+[a-zA-Z0-9\s]*)?$/i, // Allows street name with optional street number.
            message: "Invalid street name or number format",
          }}
        />
        {/* Town/City Field */}
        <FormField
          name="townCity"
          labelName="Town/City"
          register={register}
          watch={watch}
          errors={errors}
          trigger={trigger}
          pattern={{
            value: /^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ\s]+$/i, // Allows street name with optional street number.
            message: "Invalid town or city format.",
          }}
        />
        {/* ZIP code Field */}
        <FormField
          name="zip"
          labelName="ZIP code"
          register={register}
          watch={watch}
          errors={errors}
          trigger={trigger}
          pattern={{
            value:
              /^(?:\d{5}(-\d{4})?|[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d|\d{4}\s?[A-Za-z]{2}|\d{5})$/i, // Allows street name with optional street number.
            message: "Invalid ZIP code format.",
          }}
        />
        {/* Phone Field */}
        <FormField
          name="phone"
          labelName="Phone"
          register={register}
          watch={watch}
          errors={errors}
          trigger={trigger}
          pattern={{
            value:
              /^(?:\+?\d{1,4}[-\s]?)?(?:\(?\d{1,4}\)?[-\s]?)?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}$/,
            message: "Only numbers allowed.",
          }}
        />
        {/* E-mail Field */}
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
        {/* Additional Information Field */}
        <div className="relative flex flex-col">
          <label
            htmlFor="additionalInformation"
            className={`transition-all duration-200 px-1 relative left-1 w-max ${
              watch("additionalInformation") ||
              focusedField === "additionalInformation"
                ? "top-0 bg-transparent text-grey-700"
                : "top-[9px] bg-slate-50 text-grey-300"
            } ${errors.additionalInformation && "text-rose-300"} ${
              errors.additionalInformation &&
              focusedField === "additionalInformation" &&
              "text-rose-600"
            }`}
          >
            Additional Information
          </label>
          <textarea
            {...register("additionalInformation", {
              onChange: () => trigger("additionalInformation"),
            })}
            className={`bg-transparent mb-2 outline outline-2 ${
              errors.additionalInformation
                ? "outline-rose-300 focus:outline-rose-600 text-rose-300 focus:text-rose-500"
                : "outline-grey-300 focus:outline-grey-700 text-grey-300 focus:text-grey-700"
            } px-3 py-2`}
            onFocus={() => setFocusedField("additionalInformation")}
            onBlur={() => setFocusedField(null)}
          />
          {errors.additionalInformation && (
            <p className="text-red text-xs mt-1">
              {errors.additionalInformation.message}
            </p>
          )}
        </div>
      </div>
      <div className="xl:w-96 max-h-max  sm:px-16 sticky top-10">
        <p className="text-4xl text-center mb-5">Cart Total</p>
        <div className="flex flex-col">
          <div className="flex space-x-16 justify-between pt-5 pb-2">
            <span className="font-bold">Subtotal</span>
            <span className="text-grey-500">{subTotal} €</span>
          </div>
          <p>{vat ? "Vat included" : "No Vat is included"}</p>
          <p>
            {discount
              ? "Member&apos;s Discount included"
              : "No Members Discount included"}
          </p>
          <div className="flex space-x-16 justify-between py-6">
            <span className="text-2xl">Total</span>
            <span className="text-gold text-2xl">{total} €</span>
          </div>
        </div>
        <div className="justify-self-center">
          <Button
            variant="secondary-reversed"
            type="submit"
            tooltipOptions={{
              text: "Place order",
              position: "bottom",
              distance: "120",
            }}
            extraStyles="px-10 py-2 mt-3 lg:mt-6 mb-[2px] justify-self-center align-self-center"
          >
            Place Order
          </Button>
        </div>
      </div>
    </form>
  );
}

export default BillingForm;
