import React from "react";

const TextField = ({
  name,
  id,
  type,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div className="mb-3 xl:w-96">
      <label
        htmlFor={id}
        className="form-label inline-block mb-2 text-gray-700 text-center w-full"
      >
        {label || ""}
      </label>
      <input
        type={type}
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
        id={id}
        name={name}
        placeholder={placeholder || ""}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default TextField;
