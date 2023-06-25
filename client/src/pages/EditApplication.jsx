import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useThunk } from 'hooks/useThunk';
import { fetchApplication, addQuestion } from 'store';
import QuestionBox from 'components/ui/question/QuestionBox';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ApplicationEditBar from 'components/ui/application/ApplicationEditBar';
import ApplicationHeader from 'components/ui/application/ApplicationHeader';
import { Helmet } from 'react-helmet';

const EditApplication = () => {
  const [doFetchApplication, isLoading, loadingError] =
    useThunk(fetchApplication);

  const { applicationId } = useParams();

  useEffect(() => {
    doFetchApplication({ id: applicationId });
  }, [doFetchApplication, applicationId]);

  const dispatch = useDispatch();
  const application = useSelector((state) => state.application.data);
  console.log(application);

  const handleAddQuestionBox = () => {
    dispatch(
      addQuestion({
        id: uuidv4(),
        text: 'Question Text...',
        type: 'multipleChoice',
        options: ['Option Text...'],
        active: true,
        required: false,
      })
    );
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit {application.name}</title>
      </Helmet>
      <ApplicationEditBar />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        gap={4}
        className="py-4"
      >
        <ApplicationHeader application={application} showEdit />
        {application?.questions?.length > 0 ? (
          application?.questions.map((q, index) => {
            return <QuestionBox key={q.id} question={q} showEdit />;
          })
        ) : (
          <Typography variant="h5" alignContent="center">
            The application has no any question, please click plus to add a new
            question.
          </Typography>
        )}
        <AddBoxIcon
          className="text-green-500 mt-4"
          fontSize="large"
          onClick={handleAddQuestionBox}
        />
      </Box>
    </Box>
  );
};

export default EditApplication;
