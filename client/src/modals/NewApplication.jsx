import { useEffect, useState } from 'react';
import ModalHeader from 'components/modal/ModalHeader';
import { Button, TextField, Stack, Typography } from '@mui/material';
import { createApplication } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import de from 'date-fns/locale/de';
import { toast } from 'react-toastify';

const applicationSchema = yup.object().shape({
  name: yup.string().required('Required!'),
  description: yup.string().required('Required!'),
  startDate: yup.date().required('Required!'),
  deadlineDate: yup.date().required('Required!'),
});

const initialValuesApplication = {
  name: '',
  description: '',
  startDate: new Date(),
  deadlineDate: new Date(),
};

const CreateNewApplication = ({ data, close }) => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const { isLoading, idOfCreatedApplication } = useSelector((state) => ({
    isLoading: state.application.isLoading,
    idOfCreatedApplication: state.application.data.id,
  }));

  const handleFormSubmit = async (values, onSubmitProps) => {
    toast.loading('Please wait...', {
      toastId: 'naMessage',
    });
    dispatch(createApplication({ application: values, token }))
      .unwrap()
      .then((res) => {
        toast.update('naMessage', {
          render: 'The application has been created successfully.',
          type: 'success',
          isLoading: false,
          autoClose: true,
        });
        close();
        //navigate(`/applications/edit/${idOfCreatedApplication}`);
      })
      .catch((error) => {
        toast.update('naMessage', {
          render: error?.response?.data?.message || error?.message,
          type: 'error',
          isLoading: false,
          autoClose: true,
        });
      });
  };

  return (
    <>
      <ModalHeader title="Create New Application" />
      <Stack alignItems="center" spacing={2} direction="column" padding={2}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesApplication}
          validationSchema={applicationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack alignItems="center" spacing={4} direction="column">
                <TextField
                  id="name"
                  name="name"
                  label="Application Name"
                  type="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  fullWidth
                />
                <TextField
                  id="description"
                  name="description"
                  label="Application Description"
                  type="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  fullWidth
                />
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={de}
                >
                  <DatePicker
                    label="Start Date"
                    id="startDate"
                    name="startDate"
                    value={values.startDate}
                    onChange={(date) => setFieldValue('startDate', date)}
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
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Create
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Stack>
    </>
  );
};

export default CreateNewApplication;
