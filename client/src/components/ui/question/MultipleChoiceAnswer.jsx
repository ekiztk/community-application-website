import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuestionAnswer, changeQuestionOptions } from 'store';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';

const MultipleChoiceAnswer = ({ question, showEdit }) => {
  const dispatch = useDispatch();
  const options = useSelector(
    (state) => state.application.data.questions[question.id]?.options
  );

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

  function handleSaveAnswer(e) {
    dispatch(setQuestionAnswer({ id: question.id, answer: e.target.value }));
  }
  //console.log(options);

  const addRadioOption = () => {
    return (
      <div
        onClick={handleAddRadio}
        className="flex flex-row justify-start items-center gap-x-2 "
      >
        <AddIcon fontSize="medium" />
        <Typography variant="subtitle1" color="initial">
          {' '}
          Add Option
        </Typography>
      </div>
    );
  };

  //answer'ı kaydediyor
  if (!showEdit) {
    return (
      <div className="flex flex-col gap-x-2 gap-y-2 justify-start items-start max-w-[80%]">
        {options?.length > 0 &&
          options.map((option, index) => {
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
                  onChange={handleSaveAnswer}
                />
                <label
                  className="dark:text-com-primary-100"
                  htmlFor={`o-${question.id}-${index}`}
                >
                  {option}
                </label>
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-x-2 gap-y-2 justify-start items-start max-w-[80%]">
        {options?.length > 0 &&
          options.map((option, index) => {
            return (
              <div
                key={index}
                className="flex flex-row justify-start items-center gap-x-2"
              >
                <input type="radio" className="w-4 h-4 inline" disabled />
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
                    dark:text-com-primary-100  
                    dark:bg-com-surface-200
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    "
                  placeholder="Option text..."
                  value={option}
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
