// ISHA 4thFeb

import { useState, useEffect, useCallback, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
//import { Link } from "react-router-dom";
import JoditEditor from "jodit-react";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";
import {
  Button,
  Snackbar,
  DialogTitle, // Add this import
  DialogContent,
  Dialog,
} from "@mui/material";
import APIClient from "../../../API/APIClient";
import apis from "../../../API/API.json";

const CreateMenu = () => {
  const [html, setHtml] = useState("");
  const [file, setFile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  //const [editorContent, setEditorContent] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  //const [formErrors, setFormErrors] = useState({});

  const config = useMemo(
    () => ({
      readonly: false,
    }),
    []
  );

  const onChange = useCallback((newContent) => {
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
    submenu_id: 0,
    file: "",
    html: "",
    languagetype: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      menuname: "",
      contenttype: "",
      external_link: "",
      internal_link: "",
      submenu_id: 0,
      file: "",
      html: "",
      languagetype: "",
    });
  }, []);

  const handleEditorChange = (content) => {
    setHtml(content);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.menuname) {
      newErrors.menuname = "Name is required";
    }
    if (!formData.menuname) {
      errors.menuname = "Please enter your Menu Name";
    } else if (
      !/^[A-Za-z ]+$/.test(formData.menuname) &&
      parseInt(formData.languagetype) == 1
    ) {
      errors.menuname = "Please input alphabet characters only";
    } else if (
      !/^[\u0900-\u097F\s]+$/.test(formData.menuname) &&
      parseInt(formData.languagetype) == 2
    ) {
      errors.menuname = "कृपया केवल हिंदी शब्द ही इनपुट करें";
    }

    if (!formData.contenttype) {
      newErrors.contenttype = "Select a content type";
    }
    if (!formData.languagetype) {
      newErrors.languagetype = "Select a Language";
    }

    if (formData.contenttype === "4" && !formData.external_link) {
      newErrors.external_link = "External Link is required";
    }

    if (formData.contenttype === "2") {
      if (!file) {
        newErrors.file = "File is required";
      } else if (file.type !== "application/pdf") {
        newErrors.file = "Only PDF files are allowed";
      }
    }

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
      formDataToSend.append("MenuUrl", formData.MenuUrl);
      formDataToSend.append("submenu_id", formData.submenu_id);
      formDataToSend.append("languagetype", formData.languagetype);
      formDataToSend.append("CreatedBy", "Neha");

      if (formData.contenttype === "4") {
        formDataToSend.append("external_link", formData.external_link);
      } else if (formData.contenttype === "3") {
        formDataToSend.append("internal_link", formData.internal_link);
      } else if (formData.contenttype === "2") {
        formDataToSend.append("file", file);
      } else if (formData.contenttype === "1") {
        formDataToSend.append("html", content);
      }

      const response = await APIClient.post(apis.createMenu, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setFormData({
          menuname: "",
          contenttype: "",
          external_link: "",
          internal_link: "",
          submenu_id: 0,
          file: "",
          html: "",
          languagetype: "",
          CreatedBy: "Neha",
        });

        toast.success("Data saved and send for approval!");
        setModalMessage("Data saved and send for approval!");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data. Please try again.");
    }
  };
  useEffect(() => {
    async function fetchData1() {
      try {
        setLoading(true);
        const response = await APIClient.get(apis.topMenu);
        setDropdownOptions(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized access. Please log in.");
        } else {
          toast.error("Something Went Wrong!");
          console.error("Error saving/updating data:", error);
        }
      }
    }
    fetchData1();
  }, []);

  return (
   
        <div className="row justify-content-center">
          <div className="formdata">
            <div className="card">
              <div className="card-body">
                <div className="mb-3 mt-md-4">
                  <div className="box-sec">
                    <h1 className="text-center text-dark heading-main">Menu</h1>
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
                        <option value="0">Select a Language</option>
                        <option value="1">English</option>
                        <option value="2">Hindi</option>
                      </select>
                      {errors.languagetype && (
                        <div className="text-danger">{errors.languagetype}</div>
                      )}
                    </div>
                    {/* Input for Name */}
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
                        <div className="text-danger">{errors.contenttype}</div>
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
                          //isInvalid={!!formErrors.internal_link}
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
                        <div></div>
                        <JoditEditor
                          value={content}
                          config={config}
                          tabIndex={1}
                          onChange={onChange}
                        />
                        {errors.editorContent && (
                          <div className="text-danger">
                            {errors.editorContent}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="btnsubmit">
                    <button
                      className="btn btn-primary"
                      onClick={handleOpenConfirmation}
                    >
                      Submit
                    </button>

                    <Dialog
                      open={confirmDialogOpen}
                      onClose={handleCloseConfirmation}
                    >
                      <DialogTitle>Confirm Submit</DialogTitle>
                      <DialogContent>
                        Are you sure you want to submit this data?
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleCloseConfirmation}
                          color="primary"
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleConfirmSubmit} color="primary">
                          Confirm
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Snackbar
                      open={snackbarOpen}
                      autoHideDuration={3000} // Adjust as needed
                      onClose={() => setSnackbarOpen(false)}
                    >
                      <Alert
                        severity="success"
                        onClose={() => setSnackbarOpen(false)}
                      >
                        {modalMessage}
                      </Alert>
                    </Snackbar>
                    <Snackbar
                      open={snackbarOpen}
                      autoHideDuration={3000} // Adjust as needed
                      onClose={() => setSnackbarOpen(false)}
                    >
                      <Alert
                        severity="success"
                        onClose={() => setSnackbarOpen(false)}
                      >
                        Data Save successfully.
                      </Alert>
                    </Snackbar>
                    <ToastContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
     
  );
};
export default CreateMenu;
