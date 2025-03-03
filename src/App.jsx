import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Router from "./Routes/routes";
import "./App.css";

function App() {
  const [sidebarData, setSidebarData] = useState("");
  const location = useLocation(); // Get the current route

  const handleSidebarDataChange = (data) => {
    setSidebarData(data);
  };

  //const [sessionExpired, setSessionExpired] = useState(false);
  //const storedUserString = localStorage.getItem("usertype");
  //const token = localStorage.getItem("token");
  //console.log(token);
  //console.log(storedUserString);

  // Check if the current route is "/login"
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Sidebar data={sidebarData} />}
      <div className="wrapper d-flex flex-column min-vh-100">
        {!isLoginPage && <Header onDataChange={handleSidebarDataChange} />}
        <Router />
        {!isLoginPage && <Footer />}
      </div>
    </>
  );
}

export default App;

