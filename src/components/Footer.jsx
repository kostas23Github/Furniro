import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./button/button";
import Links from "./navigationBar/Links";
import Form from "./Form";
import FormModal from "./FormModal";
import SubFooter from "./SubFooter";
import { IoLogoFacebook } from "react-icons/io";
import { IoLogoYoutube } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io";

function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModal(bool) {
    setIsModalOpen(bool);
  }

  return (
    <div>
      <div className="p-5 sm:p-10 lg:p-20 md:flex md:justify-between md:gap-4 min-h-[300px]">
        <div className="mb-5 md:w-[33%]">
          <header className="text-3xl mb-3">Furniro.</header>
          <p className="text-grey-300">
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </p>
        </div>
        <div className="mb-5 md:grow">
          <header className="mb-3 text-2xl">Links</header>
          <Links items={["Shop", "Contact"]} placement="footer" />
          <header className="mt-5 mb-3 text-2xl">Social</header>
          <div className="flex gap-2">
            <Link
              to={"#"}
              className="p-1 rounded-sm w-max bg-grey-200 hover:bg-blue-500 hover:text-slate-50"
            >
              <IoLogoFacebook className="text-xl" />
            </Link>
            <Link
              to={"#"}
              className="p-1 rounded-sm w-max bg-grey-200 hover:bg-rose-500 hover:text-slate-50"
            >
              <IoLogoYoutube className="text-xl" />
            </Link>
            <Link
              to={"#"}
              className="p-1 rounded-sm w-max bg-grey-200 hover:bg-sky-500 hover:text-slate-50"
            >
              <IoLogoTwitter className="text-xl" />
            </Link>
            <Link
              to={"#"}
              className="p-1 rounded-sm w-max bg-grey-200 hover:bg-instagram hover:text-slate-50"
            >
              <IoLogoInstagram className="text-xl" />
            </Link>
          </div>
        </div>
        <div className="mb-5 md:grow">
          <header className="mb-3 text-2xl">Help</header>
          <Links
            items={["Payment Options", "Returns", "Purchase Security"]}
            placement="footer"
          />
        </div>
        <div className="mb-5 md:w-[33%]">
          <header className="mb-3 text-2xl">Newsletter</header>
          <Form>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email Address"
              className="block bg-transparent placeholder:italic border-b-4 focus:border-grey-400 me-2 focus:outline-0"
            />
            <Button type="submit" onClick={() => handleModal(true)}>
              SUBSCRIBE
            </Button>
            {isModalOpen && <FormModal modalOpen={handleModal} />}
          </Form>
        </div>
      </div>
      <SubFooter />
    </div>
  );
}

export default Footer;
