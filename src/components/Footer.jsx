import { useState } from "react";
import Button from "./button/Button";
import Links from "./navigationBar/Links";
import Form from "./Form";
import FormModal from "./FormModal";
import SubFooter from "./SubFooter";

function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModal(bool) {
    setIsModalOpen(bool);
  }

  return (
    <div>
      <div className="p-5 sm:p-10 lg:p-20 md:flex md:justify-between md:gap-4 min-h-[300px]">
        <div className="mb-5">
          <header className="text-3xl mb-3">Furniro.</header>
          <p className="text-grey-300">
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </p>
        </div>
        <div className="mb-5">
          <header className="mb-3 text-2xl">Links</header>
          <Links items={["Shop", "About", "Contact"]} placement="footer" />
        </div>
        <div className="mb-5">
          <header className="mb-3 text-2xl">Help</header>
          <Links
            items={["Payment Options", "Returns", "Privacy Policies"]}
            placement="footer"
          />
        </div>
        <div className="mb-5">
          <header className="mb-3 text-2xl">Newsletter</header>
          <Form>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
              className="bg-transparent placeholder:italic border-b-4 focus:border-grey-400 me-2 focus:outline-0"
            />
            <Button type="submit" onClick={() => handleModal(true)}>
              SUBSCRIBE
            </Button>
            {isModalOpen && <FormModal modalOpen={handleModal} />}
            {/* <FormModal modalOpen={handleModal} /> */}
          </Form>
        </div>
      </div>
      <SubFooter />
    </div>
  );
}

export default Footer;
