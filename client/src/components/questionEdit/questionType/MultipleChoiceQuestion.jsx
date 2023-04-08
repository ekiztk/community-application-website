import React from "react";
import { RxCross2, RxPlus } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { changeQuestionOptions, setAnswer } from "../../../store";

const MultipleChoiceQuestion = ({ qIndex, isEditing }) => {
  const dispatch = useDispatch();
  const options = useSelector(
    (state) => state.application.data.questions[qIndex].options
  );

  function handleAddRadio(e) {
    e.preventDefault();
    dispatch(
      changeQuestionOptions({
        index: qIndex,
        options: [...options, "Option text..."],
      })
    );
  }

  function handleRemoveRadio(e, index) {
    e.preventDefault();
    dispatch(
      changeQuestionOptions({
        index: qIndex,
        options: [...options.slice(0, index).concat(options.slice(index + 1))],
      })
    );
  }

  function handleOptionTextChange(e, index) {
    const arr = [...options];
    arr[index] = e.target.value;
    dispatch(changeQuestionOptions({ index: qIndex, options: [...arr] }));
  }

  function handleSaveAnswer(e) {
    dispatch(setAnswer({ index: qIndex, answer: e.target.value }));
  }
  //console.log(options);

  const addRadioOption = () => {
    return (
      <div
        onClick={handleAddRadio}
        className="flex flex-row justify-start items-center gap-x-2 "
      >
        <RxPlus className="object-center h-4 w-4" />
        <label
          className="mt-px text-sm text-gray-600  inline-block pl-[0.15rem] "
          htmlFor="addRadio"
        >
          Add Option
        </label>
      </div>
    );
  };

  //answer'ı kaydediyor
  if (!isEditing) {
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
                  name={`o-for-${qIndex}`}
                  type="radio"
                  className="w-4 h-4 inline"
                  value={option}
                  onChange={handleSaveAnswer}
                />
                <label htmlFor={`o-${qIndex}-${index}`}>{option}</label>
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
                <RxCross2
                  onClick={(e) => {
                    handleRemoveRadio(e, index);
                  }}
                  className="object-center h-8 w-8"
                />
              </div>
            );
          })}
        {addRadioOption()}
      </div>
    </>
  );
};

export default MultipleChoiceQuestion;
