import React from 'react';
import { TextareaAutosize } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionAnswer } from 'store';

const TextAnswer = ({ question, showEdit }) => {
  const dispatch = useDispatch();

  function handleSaveAnswer(e) {
    dispatch(setQuestionAnswer({ id: question.id, answer: e.target.value }));
  }

  return (
    <TextareaAutosize onChange={!showEdit ? handleSaveAnswer : undefined} />
  );
};

export default TextAnswer;
