import Hero from "../../components/Hero";
import shopHeroBg from "../../assets/images/hero-bg/Shop-hero-bg.png";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { IoLogoPaypal } from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
import { BiTimeFive } from "react-icons/bi";

function PaymentOptions() {
  return (
    <div>
      <Hero
        ancestors={["Home"]}
        currentPage="Payment Options"
        hasImage={shopHeroBg}
      />
      <div className="p-5 sm:p-10 lg:p-20 max-w-[1200px] mx-auto">
        <div className="mb-6">
          <p className="text-3xl text-center mb-3">
            Payment Options at Furniro
          </p>
          <p className="text-xl">
            At Furniro, we make shopping for kitchen accessories, home
            decoration and furniture seamless with secure and flexible payment
            options. At Furniro, we make shopping for kitchen accessories, home
            decoration and furniture seamless with secure and flexible payment
            options. At Furniro, we make shopping for kitchen accessories, home
            decoration and furniture seamless with secure and flexible payment
            options.
          </p>
        </div>
        <ul className="space-y-2 mb-6">
          <p className="text-2xl">Accepted Payment Methods</p>
          <li className="flex items-center gap-3 sm:ms-3">
            <BsCreditCard2FrontFill className="text-3xl grow" />
            <span className="w-[95%]">
              <b>Credit & Debit Cards</b> – We accept Visa, Mastercard, and
              American Express.
            </span>
          </li>
          <li className="flex items-center gap-3 sm:ms-3">
            <IoLogoPaypal className="text-3xl grow" />
            <span className="w-[95%]">
              <b>PayPal</b> – A quick and secure way to complete your purchase.
            </span>
          </li>
          <li className="flex items-center gap-3 sm:ms-3">
            <BiTransfer className="text-3xl grow" />
            <span className="w-[95%]">
              <b>Bank Transfers</b> – Available for select orders; processing
              times may vary.
            </span>
          </li>
          <li className="flex items-center gap-3 sm:ms-3">
            <BiTimeFive className="text-3xl grow" />
            <span className="w-[95%]">
              <b>Buy Now, Pay Later</b> – Spread your payments over time with
              trusted installment providers (where applicable).
            </span>
          </li>
        </ul>
        <div>
          <p className="text-2xl mb-2">Secure Transactions</p>
          <p>
            Your security is our priority. All transactions are encrypted and
            processed through industry-leading payment gateways to ensure a safe
            checkout experience.
          </p>
          <p>
            For any payment-related inquiries, feel free to reach out to our{" "}
            <a
              href="mailto:customer@furniro.com"
              className="underline hover:no-underline"
            >
              customer support team
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentOptions;
