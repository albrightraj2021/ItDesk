// File: TrainingSchedule.jsx
import React, { useState, useEffect } from "react";

export default function STrainingSchedule() {
  const STORAGE_KEY = "trainingSchedules_v1";

  const [form, setForm] = useState({
    entryDate: "",
    entryTime: "",
    productName: "",
    productStart: "",
    productEnd: "",
    trainer: "",
    details: "",
  });
  const [schedules, setSchedules] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setSchedules(saved);
    } catch {
      setSchedules([]);
    }
  }, []);

  // Save data whenever schedules change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
  }, [schedules]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.productName || !form.trainer) {
      alert("Product Name and Trainer are required.");
      return;
    }
    setSchedules((prev) => [form, ...prev]);
    setForm({
      entryDate: "",
      entryTime: "",
      productName: "",
      productStart: "",
      productEnd: "",
      trainer: "",
      details: "",
    });
  };

  const handleClear = () => {
    setForm({
      entryDate: "",
      entryTime: "",
      productName: "",
      productStart: "",
      productEnd: "",
      trainer: "",
      details: "",
    });
  };

  const handleDelete = (idx) => {
    if (!window.confirm(`Remove schedule for "${schedules[idx].productName}"?`)) return;
    const updated = schedules.filter((_, i) => i !== idx);
    setSchedules(updated);
  };

  return (
    <div>
      <style>{`
        :root {
          --bg: #ffffff;
          --panel: #fff;
          --accent: #51A2FF;
          --accent-light: #BEDBFF;
          --text: #0a3c8a;
          --muted: #66788a;
          --card-shadow: 0 6px 18px rgba(10,20,40,0.06);
          --border: #ddd;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }

        body {
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
        }

        .page {
          max-width: 1200px;
          margin: 30px auto;
          padding: 20px;
          position:relative;
          top:20px;
          left:100px;
        }

        .page-header {
          display:flex;
          align-items:center;
          justify-content:space-between;
          margin-bottom: 20px;
        }
        .page-header h2 {
          color: var(--accent);
          font-size: 24px;
        }
        .back-link {
          background: transparent;
          border:1px solid var(--border);
          padding:8px 12px;
          border-radius:6px;
          cursor:pointer;
          color: var(--text);
        }
        .back-link:hover { background: var(--accent-light); }

        .panel {
          background: var(--panel);
          padding: 25px;
          border-radius: 12px;
          box-shadow: var(--card-shadow);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .form-grid .full { grid-column: 1 / -1; }

        input, select, textarea {
          padding:12px;
          border:1px solid var(--border);
          border-radius:8px;
          font-size:14px;
          width:100%;
          outline:none;
        }
        input:focus, select:focus, textarea:focus {
          border-color: var(--accent);
          box-shadow: 0 0 5px var(--accent-light);
        }
        textarea { min-height: 70px; resize: vertical; }

        .form-actions {
          margin-top:16px;
          display:flex;
          gap:12px;
          justify-content:flex-end;
        }
        .btn-add {
          background: var(--accent);
          color: #fff;
          border:none;
          padding:10px 16px;
          border-radius:8px;
          cursor:pointer;
          font-weight: bold;
        }
        .btn-add:hover { background: #3a8edb; }

        .ghost {
          background: transparent;
          border:1px solid var(--border);
          padding:10px 16px;
          border-radius:8px;
          cursor:pointer;
          color: var(--text);
        }
        .ghost:hover { background: var(--accent-light); }

        .table-wrap { margin-top: 20px; overflow-x:auto; }
        table.schedule-table {
          width:100%;
          border-collapse:collapse;
          min-width: 1000px;
        }
        table.schedule-table th, table.schedule-table td {
          padding:10px;
          text-align:left;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          font-size:13px;
          vertical-align: top;
        }
        table.schedule-table thead th {
          background: var(--accent-light);
          color: var(--accent);
          font-weight: 700;
          position: sticky;
          top: 0;
        }
        .control-btn {
          border:none;
          padding:6px 10px;
          border-radius:6px;
          cursor:pointer;
        }
        .btn-delete {
          background:#ff4d4d;
          color:white;
        }
        .btn-delete:hover { background:#e63939; }

        .empty-msg { color:var(--muted); padding:12px; font-style: italic; }

        @media (max-width:1100px){ .form-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width:700px){ 
          .form-grid { grid-template-columns: 1fr; }
          .form-actions { flex-direction: column-reverse; align-items: stretch; }
        }
      `}</style>

      <div className="page">
        <div className="page-header">
          <h2>New Staff Training Schedule</h2>
          <button className="back-link" onClick={() => (window.location.href = "index.html")}>
            &larr; Back
          </button>
        </div>

        <div className="panel">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input
                type="date"
                id="entryDate"
                value={form.entryDate}
                onChange={handleChange}
                placeholder="Date"
              />
              <input
                type="time"
                id="entryTime"
                value={form.entryTime}
                onChange={handleChange}
                placeholder="Time"
              />
              <input
                type="text"
                id="productName"
                value={form.productName}
                onChange={handleChange}
                placeholder="Product name"
              />
              <input
                type="date"
                id="productStart"
                value={form.productStart}
                onChange={handleChange}
                placeholder="Product Start Date"
              />
              <input
                type="date"
                id="productEnd"
                value={form.productEnd}
                onChange={handleChange}
                placeholder="Product End Date"
              />
              <select id="trainer" value={form.trainer} onChange={handleChange}>
                <option value="">Select Trainer</option>
                <option>Abinash</option>
                <option>Nanthini</option>
                <option>Neelaveni</option>
                <option>Paneer Selvam</option>
                <option>Reehan</option>
                <option>Selva Tharshini</option>
                <option>Thanika</option>
                <option>Wincy</option>
              </select>
              <textarea
                id="details"
                className="full"
                value={form.details}
                onChange={handleChange}
                placeholder="Details / notes about the training"
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleClear} className="ghost">
                Clear
              </button>
              <button type="submit" className="btn-add">
                Add Schedule
              </button>
            </div>
          </form>

          <div className="table-wrap">
            {schedules.length > 0 ? (
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Product Name</th>
                    <th>Product Start</th>
                    <th>Product End</th>
                    <th>Trainer Name</th>
                    <th>Details</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((s, idx) => (
                    <tr key={idx}>
                      <td>{s.entryDate}</td>
                      <td>{s.entryTime}</td>
                      <td>{s.productName}</td>
                      <td>{s.productStart}</td>
                      <td>{s.productEnd}</td>
                      <td>{s.trainer}</td>
                      <td title={s.details}>
                        {s.details.length > 80 ? `${s.details.slice(0, 80)}…` : s.details}
                      </td>
                      <td>
                        <button
                          className="control-btn btn-delete"
                          onClick={() => handleDelete(idx)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-msg">No training schedules added yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
