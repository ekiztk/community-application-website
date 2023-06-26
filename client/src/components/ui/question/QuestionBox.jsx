//question box ve alt componentleri yapılacak
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  changeQuestionText,
  setQuestionActive,
  setQuestionRequired,
  deleteQuestion,
} from 'store';
import MultipleChoiceAnswer from './MultipleChoiceAnswer';
import TextAnswer from './TextAnswer';
import QuestionTypeDropdown from './QuestionTypeDropdown';
import {
  Typography,
  Paper,
  TextField,
  Divider,
  Grid,
  FormControlLabel,
  Switch,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const QuestionBox = ({ question, showEdit }) => {
  const myRef = useRef();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isAnswerEmpty, setIsAnswerEmpty] = useState(false);

  const handleTextChange = (event) => {
    dispatch(changeQuestionText({ id: question.id, text: event.target.value }));
  };

  const handleActiveSet = (event) => {
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
    if (showEdit && !myRef.current.contains(e.target)) {
      setIsEditing(false);
    }
  };

  const handleClickInside = () => setIsEditing(true);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  const handleBlur = (e) => {
    if (
      !question.hasOwnProperty('answer') ||
      (typeof question.answer === 'string' &&
        question.answer?.trim().length === 0) ||
      typeof question.answer !== 'string'
    ) {
      setIsAnswerEmpty(true);
    } else {
      setIsAnswerEmpty(false);
    }
  };

  if (!showEdit) {
    return (
      <Paper
        onBlur={handleBlur}
        elevation={24}
        className={`p-1 md:p-2 lg:p-4 text-left rounded-md w-[80%] lg:w-[60%] flex flex-col gap-y-4 ${
          isAnswerEmpty && 'border-solid border-2 border-red-500'
        }`}
      >
        <Typography variant="body1">
          {question.text}
          {question.required && <span className="text-red-500"> *</span>}
        </Typography>
        {returnQuestionType(question?.type)}
      </Paper>
    );
  }

  return (
    <Paper
      elevation={24}
      ref={myRef}
      onClick={handleClickInside}
      className="p-1 md:p-2 lg:p-4 text-left rounded-md w-[80%] lg:w-[60%] flex flex-col gap-y-4"
    >
      {isEditing ? (
        <TextField
          label="Question"
          multiline
          rows={2}
          value={question?.text}
          onChange={handleTextChange}
        />
      ) : (
        <Typography variant="body1">{question?.text}</Typography>
      )}

      {returnQuestionType(question?.type || 'text')}
      {isEditing && (
        <>
          <Divider component="div" role="presentation">
            ACTIONS
          </Divider>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 6, sm: 6, md: 3 }}
            className="justify-center items-center"
          >
            <Grid item className="flex justify-center items-center">
              <QuestionTypeDropdown questionId={question.id} />
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem></Divider>
            <Grid item className="flex justify-center items-center">
              <FormControlLabel
                control={
                  <Switch
                    onChange={handleActiveSet}
                    checked={question?.active}
                  />
                }
                label="Active"
              />
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem></Divider>
            <Grid item className="flex justify-center items-center">
              <FormControlLabel
                control={
                  <Switch
                    onChange={handleRequiredSet}
                    checked={question?.required}
                  />
                }
                label="Required"
              />
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem></Divider>
            <Grid item>
              <IconButton size="large" color="inherit">
                <DeleteIcon onClick={handleDeleteQuestion} />
              </IconButton>
            </Grid>
          </Grid>
        </>
      )}
    </Paper>
  );
};

export default QuestionBox;
