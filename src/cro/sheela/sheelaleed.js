import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./sheelaleed.css";

const initialLead = {
  croName: "",
  leadName: "",
  contact: "",
  reference: "",
  status: ""
};

const croOptions = ["Sheela", "Jeba", "Sindhu"];

function SheelaLeed() {
  const [leads, setLeads] = useState([{ ...initialLead }]);
  const [error, setError] = useState("");

  const handleChange = (index, field, value) => {
    const newLeads = [...leads];
    newLeads[index][field] = value;
    setLeads(newLeads);

    if (index === leads.length - 1 && Object.values(newLeads[index]).every(val => val !== "")) {
      setLeads([...newLeads, { ...initialLead }]);
    }
  };

  const validateForm = () => {
    for (let lead of leads) {
      if (Object.values(lead).every(v => v === "")) continue;
      if (Object.values(lead).some(v => v === "")) {
        setError("⚠ Please fill all fields before submitting.");
        return false;
      }
      if (!/^\d{10}$/.test(lead.contact)) {
        setError("⚠ Contact number must be exactly 10 digits.");
        return false;
      }
    }
    setError("");
    return true;
  };

  // ✅ Updated Submit with Django POST
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const filledLeads = leads.filter(lead => Object.values(lead).every(val => val !== ""));
    try {
      for (const lead of filledLeads) {
        await axios.post("http://127.0.0.1:8000/api/leads/", lead); // backend API
      }
      alert("✅ Lead details saved successfully to database!");
      setLeads([{ ...initialLead }]);
    } catch (error) {
      console.error("Error saving leads:", error);
      alert("❌ Failed to save data! Check your backend connection.");
    }
  };

  // ✅ Excel Export
  const handleExportExcel = () => {
    const filledLeads = leads.filter(lead => Object.values(lead).every(val => val !== ""));
    if (!filledLeads.length) {
      alert("⚠ No data to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filledLeads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Lead_Details.xlsx");
  };

  return (
    <div className="lead-container">
      <h2 className="lead-heading">📂 Lead Entry Form</h2>

      {error && <div className="error">{error}</div>}

      {leads.map((lead, idx) => (
        <div className="lead-row" key={idx}>
          <div className="field">
            <label>CRO Name</label>
            <select
              value={lead.croName}
              onChange={(e) => handleChange(idx, "croName", e.target.value)}
            >
              <option value="">-- Select CRO --</option>
              {croOptions.map(cro => (
                <option key={cro} value={cro}>{cro}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Lead Name</label>
            <input
              type="text"
              value={lead.leadName}
              onChange={(e) => handleChange(idx, "leadName", e.target.value)}
              placeholder="Lead Name"
            />
          </div>

          <div className="field">
            <label>Contact</label>
            <input
              type="text"
              value={lead.contact}
              onChange={(e) => handleChange(idx, "contact", e.target.value)}
              placeholder="1234567890"
              maxLength="10"
            />
          </div>

          <div className="field">
            <label>Reference</label>
            <input
              type="text"
              value={lead.reference}
              onChange={(e) => handleChange(idx, "reference", e.target.value)}
              placeholder="Reference"
            />
          </div>

          <div className="field">
            <label>Status</label>
            <select
              value={lead.status}
              onChange={(e) => handleChange(idx, "status", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Student">Student</option>
              <option value="Working Employee">Working Employee</option>
            </select>
          </div>
        </div>
      ))}

      <div className="submit-container">
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="submit-btn export-btn" onClick={handleExportExcel}>
          Export Excel
        </button>
      </div>
    </div>
  );
}

export default SheelaLeed;
