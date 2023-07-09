import ModalHeader from 'components/modal/ModalHeader';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Autocomplete,
  Divider,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { profileImage } from 'assets/img';
import { toast } from 'react-toastify';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect } from 'react';
import { setCollaborators } from 'store';
import { useDispatch, useSelector } from 'react-redux';

const UserBox = ({ user, isCollaborator, action, disabled }) => {
  return (
    <ListItem
      key={user?._id}
      secondaryAction={
        <IconButton
          disabled={disabled}
          onClick={() => action(user?._id)}
          color={isCollaborator ? 'error' : 'success'}
        >
          {isCollaborator ? <CancelIcon /> : <AddCircleIcon />}
        </IconButton>
      }
    >
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={`Avatar n°${user?.name}`} src={profileImage} />
        </ListItemAvatar>
        <ListItemText
          id={`checkbox-list-secondary-label-${user?._id}`}
          primary={user?.name}
          secondary={user?.email}
        />
      </ListItemButton>
    </ListItem>
  );
};

const ApplicationCollaborators = ({ data, close }) => {
  const dispatch = useDispatch();

  const collaborators = useSelector(
    (state) => state.application.data.collaborators
  );

  const [isSendingResponse, setIsSendingResponse] = useState(false);
  const [sendingResponseError, setSendingResponseError] = useState(null);
  const [email, setEmail] = useState('');
  const [userList, setuserList] = useState([]);

  useEffect(() => {
    if (email.trim() === '') {
      setuserList([]);
      return;
    }

    const fetchData = async () => {
      try {
        setIsSendingResponse(true);
        const { data: response } = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/users?active=true&email[regex]=(${email})&fields=name,photo,email&page=1&limit=8`,
          {
            headers: { Authorization: `Bearer ${data?.token}` },
          }
        );
        setuserList(response?.data?.data);
      } catch (error) {
        setSendingResponseError(error);
      } finally {
        setIsSendingResponse(false);
      }
    };

    fetchData();
  }, [email]);

  const handleAddCollaborator = async (userId) => {
    try {
      setIsSendingResponse(true);
      toast.loading('Please wait...', {
        toastId: 'addMessage',
      });
      //send the response
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/applications/${data?.id}`,
        {
          collaborators: [...collaborators, userId],
        },
        { headers: { Authorization: `Bearer ${data?.token}` } }
      );
      dispatch(setCollaborators(response?.data?.data?.data?.collaborators));
      toast.update('addMessage', {
        render: `The user has been added as a Collaborator.`,
        type: 'success',
        isLoading: false,
        autoClose: true,
      });
    } catch (error) {
      setSendingResponseError(error);
      toast.update('addMessage', {
        render: error?.response?.data?.message || error?.message,
        type: 'error',
        isLoading: false,
        autoClose: true,
      });
    } finally {
      setIsSendingResponse(false);
    }
  };

  const handleDeleteCollaborator = async (userId) => {
    try {
      setIsSendingResponse(true);
      toast.loading('Please wait...', {
        toastId: 'deleteMessage',
      });
      //send the response
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/applications/${data?.id}`,
        {
          collaborators: collaborators.filter((q) => {
            return q.id !== userId;
          }),
        },
        { headers: { Authorization: `Bearer ${data?.token}` } }
      );
      dispatch(setCollaborators(response?.data?.data?.data?.collaborators));
      toast.update('deleteMessage', {
        render: `The user has been deleted from Collaborators.`,
        type: 'success',
        isLoading: false,
        autoClose: true,
      });
    } catch (error) {
      setSendingResponseError(error);
      toast.update('deleteMessage', {
        render: error?.response?.data?.message || error?.message,
        type: 'error',
        isLoading: false,
        autoClose: true,
      });
    } finally {
      setIsSendingResponse(false);
    }
  };

  return (
    <>
      <ModalHeader title={`Collaborators of ${data?.name}`} />
      <Stack alignItems="center" spacing={2} direction="column" padding={1}>
        <Box className="flex flex-col items-center justify-center gap-2 md:gap-4">
          <Typography variant="body2">
            Please enter the user's email to add collaborators.
          </Typography>
          <Autocomplete
            disablePortal
            fullWidth
            options={
              isSendingResponse ? [{ name: 'Loading...', id: 0 }] : userList
            }
            getOptionLabel={(option) => option?.name}
            renderOption={(props, option) => (
              <UserBox
                {...props}
                user={option}
                action={handleAddCollaborator}
                disabled={isSendingResponse}
              />
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                id="email"
                name="email"
                type="email"
                label="User's Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          />
        </Box>
        <Divider flexItem>
          <Chip color="primary" label="Active Collaborators" />
        </Divider>
        <List
          dense
          className="overflow-y-auto"
          sx={{
            width: '100%',
            maxHeight: '60vh',
            maxWidth: 360,
            overflow: 'auto',
          }}
        >
          {collaborators.map((user) => {
            return (
              <>
                <UserBox
                  isCollaborator
                  user={user}
                  action={handleDeleteCollaborator}
                  disabled={isSendingResponse}
                />
              </>
            );
          })}
        </List>
      </Stack>
    </>
  );
};

export default ApplicationCollaborators;
