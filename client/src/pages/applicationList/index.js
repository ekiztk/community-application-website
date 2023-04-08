import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import useFetch from "../../utils/hooks/useFetch";
import { MdDateRange } from "react-icons/md";
import Navbar from "components/Navbar";
import ApplicationBox from "components/application/ApplicationBox";
//silme oldu sıra eksikleri kapatmada

//pagination needed
const Applications = ({ mode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, loading, error, reFetch } = useFetch(
    `http://127.0.0.1:3080/api/v1/applications`
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Applications</title>
      </Helmet>
      <Navbar />
      <div className="top-16 relative p-4 md:p-8">
        <h1 className="text-4xl text-center lg:text-6xl text-black">
          Applications
        </h1>
        <div className="p-4 md:p-16 grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-8">
          {loading && <h1>Loading..</h1>}
          {error && <h1>error</h1>}
          {
            <>
              {data?.data?.data?.length > 0 &&
                data?.data?.data.map((item) => (
                  <ApplicationBox key={item.id} item={item} mode={mode} />
                ))}
            </>
          }
        </div>
      </div>
    </>
  );
};

export default Applications;
