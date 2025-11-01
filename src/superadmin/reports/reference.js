import React, { useState } from "react";
import "./reference.css";

const SReferenceReport = () => {
  const [financialYear, setFinancialYear] = useState("2025-2026");
  const [centre, setCentre] = useState("");
  const [employee, setEmployee] = useState("ALL");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [entriesToShow, setEntriesToShow] = useState("10");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  const generateReport = () => {
    // Placeholder - replace with API logic later
    setData([]);
  };

  const filterTable = (rows) => {
    if (!searchQuery.trim()) return rows;
    return rows.filter((row) =>
      Object.values(row).some((val) =>
        val.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  const updateTableDisplay = (rows) => {
    if (entriesToShow === "all") return rows;
    return rows.slice(0, parseInt(entriesToShow, 10));
  };

  const downloadExcel = () => {
    const filteredData = filterTable(data);
    if (filteredData.length === 0) {
      alert("No data available to download!");
      return;
    }

    let csvContent =
      "Date,Centre,Employee,Student,Mobile,Reference By,Course\n";

    filteredData.forEach((row) => {
      const rowData = [
        row.date,
        row.centre,
        row.employee,
        row.student,
        row.mobile,
        row.referenceBy,
        row.course,
      ]
        .map((item) => `${item}`) // ✅ backticks for template literal
        .join(",");
      csvContent += rowData + "\n";
    });

    const blob = new Blob([csvContent], {
      type: "application/vnd.ms-excel",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Reference_Report_${centre || "All"}_${financialYear}.xls`; // ✅ backticks
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredData = filterTable(data);
  const displayedData = updateTableDisplay(filteredData);

  return (
    <div className="container">
      <h1>Reference Report</h1>

      {/* Filters */}
      <div className="filter-grid">
        <div className="filter-field">
          <label>Financial Year</label>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
          >
            <option value="2025-2026">2025-2026</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
          </select>
        </div>

        <div className="filter-field">
          <label>Centre</label>
          <select value={centre} onChange={(e) => setCentre(e.target.value)}>
            <option value="">-- All Centres --</option>
            <option value="NSNCV024">NSNCV024</option>
            <option value="NSNCV025">NSNCV025</option>
            <option value="NSNCV026">NSNCV026</option>
          </select>
        </div>

        <div className="filter-field">
          <label>Employee</label>
          <select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          >
            <option value="ALL">ALL</option>
            <option value="EMP001">EMP001</option>
            <option value="EMP002">EMP002</option>
          </select>
        </div>

        <div className="filter-field">
          <label>From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="filter-field">
          <label>To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="actions">
        <button className="btn primary" onClick={generateReport}>
          Show Details
        </button>
        <button className="btn secondary" onClick={downloadExcel}>
          Download Excel
        </button>
      </div>

      {/* Table Controls */}
      <div className="table-controls">
        <div>
          Show{" "}
          <select
            className="entries-select"
            value={entriesToShow}
            onChange={(e) => setEntriesToShow(e.target.value)}
          >
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="all">All</option>
          </select>{" "}
          entries
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table id="reportTable">
          <thead>
            <tr>
              <th>Date</th>
              <th>Centre</th>
              <th>Employee</th>
              <th>Student</th>
              <th>Mobile</th>
              <th>Reference By</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.centre}</td>
                  <td>{row.employee}</td>
                  <td>{row.student}</td>
                  <td>{row.mobile}</td>
                  <td>{row.referenceBy}</td>
                  <td>{row.course}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty">
                  No data to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferenceReport;
