import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
} from '@mui/material';
import ModalHeader from 'components/modal/ModalHeader';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { updateApplication, removeApplication } from 'store';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import de from 'date-fns/locale/de';
import { toast } from 'react-toastify';

const ApplicationSettings = ({ data, close }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingError, setUpdatingError] = useState(null);

  const [name, setName] = useState(data.name || '');
  const [startDate, setStartDate] = useState(new Date(data.startDate));
  const [deadlineDate, setDeadlineDate] = useState(new Date(data.deadlineDate));
  const [nameValidation, setNameValidation] = useState('');

  const [isRemoving, setIsRemoving] = useState(false);
  const [removingError, setRemovingError] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleUpdateApplication = () => {
    setIsUpdating(true);
    toast.loading('Please wait...', {
      toastId: 'updateMessage',
    });
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/applications/${data.id}`,
        { name, startDate, deadlineDate },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        dispatch(updateApplication({ name, startDate, deadlineDate }));
        toast.update('updateMessage', {
          render: 'The application has been updated.',
          type: 'success',
          isLoading: false,
          autoClose: true,
        });
        close();
      })
      .catch((error) => {
        toast.update('updateMessage', {
          render: error?.response?.data?.message || error?.message,
          type: 'error',
          isLoading: false,
          autoClose: true,
        });
        setUpdatingError(error);
      })
      .finally(() => setIsUpdating(false));
  };

  const handleDeleteApplication = () => {
    setIsRemoving(true);
    toast.loading('Please wait...', {
      toastId: 'deleteMessage',
    });
    dispatch(removeApplication({ id: data.id, token: token }))
      .unwrap()
      .then(() => {
        toast.update('deleteMessage', {
          render: 'The application has been deleted.',
          type: 'success',
          isLoading: false,
          autoClose: true,
        });
        data.navigateAfterDeletion();
        close();
      })
      .catch((error) => {
        toast.update('deleteMessage', {
          render: error?.response?.data?.message || error?.message,
          type: 'error',
          isLoading: false,
          autoClose: true,
        });
        setRemovingError(error);
      })
      .finally(() => {
        setIsRemoving(false);
      });
  };

  return (
    <>
      <ModalHeader title="Settings" />
      <Stack alignItems="center" spacing={4} direction="column" padding={2}>
        <TextField
          id="name"
          name="name"
          label="Application Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
          <DatePicker
            label="Start Date"
            id="startDate"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            readOnly
            fullWidth
          />
          <DatePicker
            label="Deadline Date"
            id="deadlineDate"
            name="deadlineDate"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
            fullWidth
          />
        </LocalizationProvider>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="start"
          alignItems="center"
          sx={{ p: 1, border: '1px dashed grey' }}
        >
          <Typography variant="body2">
            Please write down the name of the application to delete it
            permamently.
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <TextField
              hiddenLabel={true}
              id="nameValidation"
              name="nameValidation"
              type="text"
              value={nameValidation}
              onChange={(e) => setNameValidation(e.target.value)}
              size="small"
            />
            <IconButton
              onClick={handleDeleteApplication}
              color="error"
              className="w-full"
              disabled={nameValidation.trim() === '' || nameValidation !== name}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Button
          disabled={isUpdating}
          onClick={handleUpdateApplication}
          variant="contained"
          color="success"
        >
          Update
        </Button>
      </Stack>
    </>
  );
};

export default ApplicationSettings;
