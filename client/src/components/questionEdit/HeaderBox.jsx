import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeDescription } from "../../store";
import { MdDateRange } from "react-icons/md";

const HeaderBox = ({ editable }) => {
  const dispatch = useDispatch();
  const { name, description, startDate, deadlineDate } = useSelector(
    (state) => ({
      name: state.application.data.name,
      description: state.application.data.description,
      startDate: state.application.data.startDate,
      deadlineDate: state.application.data.deadlineDate,
    })
  );

  const handleDescriptionChange = (event) => {
    dispatch(changeDescription(event.target.value));
  };

  return (
    <div className="p-1 md:p-2 lg:p-4 bg-white text-left rounded-md w-[80%] lg:w-[60%] flex flex-col gap-y-4">
      <h1 className="text-2xl text-center p-2">{name?.toUpperCase()}</h1>
      {editable ? (
        <textarea
          className="
          form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
          rows="3"
          placeholder="Description text..."
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      ) : (
        <p>{description}</p>
      )}

      <div className="mb-2 md:mb-4 text-black text-sm flex flex-row items-center justify-center">
        <MdDateRange size={24} />
        <p>
          {new Date(startDate).toLocaleDateString("en-US") +
            " - " +
            new Date(deadlineDate).toLocaleDateString("en-US")}
        </p>
      </div>
    </div>
  );
};

export default HeaderBox;
