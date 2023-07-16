import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Tooltip, IconButton, Chip } from '@mui/material';
import useFetch from 'hooks/useFetch';
import Loading from 'components/ui/Loading';
import PreviewIcon from '@mui/icons-material/Preview';
import { useState } from 'react';
import { createModal } from 'hooks/modal';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import Navbar from 'components/ui/Navbar';

const MyResponses = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const [pageSize, setPageSize] = useState(5);

  const { data, loading, error, reFetch } = useFetch({
    url: `${import.meta.env.VITE_API_URL}/users/${user?.id}/responses`,
    token,
  });

  if (loading || error) {
    return <Loading loading={loading} error={error?.message} />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Responses</title>
      </Helmet>
      <Navbar />
      <Box className="mx-2 mt-4 md:mx-12 flex justify-center items-center max-h-[92vh]">
        {data?.data?.data.length > 0 ? (
          <DataGrid
            rowSelection={false}
            loading={loading}
            rows={data?.data?.data || []}
            columns={[
              {
                field: 'createdAt',
                headerName: 'Creation Date',
                flex: 0.8,
                renderCell: ({ row }) =>
                  format(new Date(Date.parse(row?.createdAt)), 'MM/dd/yyyy'),
              },
              {
                field: 'status',
                headerName: 'Status',
                sortable: false,
                flex: 0.5,
                renderCell: ({ row }) => (
                  <Chip
                    label={row?.status?.toUpperCase()}
                    color="warning"
                    variant="filled"
                  />
                ),
              },
              {
                field: 'detail',
                headerName: 'Detail',
                sortable: false,
                flex: 0.4,
                renderCell: ({ row }) => (
                  <Tooltip title="Detail">
                    <IconButton
                      size="large"
                      color="primary"
                      aria-label="responseDetail"
                      onClick={() => {
                        createModal('responseDetail', {
                          ...row,
                          readOnly: true,
                        });
                      }}
                    >
                      <PreviewIcon />
                    </IconButton>
                  </Tooltip>
                ),
              },
            ]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20, 30]}
            pagination
          />
        ) : (
          <Typography textAlign="center" variant="h5">
            You have no any response.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default MyResponses;
