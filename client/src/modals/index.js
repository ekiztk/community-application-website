import React from "react";
import { destroyAllModal, destroyModal, useModals } from "utils/hooks/modal";
import modalData from "utils/modalData";

const Modal = () => {
  const modals = useModals();
  //destroyAllModal();
  return (
    <div
      tabIndex="-1"
      className="fixed bg-black/50 top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none flex justify-center items-center"
    >
      <div className="bg-white w-[96%] md:w-[60%] transition-all duration-300 ease-in-out rounded-md border-none">
        {modals.map((modal, i) => {
          const m = modalData.find((m) => m.name === modal.name);
          return (
            <div className="hidden last:block">
              <m.element key={i} data={modal.data} close={destroyModal} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Modal;
