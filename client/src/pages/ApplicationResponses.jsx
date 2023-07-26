import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Tooltip, IconButton, Chip } from '@mui/material';
import useFetch from 'hooks/useFetch';
import Loading from 'components/ui/Loading';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PreviewIcon from '@mui/icons-material/Preview';
import { useEffect, useState } from 'react';
import { createModal } from 'hooks/modal';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SEO from 'components/SEO';

//tablolu kısımları halletmek kaldı
const ApplicationResponses = () => {
  const { applicationId } = useParams();
  const location = useLocation();
  const application = location.state;
  const [isCollaborator, setIsCollaborator] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();

  const [pageSize, setPageSize] = useState(5);

  const { data, loading, error, reFetch } = useFetch({
    url: `${
      import.meta.env.VITE_API_URL
    }/applications/${applicationId}/responses?status=pending`,
    token,
  });

  useEffect(() => {
    const checkIfUserIsCollaborator = async () => {
      try {
        await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/applications/${applicationId}/isCollaborator`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsCollaborator(true);
      } catch (error) {
        setIsCollaborator(false);
        return navigate('/unauthorized', {
          replace: true,
          state: {
            return_url: location.pathname + location.search,
          },
        });
      }
    };

    checkIfUserIsCollaborator();
  }, []);

  if (loading || error || !isCollaborator) {
    return <Loading loading={loading} error={error?.message} />;
  }

  return (
    <Box>
      <SEO
        title={` Responses of ${application?.name}`}
        description="desc"
        name="Company name."
        type="article"
      />
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
          pagination
        />
      </Box>
    </Box>
  );
};

export default ApplicationResponses;
