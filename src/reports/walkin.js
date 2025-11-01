import React, { useState, useEffect } from "react";
import axios from "axios";

const Walkin1 = () => {
  const [financialYear, setFinancialYear] = useState("2025-2026");
  const [studentType, setStudentType] = useState("WALKINN");
  const [month, setMonth] = useState("OCTOBER");
  const [entries, setEntries] = useState("10");
  const [searchValue, setSearchValue] = useState("");
  const [currentData, setCurrentData] = useState([]);

  // ✅ Fetch data from Django API when component mounts
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/walkins/");
      setCurrentData(response.data);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load data from server");
    }
  };

  // ✅ Filter data based on search value (CRO Name) and entries limit
  const displayData = () => {
    let filteredData = currentData;

    // Search by CRO Name
    if (searchValue.trim() !== "") {
      filteredData = filteredData.filter((item) =>
        item.croName.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Filter by month (if needed, assuming walkTime has month info)
    // filteredData = filteredData.filter((item) => getMonthName(item.walkTime) === month);

    return entries === "all"
      ? filteredData
      : filteredData.slice(0, parseInt(entries));
  };

  // ✅ Download as Excel
  const downloadFile = () => {
    const rows = document.querySelectorAll("#walkinTable tr");
    if (rows.length <= 1) {
      alert("No data available to download!");
      return;
    }

    let csvContent = "";
    rows.forEach((row) => {
      const cols = row.querySelectorAll("th, td");
      const rowData = Array.from(cols)
        .map((col) => `"${col.innerText.replace(/"/g, '""')}"`)
        .join(",");
      csvContent += rowData + "\n";
    });

    const blob = new Blob([csvContent], { type: "application/vnd.ms-excel" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Walkin_Report_${studentType}_${month}_${financialYear}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ fontFamily: '"Segoe UI", sans-serif', padding: "30px" ,position: "relative", left: "60px", top:"20px"}}>
      <div style={containerStyle}>
        <h2>Walk-in Report</h2>

        {/* Filters */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>Financial Year</label>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
            style={selectStyle}
          >
            <option value="2025-2026">2025-2026</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
          </select>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Student Type</label>
          <select
            value={studentType}
            onChange={(e) => setStudentType(e.target.value)}
            style={selectStyle}
          >
            <option value="WALKINN">WALKINN</option>
            <option value="ONLINE">ONLINE</option>
            <option value="REFERRAL">REFERRAL</option>
          </select>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            style={selectStyle}
          >
            <option value="OCTOBER">OCTOBER</option>
            <option value="SEPTEMBER">SEPTEMBER</option>
            <option value="AUGUST">AUGUST</option>
          </select>
        </div>

        {/* Table Controls */}
        <div style={tableControlsStyle}>
          <div>
            Show{" "}
            <select
              value={entries}
              onChange={(e) => setEntries(e.target.value)}
              style={selectStyle}
            >
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
          <button onClick={loadData} style={btnStyle}>Refresh Data</button>
          <button onClick={downloadFile} style={btnStyle}>Download Excel</button>
        </div>

        {/* Table */}
        <table id="walkinTable" style={tableStyle}>
          <thead>
            <tr>
              <th>CRO Name</th>
              <th>Technical Staff</th>
              <th>Counseling Staff</th>
              <th>Walk-in Name</th>
              <th>Walk-in Time</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            {displayData().length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            ) : (
              displayData().map((item, i) => (
                <tr key={i}>
                  <td>{item.croName}</td>
                  <td>{item.techStaff}</td>
                  <td>{item.counselingStaff}</td>
                  <td>{item.walkName}</td>
                  <td>{item.walkTime}</td>
                  <td>{item.product}</td>
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

export default Walkin1;
