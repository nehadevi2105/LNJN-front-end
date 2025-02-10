import { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuBookIcon from "@mui/icons-material/MenuBook"; // CMS
import ApartmentIcon from "@mui/icons-material/Apartment"; // Department
import SchoolIcon from "@mui/icons-material/School"; // Courses
import PersonIcon from "@mui/icons-material/Person"; // Candidates
import HotelIcon from "@mui/icons-material/Hotel"; // Hostels
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"; // Rooms
import EventSeatIcon from "@mui/icons-material/EventSeat"; // Book Room
import BuildIcon from "@mui/icons-material/Build"; // Custom
import NewReleasesIcon from "@mui/icons-material/NewReleases"; // What's New
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify"; // Footer
import PanoramaIcon from "@mui/icons-material/Panorama"; // Banner
import AssignmentIcon from "@mui/icons-material/Assignment"; // Tenders

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
    // handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [data]); // Add 'data' to dependency array, not 'showhide'

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
            <MenuBookIcon /> CMS
          </button>
          {openDropdown === "menu" && (
            <ul className="nav-dropdown">
              <li><Link to="/Menu/CreateMenu" className="nav-link">Create Menu</Link></li>
              <li><Link to="/SubMenu/CreateSubMenu" className="nav-link">Create SubMenu</Link></li>
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
            <ApartmentIcon /> Department
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
            <SchoolIcon /> Courses
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
            <PersonIcon /> Candidates
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
            <HotelIcon /> Hostels
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
            <MeetingRoomIcon /> Rooms
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
            <EventSeatIcon /> Book Room
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
            <BuildIcon /> Custom
          </button>
          {openDropdown === "custom" && (
            <ul className="nav-dropdown">
              <li><Link to="/custom/custom" className="nav-link">Custom</Link></li>
              <li><Link to="/custom/CustomTable" className="nav-link">Custom Table</Link></li>
            </ul>
          )}
        </li>

        {/* Dropdown: Whats new */}
        <li className="nav-item">
          <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown("whatsnew")}>
            <NewReleasesIcon /> What's New
          </button>
          {openDropdown === "whatsnew" && (
            <ul className="nav-dropdown">
              <li><Link to="/WhatsNew/CreateWhatsNew" className="nav-link">What's New</Link></li>
              <li><Link to="/WhatsNew/WhatsNewTable" className="nav-link">What's New Table</Link></li>
            </ul>
          )}
        </li>

        {/* Dropdown: Footer */}
        <li className="nav-item">
          <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown("footer")}>
            <FormatAlignJustifyIcon /> Footer
          </button>
          {openDropdown === "footer" && (
            <ul className="nav-dropdown">
              <li><Link to="/CMSFooter/CreateFooter/CreateFooterDec" className="nav-link">Footer Description</Link></li>
              <li><Link to="/CMSFooter/CreateFooter/CreateFooterAddress" className="nav-link">Footer Address</Link></li>
              <li><Link to="/CMSFooter/CreateFooter/CreateFooterServices" className="nav-link">Footer Services</Link></li>
              <li><Link to="/CMSFooter/CreateFooter/CreateFooterData" className="nav-link">Footer Data</Link></li>
              <li><Link to="/CMSFooter/FooterTable/FooterTable" className="nav-link">Footer Table</Link></li>
            </ul>
          )}
        </li>

        {/* Dropdown: Banner */}
        <li className="nav-item">
          <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown("banner")}>
            <PanoramaIcon /> Banner
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
            <AssignmentIcon /> Tenders
          </button>
          {openDropdown === "tender" && (
            <ul className="nav-dropdown">
              <li><Link to="/CreateTender/Createtender" className="nav-link">Tender Form</Link></li>
              <li><Link to="/TenderTable/TenderTable" className="nav-link">Tender Table</Link></li>
            </ul>
          )}
        </li>
      </ul>
          <li className="nav-item">
            <Link to="/WhatsNew/WhatsNewTable" className="nav-link">
              <DashboardIcon />
              What's New Table
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/CreateTender/Createtender" className="nav-link">
              <DashboardIcon />
              Tender Form
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/TenderTable/TenderTable" className="nav-link">
              <DashboardIcon />
              Tender Table
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/CMSFooter/CreateFooter/CreateFooterDec"
              className="nav-link"
            >
              <DashboardIcon />
              Footer Description
            </Link>
          </li>
          <li>
            <Link
              to="/CMSFooter/CreateFooter/CreateFooterAddress"
              className="nav-link"
            >
              <DashboardIcon />
              Footer Address
            </Link>
          </li>
          <li>
            <Link
              to="/CMSFooter/CreateFooter/CreateFooterServices"
              className="nav-link"
            >
              <DashboardIcon />
              Footer Services
            </Link>
          </li>
          <li>
            <Link
              to="/CMSFooter/CreateFooter/CreateFooterData"
              className="nav-link"
            >
              <DashboardIcon />
              Footer Data
            </Link>
          </li>
          <li>
            <Link to="/CMSFooter/FooterTable/FooterTable" className="nav-link">
              <DashboardIcon />
              Footer Table
            </Link>
          </li>
        </ul>

      <div className="sidebar-footer border-top d-none d-md-flex">
        <button className="sidebar-toggler" type="button" data-coreui-toggle="unfoldable"></button>
      </div>
    </div>
  );
};

export default Sidebar;
