import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ReportLeed = () => {
  const [financialYear, setFinancialYear] = useState("2025-2026");
  const [studentType, setStudentType] = useState("WALKINN");
  const [month, setMonth] = useState("OCTOBER");
  const [entries, setEntries] = useState("10");
  const [searchValue, setSearchValue] = useState("");
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");

  // ✅ Fetch leads from Django API
  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/leads/"); // <-- Your API endpoint
      setLeads(response.data);
    } catch (err) {
      console.error("Error fetching leads:", err);
      alert("Failed to load leads from server");
    }
  };

  // Filtered display based on search and entries
  const displayData = () => {
    let filteredData = leads;

    if (searchValue.trim() !== "") {
      filteredData = filteredData.filter((item) =>
        item.croName.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Optionally, filter by month or student type if your DB has those fields
    // filteredData = filteredData.filter(item => item.month === month && item.studentType === studentType);

    return entries === "all" ? filteredData : filteredData.slice(0, parseInt(entries));
  };

  // ✅ Export to Excel
  const handleExportExcel = () => {
    const filteredLeads = displayData();
    if (!filteredLeads.length) {
      alert("⚠ No data to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredLeads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Leads_Report_${studentType}_${month}_${financialYear}.xlsx`);
  };

  return (
    <div style={{ fontFamily: '"Segoe UI", sans-serif', padding: "30px", position: "relative", left: "60px", top: "20px" }}>
      <div style={containerStyle}>
        <h2>Lead Report</h2>

        {/* Filters */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>Financial Year</label>
          <select value={financialYear} onChange={(e) => setFinancialYear(e.target.value)} style={selectStyle}>
            <option value="2025-2026">2025-2026</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
          </select>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Student Type</label>
          <select value={studentType} onChange={(e) => setStudentType(e.target.value)} style={selectStyle}>
            <option value="WALKINN">WALKINN</option>
            <option value="ONLINE">ONLINE</option>
            <option value="REFERRAL">REFERRAL</option>
          </select>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Month</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)} style={selectStyle}>
            <option value="OCTOBER">OCTOBER</option>
            <option value="SEPTEMBER">SEPTEMBER</option>
            <option value="AUGUST">AUGUST</option>
          </select>
        </div>

        {/* Table Controls */}
        <div style={tableControlsStyle}>
          <div>
            Show{" "}
            <select value={entries} onChange={(e) => setEntries(e.target.value)} style={selectStyle}>
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="all">All</option>
            </select>{" "}
            entries
          </div>

          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search by CRO Name (Sheela, Jeba, Sindhu)..."
            style={{ padding: "8px 10px", borderRadius: "6px" }}
          />
        </div>

        {/* Buttons */}
        <div style={buttonContainerStyle}>
          <button onClick={loadLeads} style={btnStyle}>Refresh Data</button>
          <button onClick={handleExportExcel} style={btnStyle}>Export Excel</button>
        </div>

        {error && <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>}

        {/* Table */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>CRO Name</th>
              <th>Lead Name</th>
              <th>Contact</th>
              <th>Reference</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {displayData().length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No data available</td>
              </tr>
            ) : (
              displayData().map((item, i) => (
                <tr key={i}>
                  <td>{item.croName}</td>
                  <td>{item.leadName}</td>
                  <td>{item.contact}</td>
                  <td>{item.reference}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: "1100px",
  backgroundColor: "#fff",
  padding: "30px 40px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  margin: "auto",
  marginLeft: "200px",
};

const formGroupStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  flexWrap: "wrap",
  margin: "30px",
};

const labelStyle = {
  flex: "0 0 200px",
  fontWeight: 600,
  color: "#333",
};

const selectStyle = {
  flex: 1,
  padding: "10px",
  fontSize: "15px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  outline: "none",
};

const btnStyle = {
  backgroundColor: "#00bcd4",
  color: "white",
  fontSize: "16px",
  fontWeight: 600,
  border: "none",
  padding: "12px 30px",
  borderRadius: "6px",
  cursor: "pointer",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginRight: "30px",
  marginTop: "-10px",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const tableControlsStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "30px",
  flexWrap: "wrap",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "25px",
  border: "1px solid #ccc",
};

export default ReportLeed;
