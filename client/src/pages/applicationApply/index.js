import axios from "axios";
import { Button } from "components/form";
import Loading from "components/Loading";
import Navbar from "components/Navbar";
import BoxContainer from "components/questionEdit/BoxContainer";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useThunk } from "utils/hooks/useThunk";
import { fetchApplication } from "../../store";

const ApplicationApply = () => {
  const [doFetchApplication, isLoading, loadingError] =
    useThunk(fetchApplication);
  const dispatch = useDispatch();
  const application = useSelector((state) => state.application.data);
  const { token, user } = useSelector((state) => ({
    token: state.auth.token,
    user: state.auth.user,
  }));
  const { slug } = useParams();

  const [isSendingResponse, setIsSendingResponse] = useState(false);
  const [sendingResponseError, setSendingResponseError] = useState(null);

  useEffect(() => {
    doFetchApplication({ slug });
  }, [doFetchApplication, slug]);

  if (isLoading) {
    return <Loading />;
  }

  if (loadingError) {
    return <h1>{loadingError.status + " " + loadingError.message}</h1>;
  }

  //console.log(application);

  async function handleSendResponse() {
    if (user) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/responses/`,
          {
            application: application.id,
            user: user.id,
            answers: application.questions,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .catch((err) => setSendingResponseError(err))
        .finally(() => setIsSendingResponse(false));
    } else {
      alert("önce üye olmak gereklidir.");
    }
  }

  return (
    <div className="bg-gray-200 w-full min-h-[100vh] p-16">
      <Navbar />
      {user ? (
        <BoxContainer />
      ) : (
        <p className="w-full">İlk önce kayıt olmalısınız.</p>
      )}

      <div className="w-full flex justify-center items-center pt-4 md:pt-8">
        <Button
          onClick={handleSendResponse}
          primary
          loading={isSendingResponse}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ApplicationApply;
