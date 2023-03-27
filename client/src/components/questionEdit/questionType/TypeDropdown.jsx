import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeQuestionType } from "../../../store";

const QuestionTypeDropdown = ({ qIndex }) => {
  const dispatch = useDispatch();
  const type = useSelector(
    (state) => state.application.data.questions[qIndex].type
  );

  const handleTypeChange = (event) => {
    dispatch(changeQuestionType({ index: qIndex, type: event.target.value }));
  };

  return (
    <>
      <select
        name="questionType"
        className="cursor-pointer text-sm font-medium text-gray-900 dark:text-gray-300 border-b-gray-400 border-solid border-b-2"
        onChange={handleTypeChange}
        value={type}
      >
        <option value="singleLineText">Single Line Text</option>
        <option value="multiLineText">Multi Line Text</option>
        <option value="multipleChoice">Multiple Choice</option>
      </select>
    </>
  );
};

export default QuestionTypeDropdown;
