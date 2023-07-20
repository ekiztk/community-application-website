import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { darkModeIcon, lightModeIcon } from './assets/img';
import { useModals } from 'hooks/modal';
import Modal from 'modals/Modal';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landing from 'pages/Landing';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Applications from 'pages/Applications';
import EditApplication from 'pages/EditApplication';
import ApplyApplication from 'pages/ApplyApplication';
import Dashboard from 'pages/dashboard/Dashboard';
import ApplicationResponses from 'pages/ApplicationResponses';
import UserList from 'pages/dashboard/UserList';
import UpdateProfile from 'pages/UpdateProfile';
import MyResponses from 'pages/MyResponses';
import PrivateRoute from 'components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/signup',
    element: <Signup />,
  },
  {
    path: '/applications',
    element: <Applications />,
  },
  {
    path: '/applications/edit/:applicationId',
    element: (
      <PrivateRoute requiredPermissions={['editApplication']}>
        <EditApplication />
      </PrivateRoute>
    ),
  },
  {
    path: '/applications/:applicationSlug',
    element: (
      <PrivateRoute>
        <ApplyApplication />
      </PrivateRoute>
    ),
  },
  {
    path: '/applications/:applicationId/responses',
    element: (
      <PrivateRoute>
        <ApplicationResponses />
      </PrivateRoute>
    ),
  },
  {
    path: '/profile/update/:userId',
    element: (
      <PrivateRoute>
        <UpdateProfile />
      </PrivateRoute>
    ),
  },
  {
    path: 'profile/myResponses',
    element: (
      <PrivateRoute>
        <MyResponses />
      </PrivateRoute>
    ),
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: 'userList',
        element: <UserList />,
      },
    ],
  },
]);

//Theme settings
const light = {
  palette: {
    mode: 'light',
  },
};

const dark = {
  palette: {
    mode: 'dark',
  },
};

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkTheme, setIsDarkTheme] = useState(prefersDarkMode || false);
  const modals = useModals();

  // This function is triggered when the Switch component is toggled
  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <>
      <HelmetProvider>
        <ThemeProvider
          theme={isDarkTheme ? createTheme(dark) : createTheme(light)}
        >
          <CssBaseline />
          <RouterProvider router={router} />
          <>
            {modals.length > 0 && <Modal />}
            <div
              className="fixed cursor-pointer z-50 bottom-2 right-2 h-10 w-10"
              onClick={changeTheme}
            >
              {isDarkTheme ? (
                <img src={lightModeIcon} />
              ) : (
                <img src={darkModeIcon} />
              )}
            </div>
          </>
        </ThemeProvider>
        <ToastContainer
          position="top-right"
          pauseOnHover
          hideProgressBar={false}
          autoClose={4000}
          theme={isDarkTheme ? 'dark' : 'light'}
        />
      </HelmetProvider>
    </>
  );
}

export default App;
