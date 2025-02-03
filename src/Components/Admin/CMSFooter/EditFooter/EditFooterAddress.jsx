import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ViewListIcon from '@mui/icons-material/ViewList';
import apiClient from '../../../../Api/ApiClient';
import apis from '../../../../Api/api.json';

import HomeIcon from '@mui/icons-material/Home';
export const EditFooterAddress = () => {
  const {id}= useParams()
  const [html, setHtml] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    tittle_name: '',
    address: '',
    mobile_no: '',
    footertype:3,
    contenttype:0,
    languagetype: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tittle_name.trim()) {
      newErrors.tittle_name = 'Name is required';
    }
    if (!formData.languagetype) {
      newErrors.languagetype = 'Language Type is Required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.mobile_no) {
      errors.mobile_no = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile_no)) {
      errors.mobile_no = "Invalid mobile number format";
    }
  

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    async function fetchData() {
      try {
       
        const response = await apiClient.get(apis.getfooterbyid+id);
        setFormData(response.data);
     
      } catch (error) {
        console.error('Error fetching user data:', error);
       
      }
    }
    fetchData();
  }, [id]);
 

  const handleConfirmSubmit = async () => {
    try {
      if (validateForm()) {
        const formDataToSend = new FormData();
        formDataToSend.append('tittle_name', formData.tittle_name);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('mobile_no', formData.mobile_no);
        formDataToSend.append('footertype', formData.footertype);
        formDataToSend.append('contenttype', formData.contenttype);
        formDataToSend.append('languagetype', formData.languagetype);

        const response = await apiClient.put("/api/lowerfooter/put/"+id, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
         
    
        });

        // Clear the form fields
        setFormData({
          tittle_name: '',
          address: '',
          mobile_no: '',
          languagetype: '',
        });
        // console.log('Data saved:', response.data);
        setModalMessage('Data saved successfully!');
        setSnackbarOpen(true);

      
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="row">
      <div class="card">
              <div class="card-body">
      <h1 className="text-center">Office address</h1>
      </div>
      <div className="row justify-content-center">
        <div >
        <div className="mb-3">
                  <label className="form-label text-dark">Language Type</label>
                  <select
                    className="form-select"
                    name="languagetype"
                    value={formData.languagetype}
                    onChange={handleInputChange}
                  >
                    <option value=" ">Select a Language</option>
                    <option value="1">English</option>
                    <option value="2">Hindi</option>
                  </select>
                  {errors.languagetype && <div className="text-danger">{errors.languagetype}</div>}
                </div>
          <div className="mb-3">
            <label className="form-label text-dark">Enter Title</label>
            <input
              className="form-control"
              type="text"
              placeholder="Name"
              name="tittle_name"
              value={formData.tittle_name}
              onChange={handleInputChange}
            />
            {errors.tittle_name && <div className="text-danger">{errors.tittle_name}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Address</label>
            <textarea
              className="form-control"
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <div className="text-danger">{errors.address}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label text-dark">Phone No</label>
            <input
              className="form-control"
              type="text"
              placeholder="Phone No"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleInputChange}
              maxLength={10}
              minLength={10}
            />
            {errors.mobile_no && <div className="text-danger">{errors.mobile_no}</div>}
          </div>

          <div className="btnsubmit">
            <button className="btn btn-primary" onClick={handleConfirmSubmit}>
              Submit
            </button>
            
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};
