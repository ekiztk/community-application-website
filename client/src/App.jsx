import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { darkModeIcon, lightModeIcon } from './assets/img';
import { useModals } from 'hooks/modal';
import Modal from 'modals/Modal';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
//edit/apply sayfalarına bildirimler eklendi

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
    element: <Applications showEdit />,
  },
  {
    path: '/applications/edit/:applicationId',
    element: <EditApplication />,
  },
  {
    path: '/applications/:applicationSlug',
    element: <ApplyApplication />,
  },
  {
    path: '/applications/:applicationId/responses',
    element: <ApplicationResponses />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
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
    </>
  );
}

export default App;
