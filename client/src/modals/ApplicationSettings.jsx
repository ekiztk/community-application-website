import axios from 'axios';
import { Box, TextField, Button, Typography, Stack } from '@mui/material';
import ModalHeader from 'components/modal/ModalHeader';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateApplication, removeApplication } from 'store';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import de from 'date-fns/locale/de';

//datepicker çalışmıyor

const ApplicationSettings = ({ data, close }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingError, setUpdatingError] = useState(null);

  const [name, setName] = useState(data.name || '');
  const [startDate, setStartDate] = useState(new Date(data.startDate));
  const [deadlineDate, setDeadlineDate] = useState(new Date(data.deadlineDate));

  const [isRemoving, setIsRemoving] = useState(false);
  const [removingError, setRemovingError] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const handleUpdateApplication = () => {
    setIsUpdating(true);
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/applications/${data.id}`,
        { name, startDate, deadlineDate },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert('Updated.');
        dispatch(updateApplication({ name, startDate, deadlineDate }));
        close();
      })
      .catch((err) => setUpdatingError(err))
      .finally(() => setIsUpdating(false));
  };

  const handleDeleteApplication = () => {
    setIsRemoving(true);
    dispatch(removeApplication({ id: data.id, token: token }))
      .unwrap()
      .then(() => {
        alert('removed');
        close();
        //navigate('/applications/edit', { replace: true });
      })
      .catch((err) => setRemovingError(err))
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
          />
          <DatePicker
            label="Deadline Date"
            id="deadlineDate"
            name="deadlineDate"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
            minDate={new Date()}
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
          <Button
            loading={isRemoving}
            onClick={handleDeleteApplication}
            variant="contained"
            color="error"
          >
            <DeleteIcon />
          </Button>
        </Box>
        <Button
          loading={isUpdating}
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
