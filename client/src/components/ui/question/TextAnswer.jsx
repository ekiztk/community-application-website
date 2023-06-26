import React from 'react';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setQuestionAnswer } from 'store';

const TextAnswer = ({ question, showEdit }) => {
  const dispatch = useDispatch();

  function handleSaveAnswer(e) {
    dispatch(
      setQuestionAnswer({ id: question.id, answer: e.target.value.toString() })
    );
  }

  return (
    <TextField
      label="Answer"
      multiline
      rows={2}
      value={question?.answer}
      onChange={!showEdit ? handleSaveAnswer : undefined}
    />
  );
};

export default TextAnswer;
