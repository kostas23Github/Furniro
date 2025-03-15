import { useState } from "react";
import Hero from "../../components/Hero";
import shopHeroBg from "../../assets/images/hero-bg/Shop-hero-bg.png";
import Button from "../../components/button/Button";
import { IoIosArrowDown } from "react-icons/io";

function Returns() {
  const [accordionState, setAccordionState] = useState(
    new Array(5).fill(false)
  );

  const handleClick = (index) => {
    // Toggle the open/close state of the clicked item, leave others unchanged
    setAccordionState((prevState) => {
      const newState = [...prevState]; // Copy previous state
      newState[index] = !newState[index]; // Toggle the specific item
      return newState;
    });
  };

  return (
    <div>
      <Hero
        ancestors={["Home"]}
        currentPage="Payment Options"
        hasImage={shopHeroBg}
      />
      <div className="p-5 sm:p-10 lg:p-20">
        <div className="outline outline-2 outline-grey-200 p-6 mb-6">
          <Button
            variant="icon"
            extraStyles={`w-full flex justify-between items-center`}
            onClick={() => handleClick(0)}
          >
            <span className="text-2xl">Withdrawal & Product Returns</span>
            <IoIosArrowDown
              className={`text-3xl transition-all transition-100 ${
                accordionState[0] ? "rotate-180" : ""
              }`}
            />
          </Button>
          {/* To prevent linter from throwing apostrophe error. React will render the apostrophe only the linter throws error. */}
          {/* eslint-disable */}
          <div
            className={`overflow-hidden transition-all transition-100 ${
              accordionState[0] ? "mt-6 max-h-max" : "max-h-0"
            }`}
          >
            <p>
              Product returns and withdrawals to Furniro are both handled with
              ease and customer satisfaction in mind. Furniro understands that
              purchasing furniture can be a significant investment, and
              sometimes, a product may not meet expectations or fit in a space
              as envisioned. Therefore, they offer a straightforward return and
              withdrawal policy to ensure a positive shopping experience.
            </p>
            <p className="text-2xl mt-8 mb-4">Product Returns</p>
            <p>
              Customers can return products within 30 days of purchase, provided
              the item is in its original, unused condition. Whether the reason
              for return is dissatisfaction with the product, a mismatch in
              style, or simply a change of mind, Furniro's customer service team
              is available to guide you through the process. To initiate a
              return, customers can either contact the customer service
              department through the website or visit one of the stores. Once
              the return is approved, customers can expect a prompt refund or
              exchange. Delivery fees for returned items may vary based on
              location and the nature of the return.
            </p>
            <p className="text-2xl mt-8 mb-4">Withdrawals</p>
            <p>
              In addition to returns, customers also have the option to withdraw
              from their purchase agreement within 14 days of receipt of goods.
              This allows the customer to cancel their purchase without
              providing a specific reason. To proceed with a withdrawal,
              customers must inform Furniro in writing via email or through
              their website. After the withdrawal is processed, the full payment
              will be refunded, excluding any delivery charges.
              <br />
              Furniro values its customers' trust and aims to make the return
              and withdrawal processes as seamless as possible. With a strong
              commitment to quality and service, they continuously strive to
              ensure that customers are happy with their purchases or are fully
              supported when returning or withdrawing products.
            </p>
          </div>
        </div>
        <div className="outline outline-2 outline-grey-200 p-6 mb-6">
          <Button
            variant="icon"
            extraStyles={`w-full flex justify-between items-center`}
            onClick={() => handleClick(1)}
          >
            <span className="text-2xl">Defective product</span>
            <IoIosArrowDown
              className={`text-3xl transition-all transition-100 ${
                accordionState[1] ? "rotate-180" : ""
              }`}
            />
          </Button>
          {/* To prevent linter from throwing apostrophe error. React will render the apostrophe only the linter throws error. */}
          {/* eslint-disable */}
          <div
            className={`overflow-hidden transition-all transition-100 ${
              accordionState[1] ? "mt-6 max-h-max" : "max-h-0"
            }`}
          >
            <p>
              At Furniro, we take product quality seriously and strive to ensure
              that every item meets the highest standards. However, in the rare
              event that a customer receives a defective product, we are
              committed to resolving the issue quickly and efficiently. <br />
              <br />
              If a product is found to be faulty upon delivery or develops a
              defect within the warranty period, customers can contact our
              customer service team to report the issue. We may request photos
              or additional details to assess the defect and determine the best
              course of action. <br />
              <br />
              Once the defect is confirmed, Furniro offers several resolution
              options, including a full refund, a replacement, or a repair
              service, depending on the nature of the defect and the customer's
              preference. In cases where a replacement is necessary, we
              prioritize fast processing to minimize any inconvenience. <br />
              <br />
              Customers can initiate a defective product claim through our
              website or by visiting one of our stores. Our team is always
              available to assist and ensure a smooth resolution process. At
              Furniro, customer satisfaction is our top priority, and we stand
              by the quality of our products.
            </p>
            <p className="text-2xl mt-8 mb-4">Legal Warranty</p>
            <p>
              At Furniro, we stand behind the quality of our products and ensure
              that all purchases are covered by the legal warranty, in
              accordance with consumer protection laws. The legal warranty
              guarantees that products are free from manufacturing defects and
              function as intended for a reasonable period after purchase.
              <br />
              <br />
              If a product develops a defect that is not caused by misuse,
              normal wear and tear, or accidental damage, customers have the
              right to request a repair, replacement, or refund, depending on
              the circumstances. To initiate a warranty claim, customers should
              contact our customer service team with proof of purchase and
              details of the issue. In some cases, we may request additional
              information or an inspection of the product.
              <br />
              <br />
              Furniro is committed to resolving warranty claims efficiently,
              ensuring that customers receive a fair solution in compliance with
              legal requirements. Our goal is to provide high-quality products
              and reliable support, giving customers peace of mind with every
              purchase.
            </p>
            <p className="text-2xl mt-8 mb-4">Commercial Warranty</p>
            <p>
              Furniro offers a commercial warranty on select products, providing
              customers with extended protection and peace of mind. The
              commercial warranty covers specific defects or damages beyond the
              standard legal warranty, ensuring that customers can enjoy their
              purchases with confidence.
              <br />
              <br />
              The terms and duration of the commercial warranty vary depending
              on the product. It may include benefits such as extended repair
              services, free replacements, or additional coverage for certain
              types of wear and tear. Customers can find detailed information
              about the commercial warranty for each product on our website or
              by contacting our customer service team.
              <br />
              <br />
              To make a claim under the commercial warranty, customers must
              provide proof of purchase and details of the issue. Our team will
              assess the claim and determine the best course of action, whether
              it be a repair, replacement, or other solution. At Furniro, we are
              committed to delivering high-quality products and excellent
              customer service, ensuring a smooth and hassle-free experience for
              all warranty claims.
            </p>
          </div>
        </div>
        <div className="outline outline-2 outline-grey-200 p-6 mb-6">
          <Button
            variant="icon"
            extraStyles={`w-full flex justify-between items-center`}
            onClick={() => handleClick(2)}
          >
            <span className="text-2xl">Refund & Replacement</span>
            <IoIosArrowDown
              className={`text-3xl transition-all transition-100 ${
                accordionState[2] ? "rotate-180" : ""
              }`}
            />
          </Button>
          <div
            className={`overflow-hidden transition-all transition-100 ${
              accordionState[2] ? "mt-6 max-h-max" : "max-h-0"
            }`}
          >
            <p>
              At Furniro, we strive to ensure customer satisfaction with every
              purchase. If a product does not meet expectations, customers have
              the option to request a refund or a replacement, subject to our
              return policy.
              <br />
              <br />
              To be eligible for a refund or replacement, the item must be
              returned in its original condition, unused, and with all original
              packaging and accessories. Customers can initiate the process by
              contacting our customer service team or visiting one of our
              stores. Once the return is approved, a refund will be issued using
              the original payment method, or a replacement will be arranged
              based on the customer’s preference and product availability.
              <br />
              <br />
              Refund processing times may vary depending on the payment
              provider. If the product is found to be defective or damaged upon
              delivery, Furniro covers any return shipping costs. However, for
              returns due to a change of mind, return fees may apply.
              <br />
              <br />
              Our goal is to provide a smooth and hassle-free refund and
              replacement experience, ensuring that customers feel confident
              when shopping with Furniro.
            </p>
          </div>
        </div>
        <div className="outline outline-2 outline-grey-200 p-6 mb-6">
          <Button
            variant="icon"
            extraStyles={`w-full flex justify-between items-center`}
            onClick={() => handleClick(3)}
          >
            <span className="text-2xl">Return Restrictions</span>
            <IoIosArrowDown
              className={`text-3xl transition-all transition-100 ${
                accordionState[3] ? "rotate-180" : ""
              }`}
            />
          </Button>
          <div
            className={`overflow-hidden transition-all transition-100 ${
              accordionState[3] ? "mt-6 max-h-max" : "max-h-0"
            }`}
          >
            <p className="text-2xl mt-8 mb-4">Timeframe for Product Returns</p>
            <p>
              At Furniro, products can be returned within a specified period
              from the date of purchase, in accordance with our return policy.
              The return window typically lasts 30 days from the purchase date,
              provided the product is in its original, unused condition. After
              this period, returns may no longer be accepted, unless the product
              is defective or falls under warranty coverage. Please refer to our
              return policy for full details on specific timeframes for
              different product categories.
            </p>
            <p className="text-2xl mt-8 mb-4">Proof of Purchase</p>
            <p>
              A proof of purchase is required for any return, exchange, or
              warranty claim. This can include a receipt, invoice, or order
              confirmation that verifies the date of purchase and the product
              details. The proof of purchase ensures that we can accurately
              process your request and provide the appropriate solution.
            </p>
            <p className="text-2xl mt-8 mb-4">
              Exceptions to the Right of Withdrawal
            </p>
            <p>
              There are certain exceptions to the right of withdrawal at
              Furniro. These include, but are not limited to:
            </p>
            <ul className="list-disc ps-[17px]">
              <li>
                <b>Custom-made or personalized products</b>: Items that have
                been specifically tailored or customized for the customer cannot
                be returned.
              </li>
              <li>
                <b>Hygiene products</b>: Products such as mattresses, pillows,
                and other hygiene-related items are not eligible for return once
                opened.
              </li>
              <li>
                <b>Sealed products</b>: Products that have been unsealed for
                health or safety reasons are excluded from the return policy.
              </li>
              <li>
                <b>Discounted or final sale items</b>: Products purchased at a
                discount or marked as final sale may not be returned.
              </li>
            </ul>
            <p>
              These exceptions ensure that certain products, for hygiene or
              customization reasons, cannot be returned once purchased. Please
              refer to our full return policy for more details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Returns;
