import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sheelawalkin.css";

const initialWalkin = {
  croName: "",
  techStaff: "",
  counselingStaff: "",
  walkName: "",
  walkTime: "",
  product: ""
};

const croOptions = ["Sheela", "Jeba", "Sindhu"];
const counselingOptions = ["Sheela", "Jeba", "Sindhu"];
const techOptions = [
  "Selvatharshini", "Thanika", "Wincy", "Abinash", "Paneer Selvam",
  "Nanthini", "Neelaveni", "Reehan"
];
const productOptions = [
  "Overall","Java Fullstack","Python Fullstack","MERN","MEAN","UI/UX",
  "Software Testing","Manual Testing","Automation Testing","AI",
  "Machine Learning","Data Science","Digital Marketing","CCNA",
  "AWS","Ethical Hacking","Linux"
];

function BdmSheelaWalkin() {
  const [walkins, setWalkins] = useState([{ ...initialWalkin }]);
  const [addedRows, setAddedRows] = useState([]);
  const navigate = useNavigate();

  const handleChange = (index, field, value) => {
    const newWalkins = [...walkins];
    newWalkins[index][field] = value;
    setWalkins(newWalkins);
  };

  const handleAddRow = async (index) => {
    const row = walkins[index];
    if (Object.values(row).some(v => v === "")) {
      alert("⚠ Please fill all fields before adding.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/walkins/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      });

      if (response.ok) {
        alert("✅ Walk-in saved successfully!");
        setAddedRows([...addedRows, { ...row, registered: false }]);
        const newWalkins = [...walkins];
        newWalkins[index] = { ...initialWalkin };
        setWalkins(newWalkins);
      } else {
        alert("❌ Failed to save walk-in data!");
      }
    } catch (error) {
      console.error("Error saving walk-in:", error);
      alert("⚠ Server not reachable!.");
    }
  };

  // 🔥 Register button handler
  const handleRegisterRow = (row) => {
    const updatedRows = addedRows.map(r =>
      r === row ? { ...r, registered: true } : r
    );
    setAddedRows(updatedRows);

    // Navigate to registration page with the clicked row
    navigate("/cro/registration", { state: { walkinRow: row } });
  };

  return (
    <div className="walkin-container">
      <h2 className="walkin-heading">📂It Walk-in Entry Form</h2>

      {walkins.map((row, idx) => (
        <div className="walkin-row" key={idx}>
          <div className="field">
            <label>CRO Name</label>
            <select value={row.croName} onChange={e => handleChange(idx, "croName", e.target.value)}>
              <option value="">-- Select CRO --</option>
              {croOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="field">
            <label>Technical Staff</label>
            <select value={row.techStaff} onChange={e => handleChange(idx, "techStaff", e.target.value)}>
              <option value="">-- Select Technical Staff --</option>
              {techOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="field">
            <label>Counseling Staff</label>
            <select value={row.counselingStaff} onChange={e => handleChange(idx, "counselingStaff", e.target.value)}>
              <option value="">-- Select Counseling Staff --</option>
              {counselingOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="field">
            <label>Walk-in Name</label>
            <input
              type="text"
              value={row.walkName}
              onChange={e => handleChange(idx, "walkName", e.target.value)}
              placeholder="Walk-in Name"
            />
          </div>

          <div className="field">
            <label>Walk-in Time</label>
            <input
              type="time"
              value={row.walkTime}
              onChange={e => handleChange(idx, "walkTime", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Product</label>
            <select value={row.product} onChange={e => handleChange(idx, "product", e.target.value)}>
              <option value="">Select Product</option>
              {productOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="field">
            <button className="add-btn" onClick={() => handleAddRow(idx)}>Add</button>
          </div>
        </div>
      ))}

      {addedRows.length > 0 && (
        <div className="added-rows">
          <h3>Added Walk-ins:</h3>
          <table>
            <thead>
              <tr>
                <th>CRO</th>
                <th>Tech</th>
                <th>Counseling</th>
                <th>Name</th>
                <th>Time</th>
                <th>Product</th>
                <th>Status</th>
                <th>Register</th>
              </tr>
            </thead>
            <tbody>
              {addedRows.map((row, i) => (
                <tr key={i}>
                  <td>{row.croName}</td>
                  <td>{row.techStaff}</td>
                  <td>{row.counselingStaff}</td>
                  <td>{row.walkName}</td>
                  <td>{row.walkTime}</td>
                  <td>{row.product}</td>
                  <td>{row.registered ? "Registered ✅" : "Pending ⏳"}</td>
                  <td>
                    <button
                      disabled={row.registered}
                      onClick={() => handleRegisterRow(row)}
                    >
                      Register
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BdmSheelaWalkin;
