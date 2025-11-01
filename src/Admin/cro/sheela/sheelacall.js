import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./sheelacall.css";

const initialRow = {
  croName: "",
  date: "",
  numbers: "",
  customerName: "",
  status: "",
  collegeCompleted: "",
  callTiming: ""
};

const croOptions = ["Sheela", "Jeba", "Sindhu"];

function ASheelaCall() {
  const [rows, setRows] = useState([{ ...initialRow }]);
  const [error, setError] = useState("");

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);

    // Auto add new empty row when last one is filled
    if (index === rows.length - 1 && Object.values(newRows[index]).every(val => val !== "")) {
      setRows([...newRows, { ...initialRow }]);
    }
  };

  const validateForm = () => {
    for (let row of rows) {
      if (Object.values(row).every(v => v === "")) continue;
      if (Object.values(row).some(v => v === "")) {
        setError("⚠ Please fill all fields before submitting.");
        return false;
      }
      if (!/^\d{10}$/.test(row.numbers)) {
        setError("⚠ Phone number must be exactly 10 digits.");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const filledRows = rows.filter(row => Object.values(row).every(val => val !== ""));
    console.log("Submitted Call Data:", filledRows);
    alert("✅ Call details submitted successfully!");
    setRows([{ ...initialRow }]);
  };

  const handleExportExcel = () => {
    const filledRows = rows.filter(row => Object.values(row).every(val => val !== ""));
    if (!filledRows.length) {
      alert("⚠ No data to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filledRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Calls");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Call_Details.xlsx");
  };

  return (
    <div className="call-container">
      <h2 className="call-heading">📞 Call Details Entry</h2>
      {error && <div className="error">{error}</div>}

      {rows.map((row, idx) => (
        <div className="call-row" key={idx}>
          <div className="field">
            <label>CRO Name</label>
            <select
              value={row.croName}
              onChange={(e) => handleChange(idx, "croName", e.target.value)}
            >
              <option value="">-- Select CRO --</option>
              {croOptions.map((cro) => (
                <option key={cro} value={cro}>
                  {cro}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Date</label>
            <input
              type="date"
              value={row.date}
              onChange={(e) => handleChange(idx, "date", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Number</label>
            <input
              type="text"
              value={row.numbers}
              onChange={(e) => handleChange(idx, "numbers", e.target.value)}
              placeholder="1234567890"
              maxLength="10"
            />
          </div>

          <div className="field">
            <label>Customer Name</label>
            <input
              type="text"
              value={row.customerName}
              onChange={(e) => handleChange(idx, "customerName", e.target.value)}
              placeholder="Customer Name"
            />
          </div>

          <div className="field">
            <label>Student/Working</label>
            <select
              value={row.status}
              onChange={(e) => handleChange(idx, "status", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Student">Student</option>
              <option value="Working">Working</option>
            </select>
          </div>

          <div className="field">
            <label>College Completed</label>
            <select
              value={row.collegeCompleted}
              onChange={(e) => handleChange(idx, "collegeCompleted", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="field">
            <label>Call Timing</label>
            <input
              type="time"
              value={row.callTiming}
              onChange={(e) => handleChange(idx, "callTiming", e.target.value)}
            />
          </div>
        </div>
      ))}

      <div className="submit-container">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        <button
          className="submit-btn export-btn"
          onClick={handleExportExcel}
        >
          Export Excel
        </button>
      </div>
    </div>
  );
}

export default ASheelaCall;