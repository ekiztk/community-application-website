import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useFetch from 'hooks/useFetch';
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Container,
} from '@mui/material';
import { createModal } from 'hooks/modal';
import Navbar from 'components/ui/Navbar';
import ApplicationBox from 'components/ui/ApplicationBox';

//pagination needed
const Applications = ({ showEdit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, loading, error, reFetch } = useFetch({
    url: `${import.meta.env.VITE_API_URL}/applications`,
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Applications</title>
      </Helmet>
      <Navbar />
      <Box className="relative p-4 md:p-8 h-full">
        <Typography variant="h1" component="h1" className="text-center">
          Applications
        </Typography>
        <div className="w-full flex justify-center gap-2 md:gap-4 items-center p-2 md:p-8">
          {/* <BiGridHorizontal className="h-12 w-12 cursor-pointer text-black dark:text-com-primary-500" />
          <BiListUl className="h-12 w-12 cursor-pointer text-black dark:text-com-primary-500" /> */}
          {true && (
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                createModal('createNewApplication');
              }}
            >
              CREATE NEW
            </Button>
          )}
        </div>
        <Container className="text-center">
          {loading && <CircularProgress />}
          {error && <Alert severity="error">{error.message}</Alert>}
        </Container>
        <div className="p-2 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-8">
          {
            <>
              {data?.data?.data?.length > 0 &&
                data?.data?.data.map((item) => (
                  <ApplicationBox
                    key={item.id}
                    item={item}
                    showEdit={showEdit}
                  />
                ))}
            </>
          }
        </div>
      </Box>
    </>
  );
};

export default Applications;
