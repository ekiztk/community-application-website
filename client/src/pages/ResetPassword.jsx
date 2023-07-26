import SEO from 'components/SEO';
import React, { useState } from 'react';
import * as yup from 'yup';
import { Paper, TextField, Button, Typography, Stack } from '@mui/material';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const passwordsSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required!')
    .min(8, 'Password must have at least 8 characters!'),
  passwordConfirm: yup
    .string()
    .required('Password confirm is required!')
    .oneOf([yup.ref('password')], 'Passwords does not match!'),
});

const initialValuesPasswords = {
  password: '',
  passwordConfirm: '',
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [isSendingResponse, setIsSendingResponse] = useState(false);

  const handleNewPasswordSubmit = async (values, onSubmitProps) => {
    try {
      setIsSendingResponse(true);
      toast.loading('Please wait...', {
        toastId: 'rpMessage',
      });
      //send the response
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/ResetPassword/${token}`,
        values
      );
      toast.update('rpMessage', {
        render: 'You password has been updated.',
        type: 'success',
        isLoading: false,
        autoClose: true,
      });
      navigate('/auth/login');
    } catch (error) {
      toast.update('rpMessage', {
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
        title="Reset Password"
        description="desc"
        name="Company name."
        type="article"
      />
      <Paper
        elevation={12}
        className="flex flex-col gap-2 items-center min-w-[92%] md:min-w-[32%] justify-center p-2 md:p-12"
      >
        <Typography variant="h3" className="mb-4 md:mb-8">
          Reset your password.
        </Typography>
        <Typography variant="body1">
          Please enter your new password below.
        </Typography>
        <Formik
          onSubmit={handleNewPasswordSubmit}
          initialValues={initialValuesPasswords}
          validationSchema={passwordsSchema}
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
                  id="password"
                  name="password"
                  label="User Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  margin="normal"
                />
                <TextField
                  id="passwordConfirm"
                  name="passwordConfirm"
                  label="Confirm User Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.passwordConfirm}
                  error={
                    Boolean(touched.passwordConfirm) &&
                    Boolean(errors.passwordConfirm)
                  }
                  helperText={touched.passwordConfirm && errors.passwordConfirm}
                  margin="normal"
                />
                <Button
                  disabled={isSendingResponse}
                  type="submit"
                  variant="contained"
                  color="success"
                >
                  Save
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  );
}
