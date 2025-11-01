import React, { useEffect, useState } from "react";

const STORAGE_KEY = "staffRecords_v1";

const ANewStaff = () => {
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    jobTitle: "",
    empId: "",
    startDate: "",
    status: "",
    email: "",
    address: "",
    emergency: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setStaff(saved);
  }, []);

  const saveStaff = (arr) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    setStaff(arr);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.empId) {
      alert("Full Name and Employee ID are required.");
      return;
    }
    const updated = [...staff, form];
    saveStaff(updated);
    setForm({
      fullName: "",
      dob: "",
      gender: "",
      phone: "",
      jobTitle: "",
      empId: "",
      startDate: "",
      status: "",
      email: "",
      address: "",
      emergency: "",
    });
  };

  const handleDelete = (idx) => {
    if (!window.confirm(`Remove staff "${staff[idx].fullName}" ?`)) return;
    const updated = staff.filter((_, i) => i !== idx);
    saveStaff(updated);
  };

  const clearForm = () => setForm({
    fullName: "",
    dob: "",
    gender: "",
    phone: "",
    jobTitle: "",
    empId: "",
    startDate: "",
    status: "",
    email: "",
    address: "",
    emergency: "",
  });

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

        body, html, #root { 
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
          grid-template-columns: repeat(2, 1fr);
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

        .table-wrap { margin-top: 20px; }
        table.staff-table {
          width:100%;
          border-collapse:collapse;
          display: block;
          overflow-x: auto;
        }
        table.staff-table th, table.staff-table td {
          padding:10px;
          text-align:left;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          font-size:13px;
          vertical-align: top;
        }
        table.staff-table thead th {
          background: var(--accent-light);
          color: var(--accent);
          font-weight: 700;
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

        @media (max-width:900px){
          .form-grid { grid-template-columns: 1fr; }
          .form-actions { flex-direction: column-reverse; align-items: stretch; }
        }
      `}</style>

      <div className="page">
        <div className="page-header">
          <h2>New Staff Details</h2>
          <button className="back-link" onClick={() => (window.location.href = "index.html")}>
            &larr; Back
          </button>
        </div>

        <div className="panel">
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input type="text" id="fullName" placeholder="Full Name" required value={form.fullName} onChange={handleChange} />
              <input type="text" id="dob" placeholder="Date of Birth"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                value={form.dob} onChange={handleChange}
              />
              <select id="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <input type="text" id="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
              <input type="text" id="jobTitle" placeholder="Job Title" value={form.jobTitle} onChange={handleChange} />
              <input type="text" id="empId" placeholder="Employee ID Number" value={form.empId} onChange={handleChange} />
              <input type="text" id="startDate" placeholder="Joining Date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                value={form.startDate} onChange={handleChange}
              />
              <select id="status" value={form.status} onChange={handleChange}>
                <option value="">Employment Shift</option>
                <option>9.00 - 6.00</option>
                <option>10.00 - 7.00</option>
              </select>
              <input type="email" id="email" placeholder="Email Address" className="full" value={form.email} onChange={handleChange} />
              <textarea id="address" placeholder="Home Address" className="full" value={form.address} onChange={handleChange}></textarea>
              <input type="text" id="emergency" placeholder="Emergency Contact Number" className="full" value={form.emergency} onChange={handleChange} />
            </div>

            <div className="form-actions">
              <button type="button" className="ghost" onClick={clearForm}>Clear</button>
              <button type="submit" className="btn-add">Add</button>
            </div>
          </form>

          {staff.length > 0 ? (
            <div className="table-wrap">
              <table className="staff-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Job Title</th>
                    <th>Emp ID</th>
                    <th>Joining Date</th>
                    <th>Shift</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Emergency Contact</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((s, idx) => (
                    <tr key={idx}>
                      <td>{s.fullName}</td>
                      <td>{s.dob}</td>
                      <td>{s.gender}</td>
                      <td>{s.phone}</td>
                      <td>{s.jobTitle}</td>
                      <td>{s.empId}</td>
                      <td>{s.startDate}</td>
                      <td>{s.status}</td>
                      <td>{s.email}</td>
                      <td>{s.address}</td>
                      <td>{s.emergency}</td>
                      <td>
                        <button className="control-btn btn-delete" onClick={() => handleDelete(idx)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-msg">No staff records added yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ANewStaff;
