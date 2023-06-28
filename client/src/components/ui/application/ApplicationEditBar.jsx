import PreviewIcon from '@mui/icons-material/Preview';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { createModal } from 'hooks/modal';
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ApplicationEditBar = () => {
  const application = useSelector((state) => state.application.data);
  const token = useSelector((state) => state.auth.token);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingError, setUpdatingError] = useState(null);

  const promiseOfSaving = () => {
    return axios
      .patch(
        `${import.meta.env.VITE_API_URL}/applications/${application.id}`,
        { ...application },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        setUpdatingError(err);
        return Promise.reject(err);
      })
      .finally(() => setIsUpdating(false));
  };

  const handleUpdateApplication = async () => {
    setIsUpdating(true);
    toast.promise(promiseOfSaving, {
      pending: 'Please wait...',
      success: 'Save is done.',
      error: 'An error occured. Please try again later.',
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <Link to="/applications">
            <AppsIcon />
          </Link>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {application.name}
        </Typography>
        <Tooltip title="Settings">
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={() => {
              createModal('applicationSettings', {
                id: application.id,
                name: application.name,
                startDate: application.startDate,
                deadlineDate: application.deadlineDate,
              });
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save">
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={handleUpdateApplication}
            disabled={isUpdating}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Preview">
          <IconButton size="large" color="inherit" aria-label="menu">
            <Link to={`/applications/${application?.slug}`}>
              <PreviewIcon />
            </Link>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationEditBar;
