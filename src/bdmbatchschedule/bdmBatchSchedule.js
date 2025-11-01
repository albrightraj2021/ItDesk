import React, { useState } from "react";

const BdmBatchSchedule = () => {
  const STORAGE_KEY = "pendingBatchRequests";
  const [formData, setFormData] = useState({
    staff: "",
    courseCategory: "",
    student_name: "",
    start_date: "",
    end_date: "",
    batch_type: "",
    duration: "",
    days: [],
    start_time: "",
    end_time: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "days") {
      let newDays = [...formData.days];
      if (checked) newDays.push(value);
      else newDays = newDays.filter((d) => d !== value);
      setFormData({ ...formData, days: newDays });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBatchTypeChange = (e) => {
    setFormData({ ...formData, batch_type: e.target.value, days: [] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBatch = { ...formData, timestamp: new Date().toLocaleString() };
    const allBatches = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    allBatches.push(newBatch);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allBatches));
    alert("✅ Batch details shared successfully with admin!");
    setFormData({
      staff: "",
      courseCategory: "",
      student_name: "",
      start_date: "",
      end_date: "",
      batch_type: "",
      duration: "",
      days: [],
      start_time: "",
      end_time: "",
    });
  };

  const handleClear = () => {
    setFormData({
      staff: "",
      courseCategory: "",
      student_name: "",
      start_date: "",
      end_date: "",
      batch_type: "",
      duration: "",
      days: [],
      start_time: "",
      end_time: "",
    });
  };

  return (
    <div>
      {/* Embed original CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        :root {
          --accent: #00b3cc;
          --accent-hover: #009bb0;
          --bg: #f5f7fa;
          --panel: #ffffff;
          --border: #d9e0e7;
          --text: #333;
        }
        body {
          margin: 0;
          font-family: "Inter", "Segoe UI", Arial, sans-serif;
          background: var(--bg);
          color: var(--text);
        }
        .container {
          max-width: 1100px;
          margin: 40px auto;
          background: var(--panel);
          border-radius: 10px;
          box-shadow: 0 3px 15px rgba(0,0,0,0.08);
          padding: 30px 40px;
          margin-left:180px;
        }
        h2 {
          font-size: 26px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 30px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 200px 1fr;
          align-items: center;
          margin-bottom: 16px;
          gap: 20px;
        }
        label {
          font-weight: 500;
        }
        input, select {
          width: 100%;
          padding: 12px 14px;
          border-radius: 6px;
          border: 1px solid var(--border);
          font-size: 14px;
          box-sizing: border-box;
        }
        input[type="date"], input[type="time"] {
          appearance: none;
        }
        .days {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .days label {
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
        .form-actions {
          margin-top: 25px;
          display: flex;
          gap: 15px;
          justify-content: center;
        }
        button {
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 15px;
        }
        .btn-primary {
          background: var(--accent);
          color: white;
        }
        .btn-primary:hover { background: var(--accent-hover); }
        .btn-secondary {
          background: #f2f2f2;
          color: #333;
          border: 1px solid var(--border);
        }
        .btn-secondary:hover { background: #e8e8e8; }
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Form */}
      <div className="container">
        <h2> BDM Batch Schedule</h2>
        <form onSubmit={handleSubmit} id="batchForm">
          <div className="form-row">
            <label>Salesperson</label>
            <select
              name="staff"
              value={formData.staff}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Jeba">Jeba</option>
              <option value="Sheela">Sheela</option>
              <option value="Sindhu">Sindhu</option>
            </select>
          </div>

          <div className="form-row">
            <label>Course Name</label>
            <input
              type="text"
              name="courseCategory"
              value={formData.courseCategory}
              onChange={handleChange}
              placeholder="Course Name"
              required
            />
          </div>

          <div className="form-row">
            <label>Student Name</label>
            <input
              type="text"
              name="student_name"
              value={formData.student_name}
              onChange={handleChange}
              placeholder="Student Name"
              required
            />
          </div>

          <div className="form-row">
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Batch Type</label>
            <select
              name="batch_type"
              value={formData.batch_type}
              onChange={handleBatchTypeChange}
              required
            >
              <option value="">Select Type</option>
              <option value="regular">Regular</option>
              <option value="weekend">Weekend</option>
            </select>
          </div>

          <div className="form-row">
            <label>Duration (hours)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration"
              min="1"
              required
            />
          </div>

          {formData.batch_type === "regular" && (
            <div className="form-row" id="weekdayDays">
              <label>Days</label>
              <div className="days">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                  <label key={day}>
                    <input
                      type="checkbox"
                      name="days"
                      value={day}
                      checked={formData.days.includes(day)}
                      onChange={handleChange}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>
          )}

          {formData.batch_type === "weekend" && (
            <div className="form-row" id="weekendDays">
              <label>Days</label>
              <div className="days">
                {["Sat", "Sun"].map((day) => (
                  <label key={day}>
                    <input
                      type="checkbox"
                      name="days"
                      value={day}
                      checked={formData.days.includes(day)}
                      onChange={handleChange}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="form-row">
            <label>Start Time</label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>End Time</label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              id="clearBtn"
              className="btn-secondary"
              onClick={handleClear}
            >
              Clear
            </button>
            <button type="submit" className="btn-primary">
              Share Batch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BdmBatchSchedule;