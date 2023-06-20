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

const applicationSchema = yup.object().shape({
  name: yup.string().required('required'),
  description: yup.string().required('required'),
  startDate: yup.date().required('required'),
  deadlineDate: yup.date().required('required'),
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
    console.log(values);
    dispatch(createApplication({ application: values, token }))
      .unwrap()
      .then((res) => {
        alert('success');
        //navigate(`/applications/edit/${idOfCreatedApplication}`);
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };

  return (
    <>
      <ModalHeader title="Create New Application" />
      <div className="flex flex-col justify-center items-center p-4 md:px-8">
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
                  loading={isLoading}
                >
                  Create
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default CreateNewApplication;
