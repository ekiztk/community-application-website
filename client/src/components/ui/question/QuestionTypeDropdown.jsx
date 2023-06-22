import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuestionType } from 'store';

const QuestionTypeDropdown = ({ questionId }) => {
  const dispatch = useDispatch();
  const type = useSelector(
    (state) =>
      state.application.data.questions.find((item) => item.id === questionId)
        .type
  );

  const handleTypeChange = (event) => {
    dispatch(changeQuestionType({ id: questionId, type: event.target.value }));
  };

  return (
    <>
      <select
        name="questionType"
        className="cursor-pointer text-sm font-medium text-gray-900 dark:text-com-primary-100 dark:bg-com-surface-200"
        onChange={handleTypeChange}
        value={type}
      >
        <option value="text">Text</option>
        <option value="multipleChoice">Multiple Choice</option>
      </select>
    </>
  );
};

export default QuestionTypeDropdown;
