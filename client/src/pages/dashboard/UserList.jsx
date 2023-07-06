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

const UserList = () => {
  const [pageSize, setPageSize] = useState(5);
  const token = useSelector((state) => state.auth.token);

  const { data, loading, error, reFetch } = useFetch({
    url: `${import.meta.env.VITE_API_URL}/users`,
    token,
  });

  if (loading || error) {
    return <Loading loading={loading} error={error?.message} />;
  }

  return (
    <Box>
      <Typography variant="h3" component="h3" className="text-left">
        User List
      </Typography>
      <Box className="overflow-x-auto" height="80vh">
        <DataGrid
          rowSelection={false}
          loading={loading}
          rows={data?.data?.data || []}
          columns={[
            {
              field: 'name',
              headerName: 'Name',
              flex: 1,
              renderCell: ({ row }) => (
                <Box display="flex" alignItems="center" justifyContent="center">
                  {row?.name}
                </Box>
              ),
            },
            {
              field: 'email',
              headerName: 'Email',
              flex: 0.8,
              renderCell: ({ row }) => (
                <Box display="flex" alignItems="center" justifyContent="center">
                  {row?.email}
                </Box>
              ),
            },
            {
              field: 'status',
              headerName: 'Status',
              sortable: false,
              flex: 0.5,
              renderCell: ({ row }) => (
                <Chip
                  label={row?.active ? 'ACTIVE' : 'DEACTIVE'}
                  color={row?.active ? 'success' : 'error'}
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
                    aria-label="userDetail"
                    onClick={() => {
                      createModal('userDetail', {
                        user: { ...row },
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

export default UserList;
