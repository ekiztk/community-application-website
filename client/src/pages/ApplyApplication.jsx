import React, { useEffect, useState } from 'react';
import { Box, Typography, Pagination } from '@mui/material';
import ApplicationHeader from 'components/ui/application/ApplicationHeader';
import QuestionBox from 'components/ui/question/QuestionBox';
import { useThunk } from 'hooks/useThunk';
import { fetchApplication } from 'store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from 'components/ui/Loading';
import { Helmet } from 'react-helmet';

const ApplyApplication = () => {
  const [doFetchApplication, isLoading, loadingError] =
    useThunk(fetchApplication);

  const application = useSelector((state) => state.application.data);
  const { token, user } = useSelector((state) => ({
    token: state.auth.token,
    user: state.auth.user,
  }));
  const { applicationSlug } = useParams();

  const [isSendingResponse, setIsSendingResponse] = useState(false);
  const [sendingResponseError, setSendingResponseError] = useState(null);

  useEffect(() => {
    doFetchApplication({ slug: applicationSlug });
  }, [doFetchApplication, applicationSlug]);

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
        <Loading loading={isLoading} error={loadingError} />
        <ApplicationHeader application={application} />
        {application?.questions?.length > 0 ? (
          application?.questions.map((q, index) => {
            return <QuestionBox key={q.id} question={q} />;
          })
        ) : (
          <Typography variant="h5" alignContent="center">
            The application has no any question, please let us know.
          </Typography>
        )}
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
};

export default ApplyApplication;
