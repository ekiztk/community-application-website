import ModalHeader from 'components/modal/ModalHeader';
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

//eksik: active değeri hep true gidiyor
const UserDetail = ({ data, close }) => {
  const [isSendingResponse, setIsSendingResponse] = useState(false);
  const [sendingResponseError, setSendingResponseError] = useState(null);

  const [status, setStatus] = useState(data?.user?.active || false);

  const handleUpdateUser = async (status) => {
    try {
      setIsSendingResponse(true);
      toast.loading('Please wait...', {
        toastId: 'updateMessage',
      });
      //send the response
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${data?.user?.id}`,
        {
          active: Boolean(status),
        },
        { headers: { Authorization: `Bearer ${data?.token}` } }
      );
      toast.update('updateMessage', {
        render: `The user has been updated.`,
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
      <ModalHeader title={` ${data?.user?.name}'s Details`} />
      <Stack alignItems="center" spacing={4} direction="column" padding={2}>
        <TextField
          id="name"
          name="name"
          label="User Name"
          type="text"
          value={data?.user?.name}
          readOnly
        />

        <TextField
          id="email"
          name="email"
          label="User Email"
          type="email"
          value={data?.user?.email}
          readOnly
        />

        <FormControlLabel
          control={
            <Switch onChange={() => setStatus(!status)} checked={status} />
          }
          label="Is Active?"
        />

        <Button
          disabled={isSendingResponse}
          onClick={handleUpdateUser}
          variant="contained"
          color="success"
        >
          Update
        </Button>
      </Stack>
    </>
  );
};

export default UserDetail;
