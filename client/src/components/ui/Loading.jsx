import React from 'react';
import { CircularProgress, Alert, Container, Backdrop } from '@mui/material';

const Loading = ({ loading, error, className }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      className={className}
      open={loading || error ? true : false}
    >
      {loading && <CircularProgress color="inherit" />}
      {error && (
        <Alert variant="filled" severity="error">
          {error || 'An error occured!'}
        </Alert>
      )}
    </Backdrop>
  );
};

export default Loading;
