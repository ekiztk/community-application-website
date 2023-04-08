import { Routes, Route } from "react-router-dom";
import { useModals } from "utils/hooks/modal";
import Applications from "pages/applicationList";
import Login from "pages/login";
import Signup from "pages/signup";
import Landing from "pages/landing";
import ApplicationEdit from "pages/applicationEdit";
import Modal from "modals";
import ApplicationApply from "pages/applicationApply";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "store";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.auth.mode);
  const modals = useModals();
  //dark mode renkleri ayarlanacak
  useEffect(() => {
    if (
      mode === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  const changeTheme = (e) => {
    dispatch(setMode());
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      {modals.length > 0 && <Modal />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/:slug" element={<ApplicationApply />} />
        <Route
          path="/applications/edit"
          element={<Applications mode="edit" />}
        />
        <Route path="/applications/edit/:id" element={<ApplicationEdit />} />
      </Routes>
      <div
        onClick={changeTheme}
        className="fixed bottom-2 right-2 w-8 h-8 dark:bg-bg-light bg-black"
      ></div>
    </>
  );
}

export default App;
