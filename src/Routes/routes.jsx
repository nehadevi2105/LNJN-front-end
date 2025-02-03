//import React from 'react';
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
//import Sidebar from "../components/SideBar/Sidebar";
import CreateMenu from "../Components/Admin/Menu/CreateMenu";
import Department from "../Components/Admin/Department/Department";
import MenuSubMenu from "../Components/Admin/MenuSubMenu/MenuSubMenu";
import EditMenu from "../Components/Admin/EditMenuSubmeu/EditMenu";
import EditSubMenu from "../Components/Admin/EditMenuSubmeu/EditSubMenu";
import CreateSubMenu from "../Components/Admin/SubMenu/CreateSubMenu";
import Custom from "../Components/Admin/custom/custom";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/cms/Createmenu" element={<CreateMenu />} />
      <Route path="/Department/DepartmentForm" element ={<Department/>} />
      <Route path="/MenuSubMenu/MenuSubMenu" element ={<MenuSubMenu/>} />
      <Route path="/EditMenuSubmeu/EditMenu/:id" element ={<EditMenu/>} />
      <Route path="/EditMenuSubmeu/EditSubMenu/:id" element ={<EditSubMenu/>} />
      <Route path="/SubMenu/CreateSubMenu" element ={<CreateSubMenu/>} />
      <Route path="/custom/custom" element ={<Custom/>} />
    </Routes>
  );
}

export default Router;
