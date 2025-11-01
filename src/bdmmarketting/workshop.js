import React, { useState } from "react";
import "./seminar.css";

export default function BdmworkshopTracker() {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const addSeminar = () => {
    const { date, college, dept, resource, duration, studentcount, feedback } =
      formData;

    if (!date || !college || !dept || !resource || !duration || !studentcount || !feedback) {
      alert("⚠ Fill all fields!");
      return;
    }

    setSeminars([...seminars, formData]);
    setFormData({
      date: "",
      college: "",
      dept: "",
      resource: "",
      duration: "",
      studentcount: "",
      feedback: "",
    });
  };

  return (
    <div id="container">
      <h2>Workshop Tracker</h2>

      <div className="wrapper">
        <div className="form-box">
          <div className="form-container">
            <div>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="college">College</label>
              <input
                type="text"
                id="college"
                placeholder="Enter college name"
                value={formData.college}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="dept">Department</label>
              <input
                type="text"
                id="dept"
                placeholder="Enter department"
                value={formData.dept}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="resource">Resource Person</label>
              <input
                type="text"
                id="resource"
                placeholder="Enter resource person name"
                value={formData.resource}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                placeholder="e.g. 2 hours"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="studentcount">Student Count</label>
              <input
                type="number"
                id="studentcount"
                placeholder="Enter student count"
                value={formData.studentcount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="feedback">Feedback</label>
              <textarea
                id="feedback"
                rows="2"
                placeholder="Enter feedback"
                value={formData.feedback}
                onChange={handleChange}
              ></textarea>
            </div>

            <button onClick={addSeminar}>Add to Table</button>
          </div>
        </div>

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
              </tr>
            </thead>
            <tbody>
              {seminars.map((s, index) => (
                <tr key={index}>
                  <td>{s.date}</td>
                  <td>{s.college}</td>
                  <td>{s.dept}</td>
                  <td>{s.resource}</td>
                  <td>{s.duration}</td>
                  <td>{s.studentcount}</td>
                  <td>{s.feedback}</td>
                </tr>
              ))}
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