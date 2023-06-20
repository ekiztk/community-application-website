import { useSelector } from "react-redux";
import { store, append, destroy, destroyAll } from "store";

export const useModals = () => useSelector((state) => state.modal.modals);
export const createModal = (name, data = false) =>
  store.dispatch(append({ name, data }));
export const destroyModal = () => store.dispatch(destroy());
export const destroyAllModal = () => store.dispatch(destroyAll());
