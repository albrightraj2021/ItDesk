import React, { useState, useEffect } from "react";
import "./techattendrep.css";

const TechReport = () => {
  const API_URL = "http://localhost:8000/api/attendance/";

  const [attendanceData, setAttendanceData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState(""); // Regular / Weekend

  // Fetch data from backend
  const fetchAttendance = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setAttendanceData(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Delete record
  const handleDelete = async (id) => {
    if (window.confirm("Delete this record?")) {
      try {
        const res = await fetch(`${API_URL}${id}/`, { method: "DELETE" });
        if (res.ok) {
          fetchAttendance();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Filter and search
  const filteredData = attendanceData.filter((row) => {
    const matchesSearch =
      row.staff.toLowerCase().includes(search.toLowerCase()) ||
      row.student_name.toLowerCase().includes(search.toLowerCase()) ||
      row.product.toLowerCase().includes(search.toLowerCase()) ||
      row.type.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filterType ? row.type === filterType : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="tech-page">
      <div className="tech-page-header">
        <h2>Attendance Report</h2>
        <button className="tech-back-btn" onClick={() => window.history.back()}>
          Back →
        </button>
      </div>

      <div className="tech-panel">
        <div className="tech-search-bar">
          <input
            type="text"
            placeholder="Search by Staff, Student, Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Regular">Regular</option>
            <option value="Weekend">Weekend</option>
          </select>
        </div>

        {filteredData.length > 0 ? (
          <div className="tech-table-wrap">
            <table className="tech-table">
              <thead>
                <tr>
                  <th>Staff</th>
                  <th>Date</th>
                  <th>Student</th>
                  <th>Timing</th>
                  <th>Day</th>
                  <th>Type</th>
                  <th>Product</th>
                  <th>Attendance</th>
                  <th>Module</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.id}>
                    <td data-label="Staff">{row.staff}</td>
                    <td data-label="Date">{row.date}</td>
                    <td data-label="Student">{row.student_name}</td>
                    <td data-label="Timing">{row.timing}</td>
                    <td data-label="Day">{row.day}</td>
                    <td data-label="Type">{row.type}</td>
                    <td data-label="Product">{row.product}</td>
                    <td data-label="Attendance">{row.attendance}</td>
                    <td data-label="Module">{row.module}</td>
                    <td data-label="Start Date">{row.start_date}</td>
                    <td data-label="End Date">{row.end_date}</td>
                    <td data-label="Action">
                      <button
                        className="tech-btn-delete"
                        onClick={() => handleDelete(row.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="tech-empty-msg">No records found.</div>
        )}
      </div>
    </div>
  );
};

export default TechReport;
