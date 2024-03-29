import PreviewIcon from '@mui/icons-material/Preview';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import GroupIcon from '@mui/icons-material/Group';
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
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ApplicationEditBar = ({ application }) => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingError, setUpdatingError] = useState(null);

  const navigateToApplications = () => {
    navigate('/applications', { replace: true });
  };

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
          aria-label="applications"
          sx={{ mr: 1 }}
        >
          <Link to="/applications">
            <AppsIcon />
          </Link>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {application.name}
        </Typography>
        <Tooltip title="Collaborators">
          <IconButton
            size="large"
            color="inherit"
            aria-label="collaborators"
            onClick={() => {
              createModal('applicationCollaborators', {
                id: application.id,
                name: application.name,
                token: token,
              });
            }}
          >
            <GroupIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton
            size="large"
            color="inherit"
            aria-label="settings"
            onClick={() => {
              createModal('applicationSettings', {
                id: application.id,
                name: application.name,
                startDate: application.startDate,
                deadlineDate: application.deadlineDate,
                navigateAfterDeletion: navigateToApplications,
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
            aria-label="save"
            onClick={handleUpdateApplication}
            disabled={isUpdating}
          >
            <SaveIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Preview">
          <IconButton size="large" color="inherit" aria-label="preview">
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
