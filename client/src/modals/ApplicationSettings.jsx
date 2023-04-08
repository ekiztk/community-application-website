import axios from "axios";
import { TextField, DatePicker, Button } from "components/form";
import Header from "components/modal/Header";
import moment from "moment/moment";
import React, { useState } from "react";
import { GoTrashcan } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  changeDeadlineDate,
  changeStartDate,
  changeName,
  removeApplication,
} from "store";

//datepicker çalışmıyor

const ApplicationSettings = ({ data, close }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingError, setUpdatingError] = useState(null);

  const [name, setName] = useState(data.name || "");
  const [startDate, setStartDate] = useState(data.startDate || "");
  const [deadlineDate, setDeadlineDate] = useState(data.deadlineDate || "");

  const [isRemoving, setIsRemoving] = useState(false);
  const [removingError, setRemovingError] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleDeleteApplication = () => {
    dispatch(removeApplication({ id: data.id, token: token }))
      .unwrap()
      .then(() => {
        alert("removed");
        close();
        navigate("/applications/edit");
      })
      .catch((err) => setRemovingError(err))
      .finally(() => {
        setIsRemoving(false);
      });
  };

  console.log(moment(startDate).format("MM.DD.YYYY"));

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
          value={moment(startDate).format("DD.MM.YYYY")}
          onChange={(e) => setStartDate(moment(startDate).format("MM.DD.YYYY"))}
        />
        <DatePicker
          label="Deadline Date"
          id="deadlineDate"
          name="deadlineDate"
          value={deadlineDate}
          onChange={(e) => setDeadlineDate(e.target.value)}
        />
        <div className="flex flex-col border-gray-500 border-solid border-2 p-2 my-2">
          <p>
            Please write down the name of the application to delete it
            permamently.
          </p>
          <Button
            loading={isRemoving}
            onClick={handleDeleteApplication}
            danger
            className="h-12 w-12 mx-auto p-3 rounded-sm"
          >
            <GoTrashcan className="w-8 h-8" />
          </Button>
        </div>
        <Button loading={isUpdating} onClick={handleUpdateApplication} success>
          Update
        </Button>
      </div>
    </>
  );
};

export default ApplicationSettings;
