import React from "react";
import { MdDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

const ApplicationBox = ({ item, mode }) => {
  return (
    <div
      key={item.id}
      className="p-4 text-center md:p-8 auto-rows-auto auto-cols-auto shadow-inner rounded-sm border-solid border-2 border-gray-300"
    >
      <h3 className="mb-2 md:mb-4 text-black text-2xl">{item?.name}</h3>
      <hr />
      <p className="mb-2 md:mb-4 text-black text-sm leading-8">
        {item?.description?.length > 160
          ? item.description.slice(0, 160) + "..."
          : item.description}
      </p>
      <div className="mb-2 md:mb-4 text-black text-xs flex flex-row items-center justify-center">
        <MdDateRange size={24} />
        <p>
          {new Date(item?.startDate).toLocaleDateString("en-US") +
            " - " +
            new Date(item?.deadlineDate).toLocaleDateString("en-US")}
        </p>
      </div>
      <hr />
      <Link to={`/applications/${item.slug}`}>
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Apply
        </button>
      </Link>
      {mode === "edit" && (
        <Link to={`/applications/edit/${item.id}`}>
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Edit
          </button>
        </Link>
      )}
    </div>
  );
};

export default ApplicationBox;
