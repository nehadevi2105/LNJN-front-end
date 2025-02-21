import { useState, useEffect } from "react";
import EditMenu from "../../Admin/EditMenuSubmeu/EditMenu";
import EditSubmenu from "../EditMenuSubmeu/EditSubmenu";

import { Link, useParams } from "react-router-dom";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";

const Index = () => {
  const [data, setData] = useState([]);
  //const [html, setHtml] = useState("");
  //const [editorContent, setEditorContent] = useState("");
  const { id } = useParams();
  useEffect(() => {
    async function fetchData2() {
      try {
        const response = await APIClient.get(apis.getmenudatabyid + id);
        setData(response.data);
        //setHtml(response.data.html); // Set the html state
        //setEditorContent(response.data.html); // Set the editor content
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData2();
  }, [id]);

  return (
    <div>
      <main id="main" className="main">
      <div className="row justify-content-center">
      <div className="formdata"> {/* Bootstrap column for full width */}
    <div className="card custom-card">
              <div className="card-body">
        <div>
          <div>
            {data.submenu_id === 0 && <EditMenu />}
            {data.submenu_id !== 0 && <EditSubmenu />}
          </div>
        </div>
        </div>
        </div>
        </div>
        </div>
      </main>
    </div>
   
  );
};
export default Index;
