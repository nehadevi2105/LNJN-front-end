import { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebar(window.innerWidth >= 991);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  // Sidebar menu items
  const menuItems = [
    { key: "dashboard", label: "Dashboard", link: "/dashboard" },
    {
      key: "menu",
      label: "Menu Management",
      subMenu: [
        { label: "Create Menu", link: "/Menu/CreateMenu" },
        { label: "Menu Table", link: "/MenuSubMenu/MenuSubMenu" },
      ],
    },
    {
      key: "department",
      label: "Department",
      subMenu: [
        { label: "Create Department", link: "/Department/DepartmentForm" },
        { label: "Department List", link: "/Department/AllDepartment" },
      ],
    },
    {
      key: "course",
      label: "Courses",
      subMenu: [
        { label: "Create Course", link: "/Course/CreateCourse" },
        { label: "Course List", link: "/Course/AllCourse" },
      ],
    },
    {
      key: "candidate",
      label: "Candidates",
      subMenu: [
        { label: "Create Candidate", link: "/Candidate/CreateCandidate" },
        { label: "Candidate List", link: "/Candidate/AllCandidates" },
      ],
    },
    {
      key: "hostel",
      label: "Hostels",
      subMenu: [
        { label: "Create Hostel", link: "/Hostel/CreateHostel" },
        { label: "Hostel List", link: "/Hostel/AllHostel" },
      ],
    },
    {
      key: "rooms",
      label: "Rooms",
      subMenu: [
        { label: "Create Room", link: "/Rooms/CreateRoom" },
        { label: "Room List", link: "/Rooms/AllRooms" },
      ],
    },
    {
      key: "bookroom",
      label: "Book Room",
      subMenu: [
        { label: "Book Room", link: "/BookRoom/Bookroom" },
        { label: "Book Room List", link: "/BookRoom/Bookroomlist" },
      ],
    },
    {
      key: "custom",
      label: "Custom",
      subMenu: [
        { label: "Custom", link: "/custom/custom" },
        { label: "Custom Table", link: "/custom/CustomTable" },
      ],
    },
    {
      key: "banner",
      label: "Banner",
      subMenu: [
        { label: "Create Banner", link: "/Banner/Banner" },
        { label: "Banner Table", link: "/bannerdata" },
      ],
    },
    {
      key: "tender",
      label: "Tenders",
      subMenu: [
        { label: "Tender Form", link: "/CreateTender/Createtender" },
        { label: "Tender Table", link: "/TenderTable/TenderTable" },
      ],
    },
    { key: "whatsnew", label: "What's New Table", link: "/WhatsNew/WhatsNewTable" },
    {
      key: "footer",
      label: "Footer Management",
      subMenu: [
        { label: "Footer Description", link: "/CMSFooter/CreateFooter/CreateFooterDec" },
        { label: "Footer Address", link: "/CMSFooter/CreateFooter/CreateFooterAddress" },
        { label: "Footer Services", link: "/CMSFooter/CreateFooter/CreateFooterServices" },
        { label: "Footer Data", link: "/CMSFooter/CreateFooter/CreateFooterData" },
        { label: "Footer Table", link: "/CMSFooter/FooterTable/FooterTable" },
      ],
    },
  ];

  return (
    <div id="sidebar" className={`sidebar ${showSidebar ? "show" : "hide"} sidebar-dark sidebar-fixed border-end`}>
      <div className="sidebar-header border-bottom">
        <div className="sidebar-brand">
          <Link to="/" className="sidebar-brand">
            <h2 className="logo-title">LNJN NFSU</h2>
          </Link>
        </div>
        <button className="btn-close d-lg-none" type="button" onClick={toggleSidebar} aria-label="Close"></button>
      </div>

      <ul className="sidebar-nav">
        {menuItems.map((item) =>
          item.subMenu ? (
            <li key={item.key} className="nav-item">
              <button className="nav-link dropdown-toggle" onClick={() => toggleDropdown(item.key)}>
                <DashboardIcon /> {item.label}
              </button>
              {openDropdown === item.key && (
                <ul className="nav-dropdown">
                  {item.subMenu.map((subItem, index) => (
                    <li key={index}>
                      <Link to={subItem.link} className="nav-link">{subItem.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li key={item.key} className="nav-item">
              <Link to={item.link} className="nav-link">
                <DashboardIcon /> {item.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
