import {
  TextField,
  Button,
  Box,
  Typography,
  Stack,
  Divider,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import { profileImage } from 'assets/img';
import axios from 'axios';
import Loading from 'components/ui/Loading';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Navbar from 'components/ui/Navbar';
import { toast } from 'react-toastify';
import { setLogin } from 'store';
import { Helmet } from 'react-helmet';

const profileSchema = yup.object().shape({
  name: yup.string().min(4, 'Too Short!').required('Name is required!'),
  email: yup.string().email('Invalid Email!').required('Email is required!'),
  photo: yup.string(),
});

const securitySchema = yup.object().shape({
  passwordCurrent: yup
    .string()
    .required('Your current password is required!')
    .min(8, 'Password must have at least 8 characters'),
  password: yup
    .string()
    .required('Password is required!')
    .min(8, 'Password must have at least 8 characters'),
  passwordConfirm: yup
    .string()
    .required('Password confirm is required!')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
});

const initialValuesSecurity = {
  password: '',
  passwordConfirm: '',
  passwordCurrent: '',
};

//profil resmini formda değişince değiştirme kaldı
const UpdateProfile = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const [isSendingResponse, setIsSendingResponse] = useState(false);
  const [sendingResponseError, setSendingResponseError] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data: response } = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(
          setLogin({
            user: response.data.data,
            token: token,
          })
        );
      } catch (error) {
        setLoadingError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProfileFormSubmit = async (values, onSubmitProps) => {
    setIsSendingResponse(true);
    toast.loading('Please wait...', {
      toastId: 'submitProfileMessage',
    });
    try {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      formData.append('photo', values.photo.name);
      //send the response
      const { data: response } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/updateMe`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(
        setLogin({
          user: response.data.user,
          token: token,
        })
      );
      toast.update('submitProfileMessage', {
        render: 'Your profile has been updated.',
        type: 'success',
        isLoading: false,
        autoClose: true,
      });
    } catch (error) {
      setSendingResponseError(error);
      toast.update('submitProfileMessage', {
        render: error?.response?.data?.message || error?.message,
        type: 'error',
        isLoading: false,
        autoClose: true,
      });
    } finally {
      setIsSendingResponse(false);
    }
  };

  const handleUpdateMyPassword = async (values, onSubmitProps) => {
    setIsSendingResponse(true);
    toast.loading('Please wait...', {
      toastId: 'updatePasswordMessage',
    });
    try {
      const { data: response } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/updateMyPassword`,
        {
          passwordCurrent: values.passwordCurrent,
          password: values.password,
          passwordConfirm: values.passwordConfirm,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(
        setLogin({
          user: response.data.user,
          token: response.token,
        })
      );
      toast.update('updatePasswordMessage', {
        render: 'Your password has been updated.',
        type: 'success',
        isLoading: false,
        autoClose: true,
      });
    } catch (error) {
      setSendingResponseError(error);
      toast.update('updatePasswordMessage', {
        render: error?.response?.data?.message || error?.message,
        type: 'error',
        isLoading: false,
        autoClose: true,
      });
    } finally {
      setIsSendingResponse(false);
    }
  };

  const hiddenPhotoInput = useRef(null);

  const handleUploadPhotoClick = (event) => {
    hiddenPhotoInput.current.click();
  };

  if (isLoading || loadingError) {
    return <Loading loading={isLoading} error={loadingError?.message} />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Profile</title>
      </Helmet>
      <Navbar />
      <div className="relative w-full h-full flex flex-col gap-2 p-2 md:p-4 items-center justify-start">
        <Divider flexItem>
          <Chip color="primary" label="Profile" />
        </Divider>
        <Formik
          onSubmit={handleProfileFormSubmit}
          initialValues={user}
          validationSchema={profileSchema}
          enableReinitialize={true}
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
              <Stack
                alignItems="center"
                spacing={2}
                marginBottom={2}
                direction="column"
              >
                <Box
                  alignContent="center"
                  justifyContent="center"
                  display="flex"
                  flexDirection="column"
                >
                  <Avatar
                    alt={user?.name}
                    src={`${
                      import.meta.env.VITE_BASE_API_URL
                    }/assets/img/users/${user?.photo}`}
                    sx={{ width: 96, height: 96 }}
                  />
                  <Tooltip title="Update Photo">
                    <IconButton
                      size="large"
                      color="inherit"
                      aria-label="updatePhoto"
                      onClick={handleUploadPhotoClick}
                    >
                      <InsertPhotoIcon />
                    </IconButton>
                  </Tooltip>
                  <input
                    ref={hiddenPhotoInput}
                    type="file"
                    name="photo"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      setFieldValue('photo', e.target.files[0]);
                    }}
                  />
                </Box>

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
                />
                <Box component="div" className="text-center">
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={isSendingResponse}
                  >
                    Update Profile
                  </Button>
                </Box>
              </Stack>
            </form>
          )}
        </Formik>
        <Divider flexItem>
          <Chip color="primary" label="Security" />
        </Divider>
        <Formik
          onSubmit={handleUpdateMyPassword}
          initialValues={initialValuesSecurity}
          validationSchema={securitySchema}
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
                  id="passwordCurrent"
                  name="passwordCurrent"
                  label="Current Password"
                  type="password"
                  value={values.passwordCurrent}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.passwordCurrent) &&
                    Boolean(errors.passwordCurrent)
                  }
                  helperText={touched.passwordCurrent && errors.passwordCurrent}
                />
                <TextField
                  id="password"
                  name="password"
                  label="New Password"
                  type="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  id="passwordConfirm"
                  name="passwordConfirm"
                  label="Confirm New Password"
                  type="password"
                  value={values.passwordConfirm}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.passwordConfirm) &&
                    Boolean(errors.passwordConfirm)
                  }
                  helperText={touched.passwordConfirm && errors.passwordConfirm}
                />
                <Box component="div" className="text-center">
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={isSendingResponse}
                  >
                    Update Password
                  </Button>
                </Box>
              </Stack>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default UpdateProfile;
