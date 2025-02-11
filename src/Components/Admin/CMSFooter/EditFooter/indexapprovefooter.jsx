import { useState, useEffect } from "react";
import APIClient from "../../../../API/APIClient";
import apis from "../../../../API/API.json";
import { Link, useParams } from "react-router-dom";
import ApproveFooterAddress from "./Approvefooteraddress";
import ApproveFooterServices from "./Approvefooterservices";
import ApproveFooterData from "./Approvefooterdata";
import ApproveFooterDec from "./ApprovefooterDec";

const ApproveindexFooter = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await APIClient.get(apis.getfooterbyid + id);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData();
  }, [id]);
  return (
    <div>
      <div>
        <div>
          <main id="main" className="main">
            <div className="pagetitle">
              {/* <h1>Create Footer</h1> */}
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item">Footer</li>
                  <li className="breadcrumb-item active">
                    Approve Footer 
                  </li>
                </ol>
              </nav>
            </div>
            <div className="pagetitle-rgt d-flex justify-content-end mb-5">
              <Link to="/footer/footertable">
                <button type="button" className="btn btn-info">
                  Back
                </button>
              </Link>
            </div>
            {data.footertype === 1 && <ApproveFooterDec />}
            {data.footertype === 2 && <ApproveFooterServices />}
            {data.footertype === 3 && <ApproveFooterAddress />}
            {data.footertype === 4 && <ApproveFooterData />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ApproveindexFooter;
