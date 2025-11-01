import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ItCollection() {
  const [filters, setFilters] = useState({
    year: "2025-2026",
    centre: "",
    employee: "ALL",
    fromDate: "",
    toDate: "",
  });

  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleShowDetails = () => {
    const sampleData = [
      {
        centre: "Chennai",
        receiptNo: "R001",
        student: "Karthik",
        mobile: "9876543210",
        employee: "Selva",
        amount: "12000",
        mode: "Cash",
        remarks: "Paid fully",
      },
    ];
    setData(sampleData);
  };

  const downloadExcel = () => {
    if (data.length === 0) {
      alert("⚠️ No data to download!");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Collection Report");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "CollectionReport.xlsx");
  };

  return (
    <>
      <style>{`
        .collection-container {
          background-color: #f9fafc;
          min-height: 100vh;
          padding: 70px 30px 40px 30px; /* extra top space */
          font-family: "Segoe UI", sans-serif;
          margin-left: 250px; /* align with sidebar */
          transition: all 0.3s ease;
        }

        .collection-title {
          text-align: center;
          color: #0d47a1;
          font-size: 30px;
          margin-bottom: 25px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .filter-card {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }

        .filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .filter-grid label {
          display: block;
          font-size: 14px;
          color: #333;
          margin-bottom: 6px;
          font-weight: 600;
        }

        .filter-grid input,
        .filter-grid select {
          width: 100%;
          padding: 8px 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
        }

        .button-group {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .button-group button {
          background-color: #007bff;
          color: white;
          padding: 8px 20px;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          cursor: pointer;
          transition: 0.2s;
        }

        .button-group button:hover {
          background-color: #0056b3;
        }

        .excel-btn {
          background-color: #28a745;
        }

        .excel-btn:hover {
          background-color: #1e7e34;
        }

        .table-card {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: center;
          min-width: 800px;
        }

        thead {
          background-color: #0047ab;
          color: white;
        }

        th,
        td {
          padding: 10px 8px;
          border-bottom: 1px solid #ddd;
        }

        .no-data {
          color: #888;
          font-style: italic;
          text-align: center;
        }

        @media (max-width: 992px) {
          .collection-container {
            margin-left: 0;
            padding: 50px 20px;
          }

          .collection-title {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="collection-container">
        <h1 className="collection-title">It Collection Report</h1>

        <div className="filter-card">
          <div className="filter-grid">
            <div>
              <label>Financial Year</label>
              <input
                type="text"
                name="year"
                value={filters.year}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div>
              <label>Centre</label>
              <select name="centre" value={filters.centre} onChange={handleChange}>
                <option value="">-- All Centres --</option>
                <option value="Chennai">Chennai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Madurai">Madurai</option>
              </select>
            </div>

            <div>
              <label>Employee</label>
              <select
                name="employee"
                value={filters.employee}
                onChange={handleChange}
              >
                <option value="ALL">ALL</option>
                <option value="Selva">Selva</option>
                <option value="Wincy">Wincy</option>
                <option value="Thanika">Thanika</option>
              </select>
            </div>

            <div>
              <label>From Date</label>
              <input
                type="date"
                name="fromDate"
                value={filters.fromDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>To Date</label>
              <input
                type="date"
                name="toDate"
                value={filters.toDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="button-group">
            <button onClick={handleShowDetails}>Show Details</button>
            <button onClick={downloadExcel} className="excel-btn">
              Download Excel
            </button>
          </div>
        </div>

        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Centre</th>
                <th>Receipt No</th>
                <th>Student</th>
                <th>Mobile</th>
                <th>Employee</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">
                    No data to show
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <tr key={index}>
                    <td>{row.centre}</td>
                    <td>{row.receiptNo}</td>
                    <td>{row.student}</td>
                    <td>{row.mobile}</td>
                    <td>{row.employee}</td>
                    <td>{row.amount}</td>
                    <td>{row.mode}</td>
                    <td>{row.remarks}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
