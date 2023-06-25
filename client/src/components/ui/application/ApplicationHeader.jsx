import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateApplication } from 'store';
import { Typography, Paper, TextField } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { format } from 'date-fns';

const ApplicationHeader = ({ application, showEdit }) => {
  const myRef = useRef();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const { name, description, startDate, deadlineDate } = application;
  const handleDescriptionChange = (event) => {
    dispatch(updateApplication({ description: event.target.value }));
  };

  const handleClickOutside = (e) => {
    if (showEdit && !myRef.current.contains(e.target)) {
      setIsEditing(false);
    }
  };

  const handleClickInside = () => setIsEditing(true);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <Paper
      elevation={24}
      className="p-1 md:p-2 lg:p-4 rounded-md w-[80%] lg:w-[60%] flex flex-col gap-y-4 text-center"
      ref={myRef}
      onClick={handleClickInside}
    >
      <Typography variant="h2">{name}</Typography>
      {showEdit && isEditing ? (
        <TextField
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
        />
      ) : (
        <Typography variant="body1">{description}</Typography>
      )}
      <div className="mt-2 md:mt-4 flex flex-row items-center justify-center gap-2">
        <CalendarMonthIcon fontSize="large" />
        <Typography variant="body2" fontWeight="bold">
          {format(new Date(Date.parse(startDate)), 'MM/dd/yyyy') +
            ' - ' +
            format(new Date(Date.parse(deadlineDate)), 'MM/dd/yyyy')}
        </Typography>
      </div>
    </Paper>
  );
};

export default ApplicationHeader;
