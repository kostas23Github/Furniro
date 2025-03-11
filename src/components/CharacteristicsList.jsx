import { HiOutlineTrophy } from "react-icons/hi2";
import { HiOutlineShieldCheck } from "react-icons/hi2";
import { PiTruckThin } from "react-icons/pi";
import { PiHeadsetThin } from "react-icons/pi";

function CharacteristicsList() {
  return (
    <ul className="px-5 sm:px-10 md:px-10 md:py-24 lg:px-20 py-12 flex flex-wrap gap-6 xl:gap-0 justify-center bg-gold-light-2 hover:bg-gold-light-3">
      <li key="High Quality" className="flex justify-center items-center gap-6">
        <HiOutlineTrophy className="text-[4em] stroke-[.7]" />
        <div>
          <p>High Quality</p>
          <p className="w-48">crafted from top materials</p>
        </div>
      </li>
      <li key="Protection Warranty" className="flex justify-center items-center gap-6">
        <HiOutlineShieldCheck className="text-[4em] stroke-[0.7]" />
        <div>
          <p>Protection Warranty</p>
          <p className="w-48">Over 2 years</p>
        </div>
      </li>
      <li key="Free Shipping" className="flex justify-center items-center gap-6">
        <PiTruckThin className="text-[4em]"/>
        <div>
          <p>Free Shipping</p>
          <p className="w-48">Order over 150 $</p>
        </div>
      </li>
      <li key="24/7 Support" className="flex justify-center items-center gap-6">
        <PiHeadsetThin className="text-[4em]"/>
        <div>
          <p>24/7 Support</p>
          <p className="w-48">Dedicated support</p>
        </div>
      </li>
    </ul>
  );
}

export default CharacteristicsList;
