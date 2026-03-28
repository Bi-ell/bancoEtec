import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Adm from "./pages/Adm";
import Home from "./pages/Home";
import Comum from "./pages/Comum";
import ProtectorRouter from "./helpers/protectorRouter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <ProtectorRouter>
            <Home />
          </ProtectorRouter>
        } />

        <Route path="/adm" element={
          <ProtectorRouter roles={"admin"}>
            <Adm />
          </ProtectorRouter>} />
          
        <Route path="/comum" element={<Comum />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;