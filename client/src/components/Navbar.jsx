import React, { useState } from "react";
import { Link } from "react-router-dom";
import { mainLogo, profileImage } from "../assets/img";
import { useSelector } from "react-redux";
import { setLogout } from "state";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isAuth = Boolean(useSelector((state) => state.token));

  //logged in yapmada kaldık
  const isLoggedIn = () => {
    if (user && isAuth) {
      return (
        <>
          <div className="flex flex-row justify-center items-center">
            <img
              className="p-2 object-contain max-h-12 rounded-full"
              src={profileImage}
              alt="logo"
            />
            <Link
              to="/profile"
              className="text-gray-900 hover:text-gray-500 cursor-pointer transition duration-500 whitespace-nowrap"
            >
              {user?.name}
            </Link>
          </div>

          <Link
            to="/me/responses"
            className="text-gray-900 hover:text-gray-500 cursor-pointer transition duration-500 whitespace-nowrap"
          >
            MY RESPONDS
          </Link>

          <Link
            to="/"
            onClick={() => dispatch(setLogout())}
            className="bg-red-600 px-3 py-1 hover:bg-red-500 text-white  cursor-pointer transition duration-500 whitespace-nowrap"
          >
            LOG OUT
          </Link>
        </>
      );
    }
    return (
      <>
        <Link to="/login">Login</Link>
        <Link
          to="/signup"
          className="bg-green-600 px-3 py-1 hover:bg-green-500 text-white  cursor-pointer transition duration-500 whitespace-nowrap"
        >
          SIGN UP
        </Link>
      </>
    );
  };

  return (
    <header className="fixed bg-white shadow-md w-full top-0 left-0 z-10 uppercase max-h-16">
      <div className="container flex items-center justify-between space-x-8 lg:space-x-16">
        <Link to="/">
          <img
            className="pl-4 md:pl-0 object-contain max-h-16"
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
              to="/"
              className=" text-gray-900		hover:text-gray-500	transition duration-500"
            >
              HOME
            </Link>
            <Link
              to="/applications"
              className=" text-gray-900		hover:text-gray-500	transition duration-500"
            >
              APPLICATIONS
            </Link>
            <div className="cursor-none">|</div>
            {isLoggedIn()}
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
          to="/"
          className=" text-gray-900		hover:text-gray-500	transition duration-500"
        >
          HOME
        </Link>
        <Link
          to="/applications"
          className=" text-gray-900		hover:text-gray-500	transition duration-500"
        >
          APPLICATIONS
        </Link>
        {isLoggedIn()}
      </div>
    </header>
  );
};

export default Navbar;
