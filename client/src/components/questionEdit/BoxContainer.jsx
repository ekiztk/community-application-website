import React from "react";
import QuestionBox from "components/questionEdit/QuestionBox";
import { HiOutlinePlus } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { addQuestion } from "../../store";
import HeaderBox from "./HeaderBox";

const BoxContainer = ({ editable }) => {
  const dispatch = useDispatch();
  const { questions } = useSelector((state) => ({
    questions: state.application.data.questions,
  }));

  const handleAddQuestionBox = () => {
    dispatch(
      addQuestion({
        text: "Question text...",
        type: "multipleChoice",
        options: ["Option text..."], //içeriğine bir bak
        active: true,
        required: false,
      })
    );
  };

  return (
    <div className="p-1 md:p-2 lg:p-4 flex flex-col gap-y-4 justify-start items-center w-full">
      <HeaderBox editable={editable || null} />
      {questions?.length > 0 ? (
        questions.map((q, index) => {
          return (
            <QuestionBox
              editable={editable || null}
              key={index}
              qIndex={index}
            />
          );
        })
      ) : (
        <h3 className="w-[80%] md:w-[80%] lg:w-[60%] text-center">
          {editable
            ? `The application has no any question, please click plus to add a new
          question.`
            : `The application has no any question, please let us know.`}
        </h3>
      )}
      {editable && (
        <div
          onClick={handleAddQuestionBox}
          className="w-[80%] md:w-[80%] lg:w-[60%] h-24 border-black border-2 border-dashed cursor-pointer flex items-center"
        >
          <HiOutlinePlus className="object-center h-12 w-12 mx-auto" />
        </div>
      )}
    </div>
  );
};

export default BoxContainer;
