import React, { useState, useEffect } from "react";
import "./attendance.css";

const SAttendance = () => {
  const API_URL = "http://localhost:8000/api/attendance/";

  const [formData, setFormData] = useState({
    staff: "",
    date: "",
    student_name: "",
    timing: "",
    day: "",
    type: "",
    product: "",
    attendance: "",
    module: "",
    start_date: "",
    end_date: ""
  });

  const [attendanceData, setAttendanceData] = useState([]);

  // Fetch attendance records from backend
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

  // Handle form input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Attendance added successfully!");
        setFormData({
          staff: "",
          date: "",
          student_name: "",
          timing: "",
          day: "",
          type: "",
          product: "",
          attendance: "",
          module: "",
          start_date: "",
          end_date: ""
        });
        fetchAttendance(); // Refresh table
      } else {
        alert("Error adding attendance");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  const handleClear = () => {
    setFormData({
      staff: "",
      date: "",
      student_name: "",
      timing: "",
      day: "",
      type: "",
      product: "",
      attendance: "",
      module: "",
      start_date: "",
      end_date: ""
    });
  };

  // Delete record
  const handleDelete = async (id) => {
    if (window.confirm("Delete this record?")) {
      try {
        const res = await fetch(`${API_URL}${id}/`, { method: "DELETE" });
        if (res.ok) {
          fetchAttendance(); // Refresh table
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Attendance Details</h2>
        <button className="back" onClick={() => window.history.back()}>Back →</button>
      </div>

      <div className="panel">
        <form id="attendanceForm" onSubmit={handleSubmit}>
          <div className="form-grid">
            <input type="text" id="staff" placeholder="Staff" required value={formData.staff} onChange={handleChange} />
            <input type="text" id="date" placeholder="Date" value={formData.date} onChange={handleChange}
              onFocus={(e) => e.target.type="date"} onBlur={(e) => !e.target.value && (e.target.type="text")} />
            <input type="text" id="student_name" placeholder="Student Name" required value={formData.student_name} onChange={handleChange} />
            <input type="text" id="timing" placeholder="Timing (eg: 10.00 AM - 12.00 PM)" required value={formData.timing} onChange={handleChange} />
            <input type="text" id="day" placeholder="Day" required value={formData.day} onChange={handleChange} />
            <select id="type" required value={formData.type} onChange={handleChange}>
              <option value="">Select Type</option>
              <option>Regular</option>
              <option>Weekend</option>
            </select>
            <input type="text" id="product" placeholder="Product" required value={formData.product} onChange={handleChange} />
            <select id="attendance" required value={formData.attendance} onChange={handleChange}>
              <option value="">Present/Absent</option>
              <option>Present</option>
              <option>Absent</option>
            </select>
            <input type="text" id="module" placeholder="Module" required value={formData.module} onChange={handleChange} />
            <input type="text" id="start_date" placeholder="Start Date" required value={formData.start_date} onChange={handleChange}
              onFocus={(e) => e.target.type="date"} onBlur={(e) => !e.target.value && (e.target.type="text")} />
            <input type="text" id="end_date" placeholder="End Date" required value={formData.end_date} onChange={handleChange}
              onFocus={(e) => e.target.type="date"} onBlur={(e) => !e.target.value && (e.target.type="text")} />
          </div>

          <div className="form-actions">
            <button type="button" className="back" onClick={handleClear}>Clear</button>
            <button type="submit" className="btn-add">Add</button>
          </div>
        </form>

        {attendanceData.length > 0 ? (
          <div className="table-wrap">
            <table id="attendanceTable">
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
                {attendanceData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.staff}</td>
                    <td>{row.date}</td>
                    <td>{row.student_name}</td>
                    <td>{row.timing}</td>
                    <td>{row.day}</td>
                    <td>{row.type}</td>
                    <td>{row.product}</td>
                    <td>{row.attendance}</td>
                    <td>{row.module}</td>
                    <td>{row.start_date}</td>
                    <td>{row.end_date}</td>
                    <td><button className="btn-delete" onClick={() => handleDelete(row.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-msg">No records added yet.</div>
        )}
      </div>
    </div>
  );
};

export default SAttendance;
