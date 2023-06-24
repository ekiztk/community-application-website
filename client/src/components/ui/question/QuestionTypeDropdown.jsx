import { useTheme } from '@emotion/react';
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

  const isDarkTheme = useTheme().palette.mode === 'dark';
  console.log(isDarkTheme);
  return (
    <>
      <select
        name="questionType"
        onChange={handleTypeChange}
        value={type}
        className={`block w-full p-2.5 border ${
          isDarkTheme
            ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
            : 'bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500'
        }   `}
      >
        <option value="text">Text</option>
        <option value="multipleChoice">Multiple Choice</option>
      </select>
    </>
  );
};

export default QuestionTypeDropdown;
