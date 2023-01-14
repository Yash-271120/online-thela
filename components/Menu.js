import Logo from "../public/LOGO.png";
import Image from "next/image";

const Menu = ({ open }) => {
  return (
    <div
      className={` absolute md:static basis-3/12 top-0 bottom-0 ${
        open ? "translate-x-0" : "translate-x-[-1200px]"
      } md:translate-x-0 transition-all duration-200 left-0 right-80 bg-gradient-to-b from-[#1a0d00] to-[#663300]`}
    >
      <div className=" px-2 py-2">
        <Image src={Logo} alt="Logo" />
      </div>
      <ul className=" mt-14">
        <li className="text-white hover:text-yellow-300 cursor-pointer text-2xl border-b-2 py-2 px-2 border-yellow-300">
          Home
        </li>
        <li className="text-orange-400 text-2xl border-b-2 cursor-pointer py-2 px-2 border-orange-400">
          Items
        </li>
        <li className="text-white hover:text-yellow-300 cursor-pointer text-2xl border-b-2 py-2 px-2 border-yellow-300">
          Orders
        </li>
        <li className="text-white hover:text-yellow-300 cursor-pointer text-2xl border-b-2 py-2 px-2 border-yellow-300">
          Vehicles
        </li>
        <li className="text-white hover:text-yellow-300 cursor-pointer text-2xl border-b-2 py-2 px-2 border-yellow-300">
          Trips
        </li>
      </ul>
    </div>
  );
};

export default Menu;
