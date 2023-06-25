import React from 'react';
import { CircularProgress, Alert, Container } from '@mui/material';

const Loading = ({ loading, error }) => {
  return (
    <Container className="text-center">
      {loading && <CircularProgress />}
      {error && (
        <Alert variant="filled" severity="error">
          {error.message}
        </Alert>
      )}
    </Container>
  );
};

export default Loading;
