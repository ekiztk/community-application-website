import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Tooltip, IconButton, Chip } from '@mui/material';
import useFetch from 'hooks/useFetch';
import Loading from 'components/ui/Loading';
import { useLocation, useParams } from 'react-router-dom';
import PreviewIcon from '@mui/icons-material/Preview';
import { useState } from 'react';
import { createModal } from 'hooks/modal';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

//burada da kullancıdı doğrulaması yapılacak '/:id/isCollaborator' ile
const ApplicationResponses = () => {
  const { applicationId } = useParams();
  const location = useLocation();
  const application = location.state;

  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);

  const [pageSize, setPageSize] = useState(5);

  const { data, loading, error, reFetch } = useFetch({
    url: `${
      import.meta.env.VITE_API_URL
    }/applications/${applicationId}/responses?status=pending`,
    token,
  });

  if (loading || error) {
    return <Loading loading={loading} error={error?.message} />;
  }

  return (
    <Box>
      <Typography variant="h3" component="h3" className="text-center">
        Responses of {application?.name}
      </Typography>
      <Box className="mx-2 mt-4 md:mx-12" height="80vh">
        <DataGrid
          rowSelection={false}
          loading={loading}
          rows={data?.data?.data || []}
          columns={[
            {
              field: 'user',
              headerName: 'User',
              sortable: false,
              flex: 1,
              renderCell: ({ row }) => (
                <Box display="flex" alignItems="center" justifyContent="center">
                  {row.user.name}
                </Box>
              ),
            },
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
                        application,
                        token: token,
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
      </Box>
    </Box>
  );
};

export default ApplicationResponses;
