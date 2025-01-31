import  { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = ({ onDataChange = () => {} }) => {
  const toggleSidebar = () => {
    // Check if screen size is less than 991px
    if (window.innerWidth < 991) {
      // If screen size is less than 991px, always show the sidebar
      onDataChange((prevState) => (prevState === "show" ? " " : "show"));
    } else {
      // If screen size is 991px or more, toggle the sidebar visibility
      onDataChange((prevState) => (prevState === "hide" ? " " : "hide"));
    }
  };

  const [hasScrolled, setHasScrolled] = useState(false);
  const headerRef = useRef(null);

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const navigate= useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isScrolled = scrollTop > 0;
      setHasScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [selectedDate, setSelectedDate] = useState(dayjs("2024-04-01"));

  const handleChangeDate = (newdate) => {
    if (newdate) {
      setSelectedDate(newdate);
    } else {
      setSelectedDate(dayjs("2024-04-01"));
    }
  };

  const handleLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  const handlePasswordChange=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/changepassword")
  }

  return (
    <div>
      <header
        ref={headerRef}
        className={`header header-sticky header-bg p-0 ${
          hasScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="container-fluid border-bottom px-4">
          <div className="toggle-main">
            <div className="toggle-lft">
              <button className="header-toggler" onClick={toggleSidebar}>
                <MenuIcon />
              </button>
            </div>
            <div className="toggle-rgt">
              <div className="banner-wel">
                <h6>Welcome to LNJN</h6>
              </div>
            </div>
          </div>
        </div>
        {/* <Breadcrumb
          selectedDate={selectedDate}
          onChangeDate={handleChangeDate}
        /> */}
      </header>
    </div>
  );
};

export default Header;
