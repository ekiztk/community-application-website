import { Link, useSearchParams } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import { Button, Typography, Box } from '@mui/material';
import { createModal } from 'hooks/modal';
import Navbar from 'components/ui/Navbar';
import ApplicationBox from 'components/ui/application/ApplicationBox';
import Loading from 'components/ui/Loading';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SEO from 'components/SEO';

//yeni application için hata ve başarı mesajları ayarlanacak

const Applications = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, loading, error, reFetch } = useFetch({
    url: `${import.meta.env.VITE_API_URL}/applications`,
  });

  const user = useSelector((state) => state.auth.user);

  const [showEdit, setShowEdit] = useState(
    user?.role?.permissions?.some((value) => value === 'editApplication') ||
      false
  );

  if (loading || error) {
    return <Loading loading={loading} error={error?.message} />;
  }

  return (
    <>
      <SEO
        title="Applications"
        description="desc"
        name="Company name."
        type="article"
      />
      <Navbar />
      <Box className="relative p-4 md:p-8 h-full">
        <Typography variant="h2" component="h2" className="text-center">
          Applications
        </Typography>
        <Loading loading={loading} error={error?.message} />
        {showEdit && (
          <div className="w-full flex justify-center gap-2 md:gap-4 items-center p-2 md:p-8">
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                createModal('newApplication');
              }}
            >
              Create New
            </Button>
          </div>
        )}
        <div className="p-2 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-8">
          {
            <>
              {data?.data?.data?.length > 0 &&
                data?.data?.data.map((item) => {
                  const showResponse = item.collaborators.some(
                    (value) => value.id === user?.id
                  );
                  return (
                    <ApplicationBox
                      key={item.id}
                      item={item}
                      showEdit={showEdit}
                      showResponse={showEdit || showResponse}
                    />
                  );
                })}
            </>
          }
        </div>
      </Box>
    </>
  );
};

export default Applications;
