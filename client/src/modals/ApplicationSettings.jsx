import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';
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
  const [startDate, setStartDate] = useState(data.startDate || new Date());
  const [deadlineDate, setDeadlineDate] = useState(
    data.deadlineDate || new Date()
  );

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
      <div className="flex flex-col justify-center items-center p-4 md:px-8">
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
            value={values.startDate}
            onChange={(date) => {
              console.log(date);
              setFieldValue('startDate', date);
            }}
            minDate={new Date()}
          />
          <DatePicker
            label="Deadline Date"
            id="deadlineDate"
            name="deadlineDate"
            value={values.deadlineDate}
            onChange={(date) => setFieldValue('deadlineDate', date)}
            minDate={new Date()}
          />
        </LocalizationProvider>
        <div className="flex flex-col border-gray-500 border-solid border-2 p-2 my-2">
          <p>
            Please write down the name of the application to delete it
            permamently.
          </p>
          <Button
            loading={isRemoving}
            onClick={handleDeleteApplication}
            variant="contained"
            color="error"
          >
            <DeleteIcon />
          </Button>
        </div>
        <Button
          loading={isUpdating}
          onClick={handleUpdateApplication}
          variant="contained"
          color="success"
        >
          Update
        </Button>
      </div>
    </>
  );
};

export default ApplicationSettings;
