//question box ve alt componentleri yapılacak
import React, { useState, useRef, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeQuestionText,
  setQuestionActive,
  setQuestionRequired,
  deleteQuestion,
} from 'store';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';
import TextAnswer from './TextAnswer';
import QuestionTypeDropdown from './QuestionTypeDropdown';
import { Box, Typography, Paper, TextField } from '@mui/material';

//QuestionBox component çevirimine devam edilecek
const QuestionBox = ({ question, editable }) => {
  const myRef = useRef();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleTextChange = (event) => {
    dispatch(changeQuestionText({ id: question.id, text: event.target.value }));
  };

  const handleActiveSet = (event) => {
    console.log(question.active);
    dispatch(setQuestionActive({ id: question.id, active: !question.active }));
  };

  const handleRequiredSet = (event) => {
    dispatch(
      setQuestionRequired({ id: question.id, required: !question.required })
    );
  };

  const handleDeleteQuestion = (event) => {
    dispatch(deleteQuestion(question.id));
  };

  const returnQuestionType = (type) => {
    if (type === 'text') {
      return <TextAnswer showEdit={isEditing} question={question} />;
    } else if (type === 'multipleChoice') {
      return <MultipleChoiceAnswer showEdit={isEditing} question={question} />;
    }
  };

  const handleClickOutside = (e) => {
    if (editable && !myRef.current.contains(e.target)) {
      setIsEditing(false);
    }
  };

  const handleClickInside = () => setIsEditing(true);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  if (!editable) {
    return (
      <Paper className="p-1 md:p-2 lg:p-4 text-left rounded-md w-[80%] lg:w-[60%] flex flex-col gap-y-4">
        <Typography variant="body1">{question?.text}</Typography>
        {returnQuestionType(question?.type)}
      </Paper>
    );
  }

  return (
    <Paper
      ref={myRef}
      onClick={handleClickInside}
      elevation={24}
      className="p-1 md:p-2 lg:p-4 text-left rounded-md w-[80%] lg:w-[60%] flex flex-col gap-y-4"
    >
      {isEditing ? (
        <TextField
          label="Question"
          multiline
          rows={2}
          defaultValue="Answer..."
          value={question?.text}
          onChange={handleTextChange}
        />
      ) : (
        <Typography variant="body1">{question?.text}</Typography>
      )}

      {returnQuestionType(question?.type || 'text')}
      {isEditing && (
        <>
          <hr className="border-1 border-black dark:border-com-primary-100" />
          <div className="h-8 md:h-12 flex flex-row gap-x-2 md:gap-x-4 justify-center items-center">
            <QuestionTypeDropdown questionId={question.id} />
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
            <CloseIcon onClick={handleDeleteQuestion} fontSize="medium" />
          </div>
        </>
      )}
    </Paper>
  );
};

export default QuestionBox;
