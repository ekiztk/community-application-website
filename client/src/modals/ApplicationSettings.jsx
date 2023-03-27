import axios from "axios";
import { TextField, DatePicker, Button } from "components/form";
import Header from "components/modal/Header";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeDeadlineDate, changeStartDate, changeName } from "store";

//date pcikerlar tarih göstermiyor düzeltmede kaldık
const ApplicationSettings = ({ data, close }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingError, setUpdatingError] = useState(null);

  const [name, setName] = useState(data.name || "");
  const [startDate, setStartDate] = useState(data.startDate || "");
  const [deadlineDate, setDeadlineDate] = useState(data.deadlineDate || "");

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleUpdateApplication = () => {
    setIsUpdating(true);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/applications/${data.id}`,
        { name, startDate, deadlineDate },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Updated.");
        dispatch(changeName(name));
        dispatch(changeStartDate(startDate));
        dispatch(changeDeadlineDate(deadlineDate));
        close();
      })
      .catch((err) => setUpdatingError(err))
      .finally(() => setIsUpdating(false));
  };

  return (
    <>
      <Header title="Settings" />
      <div className="flex flex-col justify-center items-center p-4 md:px-8">
        <TextField
          id="name"
          name="name"
          label="Application Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <DatePicker
          label="Start Date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <DatePicker
          label="Deadline Date"
          id="deadlineDate"
          name="deadlineDate"
          value={deadlineDate}
          onChange={(e) => setDeadlineDate(e.target.value)}
        />
        <Button onClick={handleUpdateApplication} style="success" text="Save" />
      </div>
    </>
  );
};

export default ApplicationSettings;
