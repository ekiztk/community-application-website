import Loading from "components/Loading";
import Navbar from "components/Navbar";
import BoxContainer from "components/questionEdit/BoxContainer";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchApplication } from "../../store";

//response göndermede kaldık

const ApplicationApply = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const dispatch = useDispatch();
  const application = useSelector((state) => state.application.data);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchApplication({ slug: slug }))
      .unwrap()
      .catch((err) => setLoadingError(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, slug]);

  if (isLoading) {
    return <Loading />;
  }

  if (loadingError) {
    return <h1>{loadingError.status + " " + loadingError.message}</h1>;
  }

  console.log(application);

  return (
    <div className="pt-16 bg-gray-200 w-full min-h-[100vh]">
      <Navbar />
      <BoxContainer />
    </div>
  );
};

export default ApplicationApply;
