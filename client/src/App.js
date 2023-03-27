import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useModals } from "utils/hooks/modal";
import Applications from "pages/applicationList";
import Login from "pages/login";
import Signup from "pages/signup";
import Landing from "pages/landing";
import ApplicationEdit from "pages/applicationEdit";
import Modal from "modals";
import ApplicationApply from "pages/applicationApply";

function App() {
  const modals = useModals();
  return (
    <>
      <BrowserRouter>
        {modals.length > 0 && <Modal />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/:slug" element={<ApplicationApply />} />
          <Route path="/applications/:id/edit" element={<ApplicationEdit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
