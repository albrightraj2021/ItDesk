import React, { useState } from "react";

export default function Followup() {
  const [allData, setAllData] = useState([]);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");

  // Filter states
  const [financialYear, setFinancialYear] = useState("2025-2026");
  const [centre, setCentre] = useState("-- All Centres --");
  const [employee, setEmployee] = useState("ALL");
  const [fromDate, setFromDate] = useState("2025-10-01");
  const [toDate, setToDate] = useState("2025-10-31");

  const generateReport = () => {
    const data = [
      {
        date: "2025-10-05",
        centre: "NSNCV024",
        employee: "EMP001",
        student: "John Doe",
        course: "React Basics",
        remarks: "Good progress",
        status: "Completed",
      },
      {
        date: "2025-10-10",
        centre: "NSNCV025",
        employee: "EMP002",
        student: "Jane Smith",
        course: "Advanced JS",
        remarks: "Needs improvement",
        status: "Pending",
      },
      // Add more data as needed
    ];

    // Filter based on filter values
    const filtered = data.filter((r) => {
      const date = new Date(r.date);
      const from = new Date(fromDate);
      const to = new Date(toDate);

      if (centre !== "-- All Centres --" && r.centre !== centre) return false;
      if (employee !== "ALL" && r.employee !== employee) return false;
      if (date < from || date > to) return false;

      return true;
    });

    setAllData(filtered);
  };

  // Filter for search input
  const filteredData = allData.filter(
    (r) =>
      r.student?.toLowerCase().includes(search.toLowerCase()) ||
      r.course?.toLowerCase().includes(search.toLowerCase()) ||
      r.status?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination by entries
  const showData = filteredData.slice(0, entries);

  const downloadExcel = () => {
    let csv = "Date,Centre,Employee,Student,Course,Remarks,Status\n";
    allData.forEach((r) => {
      csv += `${r.date},${r.centre},${r.employee},${r.student},${r.course},${r.remarks},${r.status}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Followup_Report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <style>{`
        .container {
          max-width: 1150px;
          margin: 40px auto;
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 3px 12px rgba(0,0,0,0.08);
          font-family: 'Segoe UI', sans-serif;
        }

        h1 {
          text-align: center;
          font-size: 24px;
          color: #002244;
          margin-bottom: 30px;
        }

        .filter-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
          margin-left:200px;
        }

        .filter-field label {
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          
        }

        select,
        input[type="date"] {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          height: 42px;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
          gap: 12px;
        }

        .btn {
          padding: 10px 20px;
          font-size: 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

        .btn.primary {
          background-color: #0066ff;
          color: white;
        }
        .btn.primary:hover {
          background-color: #004fcc;
        }

        .btn.secondary {
          background-color: #eef3ff;
          color: #0066ff;
          border: 1px solid #c3d4ff;
        }
        .btn.secondary:hover {
          background-color: #d6e0ff;
        }

        .table-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 30px;
          margin-bottom: 10px;
        }

        .left-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #333;
        }

        .left-controls label {
          font-weight: 600;
        }

        .left-controls select {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 14px;
          height: 32px;
          margin-left:200px;
        }

        .search-box input {
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #ccc;
          width: 200px;
          font-size: 14px;
        }

        .table-container {
          overflow-x: auto;
          border: 1px solid #eee;
          border-radius: 8px;
          margin-left:200px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }

        thead {
          background-color: #f0f4ff;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        tbody tr:nth-child(even) {
          background-color: #fafbff;
        }

        .empty {
          text-align: center;
          padding: 20px;
          color: #777;
        }
      `}</style>

      <h1>Followup Report</h1>

      {/* FILTERS */}
      <div className="filter-grid">
        <div className="filter-field">
          <label>Financial Year</label>
          <select
            value={financialYear}
            onChange={(e) => setFinancialYear(e.target.value)}
          >
            <option>2025-2026</option>
            <option>2024-2025</option>
            <option>2023-2024</option>
          </select>
        </div>

        <div className="filter-field">
          <label>Centre</label>
          <select value={centre} onChange={(e) => setCentre(e.target.value)}>
            <option>-- All Centres --</option>
            <option>NSNCV024</option>
            <option>NSNCV025</option>
          </select>
        </div>

        <div className="filter-field">
          <label>Employee</label>
          <select value={employee} onChange={(e) => setEmployee(e.target.value)}>
            <option>ALL</option>
            <option>EMP001</option>
            <option>EMP002</option>
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

      {/* BUTTONS */}
      <div className="actions">
        <button className="btn primary" onClick={generateReport}>
          Search
        </button>
        <button className="btn secondary" onClick={downloadExcel}>
          Download Excel
        </button>
      </div>

      {/* TABLE CONTROLS */}
      <div className="table-controls">
        <div className="left-controls">
          <label>Show</label>
          <select value={entries} onChange={(e) => setEntries(parseInt(e.target.value))}>
            <option>10</option>
            <option>30</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span>entries</span>
        </div>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Centre</th>
              <th>Employee</th>
              <th>Student</th>
              <th>Course</th>
              <th>Remarks</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {showData.length > 0 ? (
              showData.map((r, i) => (
                <tr key={i}>
                  <td>{r.date}</td>
                  <td>{r.centre}</td>
                  <td>{r.employee}</td>
                  <td>{r.student}</td>
                  <td>{r.course}</td>
                  <td>{r.remarks}</td>
                  <td>{r.status}</td>
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
}
