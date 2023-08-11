import ModalHeader from 'components/modal/ModalHeader';
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  FormControl,
  FormControlLabel,
  Switch,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

//eksik: active değeri hep true gidiyor
const UserDetail = ({ data, close }) => {
  const [isSendingResponse, setIsSendingResponse] = useState(false);
  const [sendingResponseError, setSendingResponseError] = useState(null);

  const [status, setStatus] = useState(data?.user?.active || false);
  const [role, setRole] = useState(
    data?.user?.role?.id || '63e6db2b3cc793754b5f78fc'
  );

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
          role,
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
        <FormControl>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="63e6db2b3cc793754b5f78fc">User</MenuItem>
            <MenuItem value="64d59104b3f60ba42e44412b">Moderator</MenuItem>
            <MenuItem value="63ee455ae7689766578698e4">Master</MenuItem>
          </Select>
        </FormControl>

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
