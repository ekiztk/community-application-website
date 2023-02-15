import React, { useState } from "react";
import { Link } from "react-router-dom";
import { mainLogo } from "../assets/img";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed bg-white shadow-md w-full top-0 left-0 z-10 uppercase max-h-16">
      <div className="container flex items-center justify-between space-x-8 lg:space-x-16">
        <Link to="/">
          <img
            className="pl-4 md:pl-0 pt-1 pb-1 text-4xl lg:text-6xl object-contain max-h-16"
            src={mainLogo}
            alt="logo"
          />
        </Link>
        <div className="block md:hidden pr-4" onClick={() => setOpen(!open)}>
          <div className="space-y-1 cursor-pointer">
            <div className="bg-black w-8 h-1 rounded-full"></div>
            <div className="bg-black w-8 h-1 rounded-full"></div>
            <div className="bg-black w-8 h-1 rounded-full"></div>
          </div>
        </div>

        <nav className="pr-4 hidden md:flex justify-end flex-1">
          <div className="flex items-center lg:text-lg space-x-4 lg:space-x-8">
            <Link
              href="#"
              className=" text-gray-900		hover:text-gray-500	transition duration-500"
            >
              HOME
            </Link>
            <Link
              href="#"
              className=" text-gray-900		hover:text-gray-500	transition duration-500"
            >
              ABOUT US
            </Link>
            <Link
              href="#"
              className=" text-gray-900		hover:text-gray-500	transition duration-500"
            >
              CONTACT US
            </Link>
            <Link
              href="#"
              className=" text-gray-900		hover:text-gray-500	transition duration-500"
            >
              APPLICATIONS
            </Link>
            <div className="cursor-none">|</div>
            <Link href="#">Login</Link>
            <Link
              href="#"
              className="bg-green-600 px-3 py-1 hover:bg-green-500 text-white  cursor-pointer transition duration-500 whitespace-nowrap"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
      <div
        className={
          open
            ? "absolute bg-white min-h-[60vh] top-16 flex flex-col justify-evenly items-center gap-y-2 md:hidden w-full"
            : "hidden"
        }
      >
        <Link
          href="#"
          className=" text-gray-900	hover:text-gray-500	transition duration-500"
        >
          HOME
        </Link>
        <Link
          href="#"
          className=" text-gray-900		hover:text-gray-500	transition duration-500"
        >
          ABOUT US
        </Link>
        <Link
          href="#"
          className=" text-gray-900		hover:text-gray-500	transition duration-500"
        >
          CONTACT US
        </Link>
        <Link
          href="#"
          className=" text-gray-900		hover:text-gray-500	transition duration-500"
        >
          APPLICATIONS
        </Link>
        <Link href="#">Login</Link>
        <Link
          href="#"
          className="bg-green-600 px-3 py-1 hover:bg-green-500 text-white  cursor-pointer transition duration-500 whitespace-nowrap"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
