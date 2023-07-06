import ModalHeader from 'components/modal/ModalHeader';
import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import ApplicationHeader from 'components/ui/application/ApplicationHeader';
import QuestionBox from 'components/ui/question/QuestionBox';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ResponseDetail = ({ data, close }) => {
  const token = useSelector((state) => state.auth.token);
  const [isSendingResponse, setIsSendingResponse] = useState(false);
  const [sendingResponseError, setSendingResponseError] = useState(null);

  const handleUpdateStatus = async (status) => {
    try {
      setIsSendingResponse(true);
      toast.loading('Please wait...', {
        toastId: 'updateMessage',
      });
      //send the response
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/responses/${data?.id}`,
        {
          status,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.update('updateMessage', {
        render: `The response has been ${status.toUpperCase()}.`,
        type: 'success',
        isLoading: false,
        autoClose: true,
      });
      close();
    } catch (error) {
      setSendingResponseError(error);
      toast.update('updateMessage', {
        render: error?.response?.data?.message || error?.message,
        type: 'error',
        isLoading: false,
        autoClose: true,
      });
    } finally {
      setIsSendingResponse(false);
    }
  };

  return (
    <>
      <ModalHeader title={` ${data?.user?.name}'s Response`} />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        gap={2}
        className="py-2 md:py-4 max-h-[72vh]"
        overflow="auto"
      >
        <ApplicationHeader application={data?.application} />
        {data?.answers &&
          data.answers.map((q, index) => {
            return <QuestionBox key={q.id} question={q} disabled />;
          })}
      </Box>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        className="py-2 md:py-4"
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => handleUpdateStatus('approved')}
          disabled={isSendingResponse}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleUpdateStatus('rejected')}
          disabled={isSendingResponse}
        >
          Reject
        </Button>
      </Stack>
    </>
  );
};

export default ResponseDetail;
