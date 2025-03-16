import { useContext } from "react";
import { ProductsContext } from "../../components/contexts/ProductsContext";
import Loading from "../../components/loadingAnimation/Loading";
import ErrorPage from "./ErrorPage";
import shopHeroBg from "../../assets/images/hero-bg/Shop-hero-bg.png";
import Hero from "../../components/Hero";
import { MdLocationPin } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import ContactForm from "../../components/form/ContactForm";

function Contact() {
  const { loading, error } = useContext(ProductsContext);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;

  const companyInfo = [
    {
      id: "Address",
      icon: <MdLocationPin />,
      info: { address: "236 5th SE Avenue, New York NY10000, United States" },
    },
    {
      id: "Phone",
      icon: <FaPhone />,
      info: {
        mobile: "Mobile: +(84) 546-6789",
        hotline: "Hotline: +(84) 456-6789",
      },
    },
    {
      id: "Working Time",
      icon: <GoClockFill />,
      info: {
        weekdays: "Monday-Friday: 9:00 - 22:00",
        weekend: "Saturday-Sunday: 9:00 - 21:00",
      },
    },
  ];

  return (
    <div>
      <Hero ancestors={["Home"]} currentPage="Contact" hasImage={shopHeroBg} />
      <div className="my-9 md:my-14 lg:my-20 text-center mx-auto w-10/12 md:w-8/12 lg:w-[600px]">
        <p className="text-5xl mb-4">Get In Touch With Us</p>
        <p className="text-gray-600">
          For More Information About Our Product & Services, Please Feel Free To
          Drop Us An Email. Our Staff Will Always Be There To Help You Out. Do
          Not Hesitate!
        </p>
      </div>
      <div className="p-5 sm:p-10 lg:p-20 md:flex md:justify-between md:gap-4">
        <ul className="mx-auto md:basis-96 md:grow-0">
          {companyInfo.map((info) => (
            <li key={info.id} className="my-4 flex gap-3">
              <p className="text-4xl">{info.icon}</p>
              <div>
                <p className="text-3xl">{info.id}</p>
                {Object.values(info.info).map((details, i) => (
                  <p key={i} className="text-xl">
                    {details}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <ContactForm />
      </div>
    </div>
  );
}

export default Contact;
