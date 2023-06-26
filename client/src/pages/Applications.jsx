import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useFetch from 'hooks/useFetch';
import { Button, Typography, Box } from '@mui/material';
import { createModal } from 'hooks/modal';
import Navbar from 'components/ui/Navbar';
import ApplicationBox from 'components/ui/application/ApplicationBox';
import Loading from 'components/ui/Loading';

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
        <Loading loading={loading} error={error?.message} />
        <div className="w-full flex justify-center gap-2 md:gap-4 items-center p-2 md:p-8">
          {true && (
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                createModal('createNewApplication');
              }}
            >
              Create New
            </Button>
          )}
        </div>
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
