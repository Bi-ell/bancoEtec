import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Adm from "./pages/Adm";
import Home from "./pages/Home";
import Comum from "./pages/Comum";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adm" element={<Adm />} />
        <Route path="/comum" element={<Comum />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;