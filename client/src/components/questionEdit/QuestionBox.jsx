import React, { useState, useRef, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import TypeDropdown from "./questionType/TypeDropdown";
import MultipleChoiceQuestion from "./questionType/MultipleChoiceQuestion";
import TextQuestion from "./questionType/TextQuestion";
import { useSelector, useDispatch } from "react-redux";
import {
  changeQuestionText,
  setQuestionActive,
  setQuestionRequired,
  deleteQuestion,
} from "../../store";

//is editing nasıl yapılacak onda kaldık

const QuestionBox = ({ qIndex, editable }) => {
  const myRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const question = useSelector(
    (state) => state.application.data.questions[qIndex]
  );

  const handleTextChange = (event) => {
    dispatch(changeQuestionText({ index: qIndex, text: event.target.value }));
  };

  const handleActiveSet = (event) => {
    console.log(question.active);
    dispatch(setQuestionActive({ index: qIndex, active: !question.active }));
  };

  const handleRequiredSet = (event) => {
    dispatch(
      setQuestionRequired({ index: qIndex, required: !question.required })
    );
  };

  const handleDeleteQuestion = (event) => {
    dispatch(deleteQuestion(qIndex));
  };

  const returnQuestionType = (type) => {
    if (type === "singleLineText" || type === "multiLineText") {
      return <TextQuestion isEditing={isEditing} qIndex={qIndex} type={type} />;
    }
    if (type === "multipleChoice") {
      return <MultipleChoiceQuestion isEditing={isEditing} qIndex={qIndex} />;
    }
  };

  const handleClickOutside = (e) => {
    if (editable && !myRef.current.contains(e.target)) {
      setIsEditing(false);
    }
  };

  const handleClickInside = () => setIsEditing(true);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  if (!editable) {
    return (
      <div className="p-2 md:p-4  bg-white text-left rounded-md w-[80%] lg:w-[60%] flex flex-col gap-y-4">
        <p>{question?.text}</p>
        {returnQuestionType(question?.type)}
      </div>
    );
  }

  return (
    <div
      ref={myRef}
      onClick={handleClickInside}
      className="p-1 md:p-2 lg:p-4 bg-white text-left rounded-md w-[80%] lg:w-[60%] flex flex-col gap-y-4"
    >
      {isEditing ? (
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
          value={question?.text}
          onChange={handleTextChange}
          rows="1"
          placeholder="Question text..."
        ></textarea>
      ) : (
        <p>{question?.text}</p>
      )}

      {returnQuestionType(question?.type || "singleLineText")}
      {isEditing && (
        <>
          <hr className="border-1 border-black" />
          <div className="h-8 md:h-12 flex flex-row gap-x-2 md:gap-x-4 justify-center items-center">
            <TypeDropdown qIndex={qIndex} />
            <span>|</span>
            <div className="flex justify-center items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={question?.active}
                  className="sr-only peer"
                  onChange={handleActiveSet}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Active
                </span>
              </label>
            </div>
            <span>|</span>
            <div className="flex justify-center items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={question?.required}
                  className="sr-only peer"
                  onChange={handleRequiredSet}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Required
                </span>
              </label>
            </div>
            <span>|</span>
            <MdDelete
              onClick={handleDeleteQuestion}
              className="object-center h-8 w-8 cursor-pointer"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionBox;
