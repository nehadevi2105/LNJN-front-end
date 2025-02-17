import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import JoditEditor from "jodit-react";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import {
  Button,
  DialogTitle, // Add this import
  DialogContent,
  Dialog,
} from "@mui/material";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";

function EAlert(props) {
  return <Alert elevation={6} variant="filled" {...props} />;
}

const Custom = () => {
  const [html, setHtml] = useState("");
  const [file, setFile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  const onChange = useCallback((newContent) => {
    console.log("Editor content changed:", newContent);
    setContent(newContent);
  }, []);

  // const handleEditorChange = (content) => {
  //   setEditorContent(content);
  // };

  const [formData, setFormData] = useState({
    menuname: "",
    contenttype: "",
    external_link: "",
    internal_link: "",
    languagetype: "",
    submenu_id: 0,
    file: "",
    html: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      menuname: "",
      contenttype: "",
      external_link: "",
      internal_link: "",
      languagetype: "",
      submenu_id: 0,
      file: "",
      html: "",
    });
  }, []);

  const handleEditorChange = (content) => {
    setHtml(content);
    setFormData((prevState) => ({
      ...prevState,
      html: content, // Ensure formData is also updated
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^(?=.*[A-Za-z0-9])[A-Za-z0-9 .,/]+$/;
    if (!formData.menuname) {
      errors.menuname = "Introduction is required";
    } else if (!formData.menuname.match(namePattern)) {
      errors.menuname = "Name should only contain alphabets or numbers";
    }

    if (!formData.languagetype) {
      newErrors.languagetype = "language is required";
    }

    if (!formData.contenttype) {
      newErrors.contenttype = "Select a content type";
    }

    if (formData.contenttype === "4" && !formData.external_link) {
      newErrors.external_link = "External Link is required";
    }

    // if (formData.ContentType === '3' && !formData.internal_link) {
    //   newErrors.internal_link = 'Internal Link is required';
    // }

    if (formData.contentType === "2" && !file) {
      newErrors.file = "File is required";
    }

    // if (formData.contenttype === '1' && !html) {
    //   newErrors.html = 'HTML content is required';
    // }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFile(imageFile);
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: event.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleOpenConfirmation = () => {
    if (validateForm()) {
      setConfirmDialogOpen(true);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmSubmit = async () => {
    handleCloseConfirmation();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("menuname", formData.menuname);
      formDataToSend.append("contenttype", formData.contenttype);
      formDataToSend.append("languagetype", formData.languagetype);

      if (formData.contenttype === "4") {
        formDataToSend.append("external_link", formData.external_link);
      } else if (formData.contenttype === "3") {
        formDataToSend.append("internal_link", formData.internal_link);
      } else if (formData.contenttype === "2") {
        formDataToSend.append("file", file);
      } else if (formData.contenttype === "1") {
        formDataToSend.append("html", formData.html);
      }

      const response = await APIClient.post(apis.customdata, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status == 200) {
        // console.log('Data saved:', response.data);
        toast.success("Data saved successfully!");
        setModalMessage("Data saved successfully.");
        setSnackbarOpen(true);
        setContent("");
        setFormData({
          menuname: "",
          contenttype: "",
          external_link: "",
          internal_link: "",
          languagetype: "",
          file: "",
          html: "",
        });
      } else {
        console.error("Error saving data:");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  useEffect(() => {
    async function fetchData1() {
      try {
        setLoading(true);
        const response = await APIClient.get(apis.TopMenu);
        setDropdownOptions(response.data);
        setLoading(false);
        setFormData({
          menuname: "",
          contenttype: "",
          external_link: "",
          internal_link: "",
          languagetype: "",

          file: "",
          html: "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    }
    fetchData1();
  }, []);
  console.log(formData, html);

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <div className="pagetitle-lft">
            {/* <h2>Create Custom</h2> */}
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item  ">Custom</li>
                {/* <li className="breadcrumb-item active ">Menu</li> */}
              </ol>
            </nav>
          </div>
        </div>

        <div>
          <div className="row justify-content-center">
            <div>
              <div className="card">
                <div className="card-body">
                  <div className="mb-3 mt-md-4">
                    <div className="box-sec">
                      <h1 className="text-center text-dark heading-main">
                        Custom
                      </h1>
                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Select a Language
                        </label>
                        <select
                          className="form-select"
                          name="languagetype"
                          value={formData.languagetype}
                          onChange={handleInputChange}
                        >
                          <option value="">Select a Language</option>

                          <option value="1">English</option>
                          <option value="2">Hindi</option>
                        </select>
                        {errors.languagetype && (
                          <div className="text-danger">
                            {errors.languagetype}
                          </div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label text-dark">Name</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Name"
                          name="menuname"
                          value={formData.menuname}
                          onChange={handleInputChange}
                        />
                        {errors.menuname && (
                          <div className="text-danger">{errors.menuname}</div>
                        )}
                      </div>

                      {/* Input for Select a content type */}
                      <div className="mb-3">
                        <label className="form-label text-dark">
                          Select a content type
                        </label>
                        <select
                          className="form-select"
                          name="contenttype"
                          value={formData.contenttype}
                          onChange={handleInputChange}
                        >
                          <option value="">Select a content type</option>
                          <option value="4">External Link</option>
                          <option value="3">Internal Link</option>
                          <option value="2">File</option>
                          <option value="1">HTML</option>
                        </select>
                        {errors.contenttype && (
                          <div className="text-danger">
                            {errors.contenttype}
                          </div>
                        )}
                      </div>

                      {/* Input for External Link */}
                      {formData.contenttype === "4" && (
                        <div className="mb-3">
                          <label className="form-label text-dark">
                            Enter External Link
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter External Link"
                            name="external_link"
                            value={formData.external_link}
                            onChange={handleInputChange}
                          />
                          {errors.external_link && (
                            <div className="text-danger">
                              {errors.external_link}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Input for Internal Link */}
                      {formData.contenttype === "3" && (
                        <div className="mb-3">
                          <select
                            className="form-control"
                            name="internal_link"
                            value={formData.internal_link}
                            onChange={handleInputChange}
                            // isInvalid={!!formErrors.internal_link}
                          >
                            <option value="" style={{ color: "black" }}>
                              Select Menu
                            </option>
                            {dropdownOptions.map((data) => (
                              <option
                                key={data.id}
                                value={"/menu/" + data.menu_url}
                              >
                                {"Menu Name" + ":-" + data.menuname}
                              </option>
                            ))}
                          </select>
                          {errors.internal_link && (
                            <div className="text-danger">
                              {errors.internal_link}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Input for File */}
                      {formData.contenttype === "2" && (
                        <div className="mb-3">
                          <label className="form-label text-dark">
                            Choose File
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="file"
                            onChange={handleImageChange}
                          />
                          {errors.file && (
                            <div className="text-danger">{errors.file}</div>
                          )}
                        </div>
                      )}

                      {/* HTML Editor Input */}
                      {formData.contenttype === "1" && (
                        <div className="mb-3">
                          <label className="form-label text-dark">
                            HTML Editor
                          </label>
                          {/* <div></div> */}
                          <JoditEditor
                            value={content}
                            config={config}
                            tabIndex={1}
                            onChange={handleEditorChange}
                          />
                          {errors.editorContent && (
                            <div className="text-danger">
                              {errors.editorContent}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  id="button"
                  className="d-flex "
                  style={{ margin: "10px 10px" }}
                >
                  <Button
                    onClick={handleOpenConfirmation}
                    type="submit"
                    style={{
                      width: 100,
                      color: "white",
                      backgroundColor: "blue",
                      marginRight: 10,
                    }}
                  >
                    Submit
                  </Button>
                  <div className="pagetitle-rgt">
                    <Link to="/dashboard">
                      <button
                        type="button"
                        className="btn btn-info"
                        style={{
                          width: 100,
                          color: "white",
                          backgroundColor: "blue",
                        }}
                      >
                        Back
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <Dialog
                open={confirmDialogOpen}
                onClose={handleCloseConfirmation}
              >
                <DialogTitle>Confirm Submit</DialogTitle>
                <DialogContent>
                  Are you sure you want to submit this data?
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseConfirmation} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleConfirmSubmit} color="primary">
                    Confirm
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
              >
                <DialogTitle>{modalMessage}</DialogTitle>
                <DialogActions>
                  <Button
                    onClick={() => setSnackbarOpen(false)}
                    color="primary"
                  >
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Custom;
