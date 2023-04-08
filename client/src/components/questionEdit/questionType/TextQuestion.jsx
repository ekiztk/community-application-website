import React from "react";
import { useDispatch } from "react-redux";
import { setAnswer } from "../../../store";

const TextQuestion = ({ qIndex, type, isEditing }) => {
  const dispatch = useDispatch();
  function handleSaveAnswer(e) {
    dispatch(setAnswer({ index: qIndex, answer: e.target.value }));
  }

  if (type === "multiLineText") {
    return (
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
        placeholder="Answer text..."
        disabled={isEditing || false}
        onChange={!isEditing && handleSaveAnswer}
      ></textarea>
    );
  } else if (type === "singleLineText") {
    return (
      <input
        type="text"
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
        placeholder="Answer text..."
        disabled={isEditing || false}
        onChange={!isEditing && handleSaveAnswer}
      />
    );
  }
};

export default TextQuestion;
