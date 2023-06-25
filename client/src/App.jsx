import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { darkModeIcon, lightModeIcon } from './assets/img';
import { useModals } from 'hooks/modal';
import Modal from 'modals/Modal';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from 'pages/Landing';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Applications from 'pages/Applications';
import EditApplication from 'pages/EditApplication';
import ApplyApplication from 'pages/ApplyApplication';

//application edit sayfası yapılacak

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
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <RouterProvider router={router} />
      <>
        {modals.length > 0 && <Modal />}
        <div
          className="fixed cursor-pointer bottom-2 right-2 h-12 w-12"
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
  );
}

export default App;
