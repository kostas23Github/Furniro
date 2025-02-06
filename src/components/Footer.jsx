import { Link } from "react-router";
import Button from "./button/Button";
import Links from "./navigationBar/Links";
import Form from "./Form";

function Footer() {
  return (
    <div className="p-6 md:p-10 md:flex md:justify-between">
      <div className="mb-5 md:mx-4">
        <header className="text-3xl mb-3">Furniro.</header>
        <p className="text-grey-300">
          400 University Drive Suite 200 Coral Gables, FL 33134 USA
        </p>
      </div>
      <div className="mb-5 md:mx-4">
        <header className="mb-3 text-grey-300">Links</header>
        <Links items={["Shop", "About", "Contact"]} placement="footer" />
      </div>
      <div className="mb-5 md:mx-4">
        <header className="mb-3 text-grey-300">Help</header>
        <ul>
          <li><Link>Payment Options</Link></li>
          <li>Returns</li>
          <li>Privacy Policies</li>
        </ul>
      </div>
      <div className="mb-5 md:mx-4">
        <header className="mb-3 text-grey-300">Newsletter</header>
        <Form 
      >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email Address"
            className="bg-transparent border-b-4 me-2"
          />
          <Button type="submit">SUBSCRIBE</Button>
        </Form>
      </div>
    </div>
  );
}

export default Footer;
