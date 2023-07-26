import SEO from 'components/SEO';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Paper, TextField, Button, Typography, Stack } from '@mui/material';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';

const emailSchema = yup.object().shape({
  email: yup.string().email('Invalid Email!').required('Email is required!'),
});

const initialValuesEmail = {
  email: '',
};

export default function ForgotPassword() {
  const [isSendingResponse, setIsSendingResponse] = useState(false);

  const handleEmailSubmit = async (values, onSubmitProps) => {
    try {
      setIsSendingResponse(true);
      toast.loading('Please wait...', {
        toastId: 'fpMessage',
      });
      //send the response
      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/forgotPassword`,
        values
      );
      onSubmitProps.resetForm();
      toast.update('fpMessage', {
        render: 'The email has been sent. The link is valid for 10 minutes.',
        type: 'success',
        isLoading: false,
        autoClose: true,
      });
    } catch (error) {
      toast.update('fpMessage', {
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
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <SEO
        title="Forgot Password"
        description="desc"
        name="Company name."
        type="article"
      />
      <Paper
        elevation={12}
        className="flex flex-col gap-2 items-center min-w-[92%] md:min-w-[32%] justify-center p-2 md:p-12"
      >
        <Typography variant="h3" className="mb-4 md:mb-8">
          Forgot your password?
        </Typography>
        <Typography variant="body1">
          Please enter mail address of your account.
        </Typography>
        <Formik
          onSubmit={handleEmailSubmit}
          initialValues={initialValuesEmail}
          validationSchema={emailSchema}
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
              <Stack alignItems="center" spacing={2} direction="column">
                <TextField
                  id="email"
                  name="email"
                  label="User Mail"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  margin="normal"
                />
                <Button
                  disabled={isSendingResponse}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Send
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  );
}
