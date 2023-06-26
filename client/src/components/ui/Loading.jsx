import React from 'react';
import { CircularProgress, Alert, Container } from '@mui/material';

const Loading = ({ loading, error, className }) => {
  return (
    <Container className={'text-center ' + className}>
      {loading && <CircularProgress />}
      {error && (
        <Alert variant="filled" severity="error">
          {error || 'An error occured!'}
        </Alert>
      )}
    </Container>
  );
};

export default Loading;
