import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from 'store';
import { useEffect, useState } from 'react';
import { mainLogo } from 'assets/img';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Stack,
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import SEO from 'components/SEO';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid Email!').required('Email is required!'),
  password: yup.string().required('Password is required!'),
});

const initialValuesLogin = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  const [isSendingResponse, setIsSendingResponse] = useState(false);

  const handleLoginFormSubmit = async (values, onSubmitProps) => {
    try {
      setIsSendingResponse(true);
      toast.loading('Please wait...', {
        toastId: 'loginMessage',
      });
      //send the response
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        values
      );
      onSubmitProps.resetForm();
      dispatch(
        setLogin({
          user: response.data.data.user,
          token: response.data.token,
        })
      );
      toast.update('loginMessage', {
        render: 'You are logged in.',
        type: 'success',
        isLoading: false,
        autoClose: true,
      });
    } catch (error) {
      toast.update('loginMessage', {
        render: error?.response?.data?.message || error?.message,
        type: 'error',
        isLoading: false,
        autoClose: true,
      });
    } finally {
      setIsSendingResponse(false);
    }
  };

  useEffect(() => {
    if (user && isAuth) {
      return navigate('/');
    }
  }, [user, isAuth, navigate]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <SEO
        title="Log In"
        description="desc"
        name="Company name."
        type="article"
      />
      <Paper
        elevation={12}
        className="flex flex-col gap-2 items-center min-w-[92%] md:min-w-[32%] justify-center p-2 md:p-12"
      >
        <img
          className="text-4xl lg:text-6xl object-contain max-h-16"
          src={mainLogo}
          alt="logo"
        />
        <Typography variant="h3" className="mb-4 md:mb-8">
          Welcome back!
        </Typography>

        <Formik
          onSubmit={handleLoginFormSubmit}
          initialValues={initialValuesLogin}
          validationSchema={loginSchema}
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

                <TextField
                  id="password"
                  name="password"
                  label="User Password"
                  type="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  margin="normal"
                />
                <Box component="div" className="text-center">
                  <Link
                    to="/auth/forgotPassword"
                    className="block mb-4 text-red-600 hover:text-red-700 focus:text-red-700 active:text-blue-800 duration-200 transition ease-in-out"
                  >
                    Forgot password?
                  </Link>
                  <Button
                    disabled={isSendingResponse}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Log In
                  </Button>
                  <Typography variant="body2" className="pt-4 mb-0">
                    {"Don't have an account? "}
                    <Link
                      to="/auth/signup"
                      className="text-green-600 hover:text-green-700 focus:text-green-700 transition duration-200 ease-in-out"
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Box>
              </Stack>
            </form>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

export default Login;
