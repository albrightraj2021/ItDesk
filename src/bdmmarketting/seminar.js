import React, { useState, useEffect } from "react";
import axios from "axios";
import "./seminar.css";

const fetchSeminars = async (setSeminars) => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/seminars/");
    setSeminars(res.data);
  } catch (err) {
    console.error("Failed to fetch seminars", err);
  }
};

const addSeminarBackend = async (formData, setSeminars, setFormData) => {
  try {
    const res = await axios.post("http://127.0.0.1:8000/seminars/", formData);
    setSeminars(prev => [res.data, ...prev]);
    setFormData({
      date: "",
      college: "",
      dept: "",
      resource: "",
      duration: "",
      studentcount: "",
      feedback: "",
    });
  } catch (err) {
    console.error("Failed to add seminar", err);
    alert("Failed to add seminar");
  }
};

const deleteSeminar = async (id, setSeminars, seminars) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/seminars/${id}/`);
    setSeminars(seminars.filter(s => s.id !== id));
  } catch (err) {
    console.error("Delete failed", err);
    alert("Only staff/admin can delete");
  }
};

export default function BdmSeminarTracker() {
  const [seminars, setSeminars] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    college: "",
    dept: "",
    resource: "",
    duration: "",
    studentcount: "",
    feedback: "",
  });

  useEffect(() => {
    fetchSeminars(setSeminars);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAdd = () => {
    const { date, college, dept, resource, duration, studentcount, feedback } = formData;
    if (!date || !college || !dept || !resource || !duration || !studentcount || !feedback) {
      alert("⚠ Fill all fields!");
      return;
    }
    addSeminarBackend(formData, setSeminars, setFormData);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", background: "#f4f7fb", minHeight: "100vh", marginLeft: "250px", marginTop: "50px" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "25px" }}>BDM Seminar Tracker</h2>

      <div className="wrapper">
        {/* Form Box */}
        <div className="form-box">
          <div className="form-container">
            <div>
              <label htmlFor="date">Date</label>
              <input type="date" id="date" value={formData.date} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="college">College</label>
              <input type="text" id="college" placeholder="Enter college name" value={formData.college} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="dept">Department</label>
              <input type="text" id="dept" placeholder="Enter department" value={formData.dept} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="resource">Resource Person</label>
              <input type="text" id="resource" placeholder="Enter resource person name" value={formData.resource} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="duration">Duration</label>
              <input type="text" id="duration" placeholder="e.g. 2 hours" value={formData.duration} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="studentcount">Student Count</label>
              <input type="number" id="studentcount" placeholder="Enter student count" value={formData.studentcount} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="feedback">Feedback</label>
              <textarea id="feedback" rows="2" placeholder="Enter feedback" value={formData.feedback} onChange={handleChange}></textarea>
            </div>
            <button onClick={handleAdd}>Add to Table</button>
          </div>
        </div>

        {/* Table Box */}
        <div className="table-box">
          <table id="seminarTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>College</th>
                <th>Department</th>
                <th>Resource Person</th>
                <th>Duration</th>
                <th>Student Count</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {seminars.map((s) => (
                <tr key={s.id}>
                  <td>{s.date}</td>
                  <td>{s.college}</td>
                  <td>{s.dept}</td>
                  <td>{s.resource}</td>
                  <td>{s.duration}</td>
                  <td>{s.studentcount}</td>
                  <td>{s.feedback}</td>
                  <td>
                    <button
                      onClick={() => deleteSeminar(s.id, setSeminars, seminars)}
                      style={{
                        background: "#f44336",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {seminars.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "15px" }}>No seminars yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="btns">
          <a href="workshop.html">⬅ Back to Workshop Page</a>
        </div>
      </div>
    </div>
  );
}
