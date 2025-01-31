//import React from 'react';
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
//import Sidebar from "../components/SideBar/Sidebar";
import CreateMenu from "../Components/Admin/Menu/CreateMenu";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/cms/Createmenu" element={<CreateMenu />} />
    </Routes>
  );
}

export default Router;
