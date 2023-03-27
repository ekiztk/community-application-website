import React from "react";
import { destroyModal } from "utils/hooks/modal";
import { ImCross } from "react-icons/im";

const Header = ({ title }) => {
  return (
    <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
      <h5 className="text-xl text-center flex-1 font-medium leading-normal text-neutral-800 dark:text-neutral-200">
        {title}
      </h5>
      <button
        type="button"
        className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
        onClick={destroyModal}
      >
        <ImCross />
      </button>
    </div>
  );
};

export default Header;
