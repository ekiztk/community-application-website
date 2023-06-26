import { useState, useMemo } from 'react';

const usePagination = ({ totalCount, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagination = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const handlePageChange = (e, value) => {
      setCurrentPage(value);
    };

    const sliceCurrentPageRecords = (recordsArray) => {
      return recordsArray.slice(
        (currentPage - 1) * pageSize,
        (currentPage - 1) * pageSize + pageSize
      );
    };

    return [
      pageSize,
      currentPage,
      totalPageCount,
      handlePageChange,
      sliceCurrentPageRecords,
    ];
  }, [totalCount, pageSize, currentPage]);
  return pagination;
};

export default usePagination;
