import React from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import useFetch from "../../utils/hooks/useFetch";
import { MdDateRange } from "react-icons/md";
//pagination needed

const Applications = () => {
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
      <div className="top-16 relative p-4 md:p-8">
        <h1 className="text-4xl text-center lg:text-6xl text-black">
          Applications
        </h1>
        <div className="p-4 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {loading && <h1>Loading..</h1>}
          {error && <h1>error</h1>}
          {
            <>
              {data?.data?.data?.length > 0 &&
                data?.data?.data.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 text-center md:p-8 auto-rows-auto auto-cols-auto shadow-inner rounded-sm border-solid border-2 border-gray-300"
                  >
                    <h3 className="mb-2 md:mb-4 text-black text-2xl">
                      {item?.name}
                    </h3>
                    <hr />
                    <p className="mb-2 md:mb-4 text-black text-sm leading-8">
                      {item?.description?.length > 160
                        ? item.description.slice(0, 160) + "..."
                        : item.description}
                    </p>
                    <div className="mb-2 md:mb-4 text-black text-xs flex flex-row items-center justify-center">
                      <MdDateRange size={24} />
                      <p>
                        {new Date(item?.startDate).toLocaleDateString("en-US") +
                          " - " +
                          new Date(item?.deadlineDate).toLocaleDateString(
                            "en-US"
                          )}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Apply
                    </button>
                  </div>
                ))}
            </>
          }
        </div>
      </div>
    </>
  );
};

export default Applications;
