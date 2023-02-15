import React from "react";
import { heroImage } from "../../assets/img";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section className="h-96 lg:h-128 relative">
        <img
          src={heroImage}
          alt="Main"
          className="h-full w-full object-cover"
        />

        <div className="p-4 absolute top-0 h-full w-full flex flex-col justify-center gap-y-6 bg-gradient-to-b from-transparent to-black">
          <div className="text-center tracking-tight md:tracking-wide">
            <h1 className="text-4xl lg:text-6xl text-white">Lorem Ipsum</h1>
            <p className="text-white text-sm ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              quas officia aut quidem? Numquam fuga quis repellendus ad beatae
              culpa?
            </p>
          </div>
          <Link
            href="#"
            className="inline-block mx-auto max-w-max px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            JOIN US!
          </Link>
        </div>
      </section>
    </>
  );
};

export default Hero;
