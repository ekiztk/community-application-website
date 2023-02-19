import React from "react";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { MdAccountBalance, MdVerified } from "react-icons/md";

const Values = () => {
  return (
    <div className="p-4 md:p-8 ">
      <h2 className="pb-4  text-center text-2xl lg:text-4xl text-black">
        OUR VALUES
      </h2>
      <div className="grid grid-cols-1  md:grid-cols-3 gap-8 md:gap-16 p-8">
        <div className="p-4 auto-rows-auto auto-cols-auto shadow-inner rounded-sm border-solid border-2 border-gray-300">
          <HiOutlineGlobeAlt className="mx-auto mb-4" size="96" />
          <p className="text-center text-black text-lg  leading-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed
            maximus leo. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </p>
        </div>
        <div className="p-4 auto-rows-auto auto-cols-auto shadow-inner rounded-sm border-solid border-2 border-gray-300">
          <MdAccountBalance className="mx-auto mb-4" size="96" />
          <p className="text-center text-black text-lg  leading-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed
            maximus leo. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </p>
        </div>
        <div className="p-4 auto-rows-auto auto-cols-auto shadow-inner rounded-sm border-solid border-2 border-gray-300">
          <MdVerified className="mx-auto mb-4" size="96" />
          <p className="text-center text-black text-lg  leading-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed
            maximus leo. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Values;
