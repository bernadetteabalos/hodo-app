import { Route, Routes } from "react-router-dom";

import Home from "./components/react-router/Home";

const Paths = () => {
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/user/1" element={<Profile />} />
  </Routes>;
};

export default Paths;
