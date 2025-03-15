import Hero from "../../components/Hero";
import shopHeroBg from "../../assets/images/hero-bg/Shop-hero-bg.png";
import SecurityBadgeIcon from "../../assets/icons/securitybadge.svg";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";
import { FaBox } from "react-icons/fa";

function PurchaseSecurity() {
  return (
    <div>
      <Hero
        ancestors={["Home"]}
        currentPage="Purchase Security"
        hasImage={shopHeroBg}
      />
      <div className="p-5 sm:p-10 lg:p-20">
        <div className="flex flex-col items-center mb-28">
          <img
            src={SecurityBadgeIcon}
            alt="Security Badge Icon"
            className="w-20 mb-6"
          />
          <p className="text-3xl mb-4">Purchase Security at Furniro</p>
          <p>
            At Furniro, we prioritize the security of your purchases. We
            implement advanced encryption and secure payment methods to ensure
            that all transactions are safe and protected. Your personal and
            payment information is handled securely, giving you peace of mind
            while shopping with us. We guarantee that you will receive your
            product or a full refund, ensuring a smooth and worry-free shopping
            experience.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex gap-5 items-center mb-3">
            <FaMoneyBillWave className="text-2xl text-gold" />
            <span className="text-2xl">Money-Back Guarantee</span>
          </div>
          <p>
            At Furniro, we offer a money-back guarantee to ensure customer
            satisfaction. If for any reason you are not satisfied with your
            purchase, you can return the product and receive a full refund. Our
            goal is to provide you with a hassle-free experience and peace of
            mind with every purchase.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex gap-5 items-center mb-3">
            <FaPersonCircleQuestion className="text-2xl text-gold" />
            <span className="text-2xl">I Changed My Mind</span>
          </div>
          <p>
            If you change your mind about a purchase, we understand. At Furniro,
            we offer an easy and straightforward process for returns. Simply
            contact our customer service team, and we’ll assist you with the
            return and refund process, as long as the product is in its
            original, unused condition.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex gap-5 items-center mb-3">
            <FaBoxOpen className="text-2xl text-gold" />
            <span className="text-2xl">Received the Wrong Product</span>
          </div>
          <p>
            If you receive the wrong product, we apologize for the
            inconvenience. Please contact our customer service team immediately,
            no later than 14 days, and we will arrange for the correct product
            to be sent to you as soon as possible. We will also provide
            instructions for returning the incorrect item at no extra cost. Your
            satisfaction is our priority, and we are committed to resolving the
            issue quickly.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex gap-5 items-center mb-3">
            <FaBox className="text-2xl text-gold" />
            <span className="text-2xl">My Product is Defective</span>
          </div>
          <p>
            If your product is defective, we apologize for the inconvenience.
            Please contact our customer service team as soon as possible,
            providing details of the issue. We will assist you in resolving the
            matter, either by offering a replacement, repair, or refund,
            depending on the nature of the defect. Your satisfaction is
            important to us, and we will ensure that the issue is handled
            promptly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSecurity;
