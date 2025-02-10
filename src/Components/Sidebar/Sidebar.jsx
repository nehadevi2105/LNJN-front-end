import { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

const Sidebar = ({ data }) => {
  const [showhide, setShowHide] = useState("show");
  const [openDropdown, setOpenDropdown] = useState(null); // To track which dropdown is open

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 991;
      setShowHide(isMobile ? (showhide === "show" ? "" : data) : data);
    };

    handleResize();
  }, [data]);

  const toggleSidebar = () => {
    setShowHide(showhide === "show" ? "" : "show");
  };

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key); // Toggle dropdown
  };

  return (
    <div id="sidebar" className={`sidebar ${showhide} sidebar-dark sidebar-fixed border-end`}>
      <div className="sidebar-header border-bottom">
        <div className="sidebar-brand">
          <a className="sidebar-brand" to="/">
            <h2 className="logo-title">LNJN NFSU</h2>
          </a>
        </div>
        <button className="btn-close d-lg-none" type="button" onClick={toggleSidebar} aria-label="Close"></button>
      </div>

      <ul className="sidebar-nav" data-coreui="navigation" data-simplebar>
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            <DashboardIcon /> Dashboard
            <span className="badge badge-sm bg-info ms-auto">NEW</span>
          </Link>
        </li>

        {/* Dropdown: Menu Management */}
        <li className="nav-item">
          <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown("menu")}>
            <DashboardIcon /> Menu Management
          </button>
          {openDropdown === "menu" && (
            <ul className="nav-dropdown">
              <li><Link to="/Menu/CreateMenu" className="nav-link">Create Menu</Link></li>
              <li><Link to="/MenuSubMenu/MenuSubMenu" className="nav-link">Menu Table</Link></li>
            </ul>
          )}
        </li>
          <li className="nav-item">
            <Link to="/cms/Createmenu" className="nav-link">
              <DashboardIcon />
              Menu
              {/* <span className="badge badge-sm bg-info ms-auto">NEW</span> */}
            </Link>
          </li>

        {/* Dropdown: Department */}
        <li className="nav-item">
          <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown("department")}>
            <DashboardIcon /> Department
          </button>
          {openDropdown === "department" && (
            <ul className="nav-dropdown">
              <li><Link to="/Department/DepartmentForm" className="nav-link">Create Department</Link></li>
              <li><Link to="/Department/AllDepartment" className="nav-link">Department List</Link></li>
            </ul>
          )}
        </li>

        {/* Dropdown: Course */}
        <li className="nav-item">
          <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown("course")}>
            <DashboardIcon /> Courses
          </button>
          {openDropdown === "course" && (
            <ul className="nav-dropdown">
              <li><Link to="/Course/CreateCourse" className="nav-link">Create Course</Link></li>
              <li><Link to="/Course/AllCourse" className="nav-link">Course List</Link></li>
            </ul>
          )}
        </li>

        {/* Dropdown: Candidate */}
        <li className="nav-item">
          <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown("candidate")}>
            <DashboardIcon /> Candidates
          </button>
          {openDropdown === "candidate" && (
            <ul className="nav-dropdown">
              <li><Link to="/Candidate/CreateCandidate" className="nav-link">Create Candidate</Link></li>
              <li><Link to="/Candidate/AllCandidates" className="nav-link">Candidate List</Link></li>
            </ul>
          )}
        </li>

        {/* Dropdown: Hostel */}
        <li className="nav-item">
          <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown("hostel")}>
            <DashboardIcon /> Hostels
          </button>
          {openDropdown === "hostel" && (
            <ul className="nav-dropdown">
              <li><Link to="/Hostel/CreateHostel" className="nav-link">Create Hostel</Link></li>
              <li><Link to="/Hostel/AllHostel" className="nav-link">Hostel List</Link></li>
            </ul>
          )}
        </li>

        {/* Dropdown: Rooms */}
        <li className="nav-item">
          <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown("room")}>
            <DashboardIcon /> Rooms
          </button>
          {openDropdown === "room" && (
            <ul className="nav-dropdown">
              <li><Link to="/Rooms/CreateRoom" className="nav-link">Create Room</Link></li>
              <li><Link to="/Rooms/AllRooms" className="nav-link">Room List</Link></li>
            </ul>
          )}
        </li>

        {/* Dropdown: Book Room */}
        <li className="nav-item">
          <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown("bookroom")}>
            <DashboardIcon /> Book Room
          </button>
          {openDropdown === "bookroom" && (
            <ul className="nav-dropdown">
              <li><Link to="/BookRoom/Bookroom" className="nav-link">Book Room</Link></li>
              <li><Link to="/BookRoom/Bookroomlist" className="nav-link">Book Room List</Link></li>
            </ul>
          )}
        </li>

        {/* Dropdown: Custom */}
        <li className="nav-item">
          <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown("custom")}>
            <DashboardIcon /> Custom
          </button>
          {openDropdown === "custom" && (
            <ul className="nav-dropdown">
              <li><Link to="/custom/custom" className="nav-link">Custom</Link></li>
              <li><Link to="/custom/CustomTable" className="nav-link">Custom Table</Link></li>
            </ul>
          )}
        </li>

        {/* Dropdown: Banner */}
        <li className="nav-item">
          <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown("banner")}>
            <DashboardIcon /> Banner
          </button>
          {openDropdown === "banner" && (
            <ul className="nav-dropdown">
              <li><Link to="/Banner/Banner" className="nav-link">Create Banner</Link></li>
              <li><Link to="/bannerdata" className="nav-link">Banner Table</Link></li>
            </ul>
          )}
        </li>

        {/* Dropdown: Tender */}
        <li className="nav-item">
          <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown("tender")}>
            <DashboardIcon /> Tenders
          </button>
          {openDropdown === "tender" && (
            <ul className="nav-dropdown">
              <li><Link to="/CreateTender/Createtender" className="nav-link">Tender Form</Link></li>
              <li><Link to="/TenderTable/TenderTable" className="nav-link">Tender Table</Link></li>
            </ul>
          )}
        </li>
      </ul>

      <div className="sidebar-footer border-top d-none d-md-flex">
        <button className="sidebar-toggler" type="button" data-coreui-toggle="unfoldable"></button>
      </div>
    </div>
  );
};

export default Sidebar;
