import React, { useEffect, useState, useId } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useThunk } from 'hooks/useThunk';
import { fetchApplication, addQuestion } from 'store';
import QuestionBox from 'components/ui/question/QuestionBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const EditApplication = () => {
  const [doFetchApplication, isLoading, loadingError] =
    useThunk(fetchApplication);

  const { applicationId } = useParams();

  useEffect(() => {
    doFetchApplication({ id: applicationId });
  }, [doFetchApplication, applicationId]);

  const dispatch = useDispatch();
  const application = useSelector((state) => state.application.data);
  const token = useSelector((state) => state.auth.token);
  console.log(application);

  const handleAddQuestionBox = () => {
    dispatch(
      addQuestion({
        id: uuidv4(),
        text: 'Question text...',
        type: 'multipleChoice',
        options: ['Option text...'],
        active: true,
        required: false,
      })
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
    >
      {application?.questions?.length > 0 ? (
        application?.questions.map((q, index) => {
          return <QuestionBox key={q.id} question={q} editable />;
        })
      ) : (
        <Typography variant="h5" alignContent="center" color="initial">
          The application has no any question, please click plus to add a new
          question.
        </Typography>
      )}
      <AddBoxIcon
        className="text-green-500"
        fontSize="large"
        onClick={handleAddQuestionBox}
      />
    </Box>
  );
};

export default EditApplication;
