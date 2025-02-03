//import React from 'react';
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
//import Sidebar from "../components/SideBar/Sidebar";
import CreateMenu from "../Components/Admin/Menu/CreateMenu";
import CreateDepartment from "../Components/Admin/Department/CreateDepartment";
import AllDepartments from "../Components/Admin/Department/AllDepartment";
import { EditDepartment } from "../Components/Admin/Department/EditDepartment";
import CreateCourse from "../Components/Admin/Course/CreateCourse";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/cms/Createmenu" element={<CreateMenu />} />
      <Route path="/Department/DepartmentForm" element ={<CreateDepartment/>} />
      <Route path="/Department/AllDepartment" element = {<AllDepartments/>} />
      <Route path="/Department/EditDepartment/:id" element = {<EditDepartment/>}/>
      <Route path="/Course/CreateCourse" element = {<CreateCourse/>}/>
    </Routes>
  );
}

export default Router;
