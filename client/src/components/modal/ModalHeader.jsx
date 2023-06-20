import React from 'react';
import { destroyModal } from 'hooks/modal';
import CloseIcon from '@mui/icons-material/Close';

const ModalHeader = ({ title }) => {
  return (
    <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4">
      <h5 className="text-xl text-center flex-1 font-medium leading-normal ">
        {title}
      </h5>
      <button
        type="button"
        className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
        onClick={destroyModal}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default ModalHeader;
