import { useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from 'store';
import { mainLogo } from 'assets/img';
import { Helmet } from 'react-helmet';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Stack,
} from '@mui/material';

const registerSchema = yup.object().shape({
  name: yup.string().min(4, 'Too Short!').required('Name is required!'),
  email: yup.string().email('Invalid Email!').required('Email is required!'),
  password: yup
    .string()
    .required('Password is required!')
    .min(8, 'Password must have at least 8 characters'),
  passwordConfirm: yup
    .string()
    .required('Password confirm is required!')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
});

const initialValuesRegister = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      `${import.meta.env.VITE_API_URL}/users/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      }
    );
    const savedUser = await savedUserResponse.json();
    //onSubmitProps.resetForm();
    if (savedUser) {
      dispatch(
        setLogin({
          user: savedUser.data.user,
          token: savedUser.token,
        })
      );
      navigate('/');
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
  };

  useEffect(() => {
    if (user && isAuth) {
      return navigate('/');
    }
  }, [user, isAuth, navigate]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Signup</title>
      </Helmet>
      <Paper
        elevation={12}
        className="flex flex-col items-center min-w-[92%] md:min-w-[32%] justify-center p-2 md:p-12"
      >
        <img
          className="text-4xl lg:text-6xl object-contain max-h-16"
          src={mainLogo}
          alt="logo"
        />
        <Typography variant="h3" className="mb-4 md:mb-8">
          Welcome !
        </Typography>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValuesRegister}
          validationSchema={registerSchema}
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
                  label="User Name"
                  type="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  margin="normal"
                />
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
                <Box component="div" className="text-center">
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Register
                  </Button>
                  <Typography variant="body2" className="pt-4 mb-0">
                    {'Have an account? '}
                    <Link
                      to="/auth/login"
                      className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
                    >
                      Log In
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

export default Signup;
