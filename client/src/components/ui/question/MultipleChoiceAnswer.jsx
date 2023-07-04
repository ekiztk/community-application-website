import React from 'react';
import { useDispatch } from 'react-redux';
import { setQuestionAnswer, changeQuestionOptions } from 'store';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Typography, TextField } from '@mui/material';

const MultipleChoiceAnswer = ({ question, showEdit, disabled }) => {
  const dispatch = useDispatch();
  const options = question.options;

  function handleAddRadio(e) {
    e.preventDefault();
    dispatch(
      changeQuestionOptions({
        id: question.id,
        options: [...options, 'Option text...'],
      })
    );
  }

  function handleRemoveRadio(e, index) {
    e.preventDefault();
    dispatch(
      changeQuestionOptions({
        id: question.id,
        options: [...options.slice(0, index).concat(options.slice(index + 1))],
      })
    );
  }

  function handleOptionTextChange(e, index) {
    const arr = [...options];
    arr[index] = e.target.value;
    dispatch(changeQuestionOptions({ id: question.id, options: [...arr] }));
  }

  function handleSaveAnswer(answerIndex) {
    dispatch(
      setQuestionAnswer({ id: question.id, answer: answerIndex.toString() })
    );
  }

  const addRadioOption = () => {
    return (
      <div
        onClick={handleAddRadio}
        className="flex flex-row justify-start items-center gap-x-2 "
      >
        <AddIcon fontSize="medium" />
        <Typography variant="subtitle1"> Add Option</Typography>
      </div>
    );
  };

  if (!showEdit) {
    return (
      <div className="flex flex-col gap-x-2 gap-y-2 justify-start items-start max-w-[80%]">
        {options?.length > 0 &&
          options.map((option, index) => {
            const isAnswer = index.toString() === question.answer;
            return (
              <div
                key={index}
                className="flex flex-row justify-start items-center gap-x-2"
              >
                <input
                  name={`o-for-${question.id}`}
                  type="radio"
                  className="w-4 h-4 inline dark:text-com-primary-100 "
                  value={option}
                  onChange={() => handleSaveAnswer(index)}
                  checked={isAnswer}
                  disabled={disabled}
                />
                <label htmlFor={`o-${question.id}-${index}`}>{option}</label>
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-x-2 gap-y-2 justify-start items-start max-w-[92%] md:max-w-[80%]">
        {options?.length > 0 &&
          options.map((option, index) => {
            return (
              <div
                key={index}
                className="flex flex-row justify-start items-center gap-x-2"
              >
                <input type="radio" className="w-4 h-4 inline" disabled />
                <TextField
                  label="Option Text"
                  variant="outlined"
                  value={option}
                  required
                  onChange={(e) => {
                    handleOptionTextChange(e, index);
                  }}
                />
                <CloseIcon
                  fontSize="medium"
                  onClick={(e) => {
                    handleRemoveRadio(e, index);
                  }}
                  className="object-center h-8 w-8 dark:text-com-primary-100"
                />
              </div>
            );
          })}
        {addRadioOption()}
      </div>
    </>
  );
};

export default MultipleChoiceAnswer;
