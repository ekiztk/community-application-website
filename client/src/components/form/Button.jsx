import React from "react";

const BUTTON_STYLES = {
  primary: "bg-blue",
  secondary: "bg-purple",
  success: "bg-green",
  danger: "bg-red",
  warning: "bg-yellow",
};

const Button = ({ type, style, text, className, onChange, onBlur }) => {
  return (
    <button
      type={type || "button"}
      onChange={onChange}
      onBlur={onBlur}
      className={`${className || ""} inline-block px-6 py-2.5 ${
        BUTTON_STYLES[style]
      }-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:${
        BUTTON_STYLES[style]
      }-700 hover:shadow-lg focus:${
        BUTTON_STYLES[style]
      }-700 focus:shadow-lg focus:outline-none focus:ring-0 active:${
        BUTTON_STYLES[style]
      }-800 active:shadow-lg transition duration-150 ease-in-out`}
    >
      {text || ""}
    </button>
  );
};

export default Button;
