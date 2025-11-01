import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./sheelademo.css";

const ItSheelaDemo = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    croName: "",
    demoGivenBy: "",
    product: "",
    givenDate: "",
    registerDate: "",
    demoStatus: "",
  });

  const [data, setData] = useState([]);

  const croNames = ["Priya", "Selvi", "Mohan", "Arun", "Deepa"];
  const staffNames = ["Raj", "Kumar", "Divya", "Sneha", "Anand"];
  const products = ["Java", "Python", "Testing", "MERN", "Data Science"];
  const statuses = ["Spot Registered", "Registered"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (
      !formData.studentName ||
      !formData.croName ||
      !formData.demoGivenBy ||
      !formData.product ||
      !formData.givenDate ||
      !formData.registerDate ||
      !formData.demoStatus
    ) {
      alert("Please fill all fields!");
      return;
    }

    setData([...data, formData]);
    setFormData({
      studentName: "",
      croName: "",
      demoGivenBy: "",
      product: "",
      givenDate: "",
      registerDate: "",
      demoStatus: "",
    });
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DemoData");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Demo_Details.xlsx");
  };

  return (
    <div className="demo-container">
      <h1>Demo Details Entry</h1>

      <div className="demo-form">
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Student Name"
        />

        <select name="croName" value={formData.croName} onChange={handleChange}>
          <option value=""> CRO Name</option>
          {croNames.map((cro, index) => (
            <option key={index} value={cro}>
              {cro}
            </option>
          ))}
        </select>

        <select
          name="demoGivenBy"
          value={formData.demoGivenBy}
          onChange={handleChange}
        >
          <option value="">Demo Given By</option>
          {staffNames.map((staff, index) => (
            <option key={index} value={staff}>
              {staff}
            </option>
          ))}
        </select>

        <select
          name="product"
          value={formData.product}
          onChange={handleChange}
        >
          <option value=""> Enquired Product</option>
          {products.map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="givenDate"
          value={formData.givenDate}
          onChange={handleChange}
          placeholder="Demo Given Date"
        />

        <input
          type="date"
          name="registerDate"
          value={formData.registerDate}
          onChange={handleChange}
          placeholder="Registered Date"
        />

        <select
          name="demoStatus"
          value={formData.demoStatus}
          onChange={handleChange}
        >
          <option value="">Select Status</option>
          {statuses.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button className="add-btn" onClick={handleAdd}>
          Register
        </button>
      </div>

      {data.length > 0 && (
        <>
          <table className="demo-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>CRO Name</th>
                <th>Demo Given By</th>
                <th>Product</th>
                <th>Demo Given Date</th>
                <th>Registered Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.studentName}</td>
                  <td>{item.croName}</td>
                  <td>{item.demoGivenBy}</td>
                  <td>{item.product}</td>
                  <td>{item.givenDate}</td>
                  <td>{item.registerDate}</td>
                  <td>{item.demoStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="download-btn" onClick={handleDownload}>
            Download Excel
          </button>
        </>
      )}
    </div>
  );
};

export default ItSheelaDemo;