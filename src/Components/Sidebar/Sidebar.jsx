import { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
//import DescriptionIcon from "@mui/icons-material/Description";

//import { CSidebarNavDropdown, CSidebarNavItem } from "@coreui/react";

import { Link } from "react-router-dom";

const Sidebar = ({ data }) => {
  const [sidebarActive, setSidebarActive] = useState(false);

  // const[showhide,setshowhide]=useState(prevState => prevState === " " ? "show" : " ");

  const [showhide, setShowHide] = useState("show"); // Initialize state to 'show' by default

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 991;
      setShowHide(isMobile ? (showhide === "show" ? "" : data) : data); // Set state based on window width and data prop
    };

    handleResize(); // Call once to set initial state

    handleResize();
  }, [data]); // Add 'data' to dependency array, not 'showhide'

  const toggleSidebar = () => {
    setShowHide(showhide === "show" ? "" : showhide); // Toggle between 'show' and empty string
  };

  return (
    <>
      <div
        id="sidebar"
        className={`sidebar ${showhide} sidebar-dark sidebar-fixed border-end`}
      >
        <div className="sidebar-header border-bottom">
          <div className="sidebar-brand">
            <a className="sidebar-brand" to="/">
              <h2 className="logo-title">LNJN NFSU</h2>
            </a>
            <svg
              className="sidebar-brand-full"
              width="88"
              height="32"
              alt="CoreUI Logo"
            >
              {/* <use xlink:href="assets/brand/coreui.svg#signet"></use> */}
            </svg>
            <svg
              className="sidebar-brand-narrow"
              width="32"
              height="32"
              alt="CoreUI Logo"
            >
              {/* <use xlink:href="assets/brand/coreui.svg#signet"></use> */}
            </svg>
          </div>
          <button
            className="btn-close d-lg-none"
            type="button"
            onClick={toggleSidebar}
            aria-label="Close"
          ></button>
        </div>
        <ul className="sidebar-nav" data-coreui="navigation" data-simplebar>
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
              <DashboardIcon />
              Dashboard
              <span className="badge badge-sm bg-info ms-auto">NEW</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/cms/Createmenu" className="nav-link">
              <DashboardIcon />
              CMS
              {/* <span className="badge badge-sm bg-info ms-auto">NEW</span> */}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/MenuSubMenu/MenuSubMenu" className="nav-link">
              <DashboardIcon />
              Menu Table
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/Department/DepartmentForm" className="nav-link">
              <DashboardIcon />
              Department
              {/* <span className="badge badge-sm bg-info ms-auto">NEW</span> */}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Department/AllDepartment" className="nav-link">
              <DashboardIcon />
              Department List
              {/* <span className="badge badge-sm bg-info ms-auto">NEW</span> */}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Course/AllCourse" className="nav-link">
              <DashboardIcon />
              Course List
              {/* <span className="badge badge-sm bg-info ms-auto">NEW</span> */}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Course/CreateCourse" className="nav-link">
              <DashboardIcon />
              Create Course
              {/* <span className="badge badge-sm bg-info ms-auto">NEW</span> */}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Candidate/CreateCandidate" className="nav-link">
              <DashboardIcon />
              Create Candidate
              {/* <span className="badge badge-sm bg-info ms-auto">NEW</span> */}
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/SubMenu/CreateSubMenu" className="nav-link">
              <DashboardIcon />
              SubMenu
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/custom/custom" className="nav-link">
              <DashboardIcon />
              Custom
            </Link>
          </li>

          <li className="nav-item">
            <Link to="custom/CustomTable" className="nav-link">
              <DashboardIcon />
              Custom Table
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer border-top d-none d-md-flex">
          <button
            className="sidebar-toggler"
            type="button"
            data-coreui-toggle="unfoldable"
          ></button>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
