import { destroyAllModal, destroyModal, useModals } from 'hooks/modal';
import { Box } from '@mui/material';
import modalData from 'data/modal';
import React from 'react';

const Modal = () => {
  const modals = useModals();
  //destroyAllModal();
  return (
    <Box
      tabIndex="-1"
      className="fixed bg-black/50 top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none flex justify-center items-center"
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
        }}
        className="w-[96%] md:w-[60%] transition-all duration-300 ease-in-out rounded-md border-none"
      >
        {modals.map((modal, i) => {
          const m = modalData.find((m) => m.name === modal.name);
          return (
            <div key={i} className="hidden last:block">
              <m.element key={i} data={modal.data} close={destroyModal} />
            </div>
          );
        })}
      </Box>
    </Box>
  );
};

export default Modal;
