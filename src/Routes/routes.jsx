
import { Route, Routes } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
import CreateMenu from "../Components/Admin/Menu/CreateMenu";
import CreateDepartment from "../Components/Admin/Department/CreateDepartment";
import AllDepartments from "../Components/Admin/Department/AllDepartment";
import { EditDepartment } from "../Components/Admin/Department/EditDepartment";
import CreateCourse from "../Components/Admin/Course/CreateCourse";
import MenuSubMenu from "../Components/Admin/MenuSubMenu/MenuSubMenu";
import EditMenu from "../Components/Admin/EditMenuSubmeu/EditMenu";
import EditSubMenu from "../Components/Admin/EditMenuSubmeu/EditSubmenu";
import CreateSubMenu from "../Components/Admin/SubMenu/CreateSubMenu";
import Custom from "../Components/Admin/custom/custom";
import CustomTable from "../Components/Admin/custom/CustomTable";
import Editcustomdata from "../Components/Admin/custom/Editcustomdata";
import Banner from "../Components/Admin/Banner/Banner";
import Candidate from "../Components/Admin/Candidate/Candidate";
import CreateWhatsNew from "../Components/Admin/WhatsNew/CreateWhatsNew/CreateWhatsNew";
import IndexEdit from "../Components/Admin/EditMenuSubmeu/IndexEdit";
import AllCourses from "../Components/Admin/Course/AllCourses";
import EditCourse from "../Components/Admin/Course/EditCourse";
import AllCandidates from "../Components/Admin/Candidate/AllCandidates";
import EditCandidate from "../Components/Admin/Candidate/EditCandidate";
import CreateHostel from "../Components/Admin/Hostel/CreateHostel";
import AllHostel from "../Components/Admin/Hostel/AllHostel";
import EditHostel from "../Components/Admin/Hostel/EditHostel";
import Approvallist from "../Components/Admin/MenuSubMenu/Approvallist";
import Approvedata from "../Components/Admin/EditMenuSubmeu/approvedata";
import Publisherlist from "../Components/Admin/MenuSubMenu/Publisherlist";
import Publishdata from "../Components/Admin/EditMenuSubmeu/Publishdata";
import Customapprovallist from "../Components/Admin/custom/Customapprovallist";
import Editcustomapproval from "../Components/Admin/custom/Editcustomapproval";
import Custompublisherlist from "../Components/Admin/custom/Custompublisherlist";
import Editpublisherapproval from "../Components/Admin/custom/Editcustompublisher";
import Index from "../Components/Admin/EditMenuSubmeu/IndexEdit";
import Approvaledit from "../Components/Admin/EditMenuSubmeu/Approvalindex";
import Publishindex from "../Components/Admin/EditMenuSubmeu/Publishindex";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/cms/Createmenu" element={<CreateMenu />} />
      <Route path="/Department/DepartmentForm" element ={<CreateDepartment/>} />
      <Route path="/MenuSubMenu/MenuSubMenu" element ={<MenuSubMenu/>} />
      <Route path="/EditMenuSubmeu/EditMenu/:id" element ={<EditMenu/>} />
      <Route path="/EditMenuSubmeu/EditSubMenu/:id" element ={<EditSubMenu/>} />
      <Route path="/SubMenu/CreateSubMenu" element ={<CreateSubMenu/>} />
      <Route path="/custom/custom" element ={<Custom/>} />
      <Route path="/Department/AllDepartment" element = {<AllDepartments/>} />
      <Route path="/Department/EditDepartment/:id" element = {<EditDepartment/>}/>
      <Route path="/Course/CreateCourse" element = {<CreateCourse/>}/>
      <Route path="/Candidate/CreateCandidate" element = {<Candidate/>}/>
      <Route path="/custom/CustomTable" element = {<CustomTable/>}/>
      <Route path="/custom/Editcustomdata/:id" element = {<Editcustomdata/>}/>
      



      <Route path="/Course/AllCourse" element = {<AllCourses/>}/>
      <Route path="/Course/EditCourse/:id" element = {<EditCourse/>}/>
    </Routes>
  );
}

export default Router;
