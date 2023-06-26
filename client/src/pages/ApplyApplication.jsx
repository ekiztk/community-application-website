import React, { useEffect, useState } from 'react';
import { Box, Typography, Pagination, Button } from '@mui/material';
import ApplicationHeader from 'components/ui/application/ApplicationHeader';
import QuestionBox from 'components/ui/question/QuestionBox';
import { useThunk } from 'hooks/useThunk';
import { fetchApplication } from 'store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from 'components/ui/Loading';
import { Helmet } from 'react-helmet';
import usePagination from 'hooks/usePagination';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import asyncSome from 'utils/asyncSome';
//bildirim gösterilmesi yapılacak

const ApplyApplication = () => {
  const [doFetchApplication, isLoading, loadingError] =
    useThunk(fetchApplication);

  const { token, user, application } = useSelector((state) => ({
    token: state.auth.token,
    user: state.auth.user,
    application: state.application.data,
  }));

  const { applicationSlug } = useParams();

  const [isSendingResponse, setIsSendingResponse] = useState(false);
  const [sendingResponseError, setSendingResponseError] = useState(null);

  useEffect(() => {
    doFetchApplication({ slug: applicationSlug });
  }, [doFetchApplication, applicationSlug]);

  const [
    pageSize,
    currentPage,
    totalPageCount,
    handlePageChange,
    sliceCurrentPageRecords,
  ] = usePagination({
    totalCount: application?.questions?.length,
    pageSize: 2,
  });

  const handleSendResponse = async (event) => {
    setIsSendingResponse(true);
    try {
      if (!user) throw 'You must log in to send response!';
      //check if there is an unanswered required question
      const resultOfCondition = await asyncSome(
        application.questions,
        async (question) => {
          return (
            (question.required === false &&
              typeof question.answer === 'string' &&
              question.answer?.trim().length === 0) ||
            typeof question.answer !== 'string'
          );
        }
      );
      if (resultOfCondition) throw 'All required questions must be answered!';
      //check if user has active pending response
      await axios.post(
        `${import.meta.env.VITE_API_URL}/responses/hasResponse`,
        {
          application: application.id,
          user: user.id,
        }
      );
      //send the response
      await axios.post(
        `${import.meta.env.VITE_API_URL}/responses/`,
        {
          application: application.id,
          user: user.id,
          answers: application.questions,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log(error);
      setSendingResponseError(error);
    } finally {
      setIsSendingResponse(false);
    }
  };

  if (isLoading || loadingError) {
    return (
      <Loading
        className="py-4"
        loading={isLoading}
        error={loadingError?.message}
      />
    );
  }

  console.log(application);

  return (
    <Box sx={{ height: '100%' }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Apply for {application.name}</title>
      </Helmet>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        gap={4}
        className="py-4"
      >
        <ApplicationHeader application={application} />
        {application?.questions?.length > 0 ? (
          sliceCurrentPageRecords(application?.questions).map((q, index) => {
            return <QuestionBox key={q.id} question={q} />;
          })
        ) : (
          <Typography variant="h5" alignContent="center">
            The application has no any question, please let us know.
          </Typography>
        )}
        <Pagination
          count={totalPageCount}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
        {Math.ceil(totalPageCount / pageSize) !== currentPage && (
          <Button
            onClick={handleSendResponse}
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            disabled={isSendingResponse}
          >
            Send
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ApplyApplication;
