import BoxContainer from "components/questionEdit/BoxContainer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  MdOutlineApps,
  MdSave,
  MdRemoveRedEye,
  MdSettings,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { fetchApplication } from "../../store";
import { createModal, destroyAllModal } from "utils/hooks/modal";
import Loading from "components/Loading";
import axios from "axios";

const ApplicationEdit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingError, setUpdatingError] = useState(null);

  const dispatch = useDispatch();
  const application = useSelector((state) => state.application.data);
  const token = useSelector((state) => state.auth.token);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchApplication({ id }))
      .unwrap()
      .catch((err) => setLoadingError(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, id]);

  //update oldu şimdi sıra modal ile update etmekte
  const handleUpdateApplication = () => {
    setIsUpdating(true);
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/applications/${application.id}`,
        { ...application },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch((err) => setUpdatingError(err))
      .finally(() => setIsUpdating(false));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (loadingError) {
    return <h1>{loadingError.status + " " + loadingError.message}</h1>;
  }

  return (
    <header className="bg-gray-200 w-full min-h-[100vh]">
      <div className="bg-white h-16 flex items-center p-2 md:p-4">
        <Link to="/panel/applications">
          <MdOutlineApps className="h-12 w-12 cursor-pointer" />
        </Link>
        <h2>{application.name.toUpperCase()}</h2>
        <div className="flex justify-end items-center gap-x-2 md:gap-x-4 flex-1">
          <MdSettings
            className="h-8 w-8 cursor-pointer"
            onClick={() => {
              createModal("applicationSettings", {
                id: application.id,
                name: application.name,
                startDate: application.startDate,
                deadlineDate: application.deadlineDate,
              });
            }}
          />
          {isUpdating ? (
            "Updating..."
          ) : (
            <MdSave
              onClick={handleUpdateApplication}
              className="h-8 w-8 cursor-pointer"
            />
          )}
          {updatingError && "Error updating."}
          <MdRemoveRedEye className="h-8 w-8 cursor-pointer" />
        </div>
      </div>
      <BoxContainer editable />
    </header>
  );
};

export default ApplicationEdit;
