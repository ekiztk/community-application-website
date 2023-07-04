import { destroyAllModal, destroyModal, useModals } from 'hooks/modal';
import { Box, Backdrop } from '@mui/material';
import modalData from 'data/modal';
import React from 'react';

const Modal = () => {
  const modals = useModals();
  //destroyAllModal();
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <Box
        sx={{
          bgcolor: 'background.paper',
        }}
        className="w-[96%] md:w-[60%] transition-all duration-300 ease-in-out rounded-md border-2 border-white border-solid"
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
    </Backdrop>
  );
};

export default Modal;
