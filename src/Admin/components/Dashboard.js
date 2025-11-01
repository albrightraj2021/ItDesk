import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPaw, FaUserPlus, FaDollarSign, FaTrophy } from "react-icons/fa";
import './Dashboard.css';

const ADashboard = () => {
  const [financialYear, setFinancialYear] = useState("2025-2026");
  const [month, setMonth] = useState("Oct");
  const [centre, setCentre] = useState("All");
  const [salesPerson, setSalesPerson] = useState("All");

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const centres = ["All","Centre 1","Centre 2"];
  const salesPersons = ["All","John","Jane"];

  return (
    <div className="dashboard-wrapper">
      <h4 className="fw-bold mb-4">Dashboard</h4>

      {/* Filters */}
      <div className="filters mb-4">
        <div>
          <label className="form-label">Financial Year</label>
          <select className="form-select" value={financialYear} onChange={e => setFinancialYear(e.target.value)}>
            <option>2024-2025</option>
            <option>2025-2026</option>
          </select>
        </div>
        <div>
          <label className="form-label">Month</label>
          <select className="form-select" value={month} onChange={e => setMonth(e.target.value)}>
            {months.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="form-label">Centre</label>
          <select className="form-select" value={centre} onChange={e => setCentre(e.target.value)}>
            {centres.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="form-label">Sales Person</label>
          <select className="form-select" value={salesPerson} onChange={e => setSalesPerson(e.target.value)}>
            {salesPersons.map(sp => <option key={sp}>{sp}</option>)}
          </select>
        </div>
      </div>

      {/* Cards */}
      <div className="dashboard-container">
        <div className="info-card bg-info text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4>0</h4>
              <small>October</small>
              <h3 className="fw-bold my-2">222</h3>
              <small>Financial Year</small>
            </div>
            <FaPaw className="card-icon"/>
          </div>
          <div className="info-footer text-center">Walkin Details</div>
        </div>

        <div className="info-card bg-warning text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4>1</h4>
              <small>October</small>
              <h3 className="fw-bold my-2">89</h3>
              <small>Financial Year</small>
            </div>
            <FaUserPlus className="card-icon"/>
          </div>
          <div className="info-footer text-center">Registration Details</div>
        </div>

        <div className="info-card bg-success text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4>24,092</h4>
              <small>October</small>
              <h3 className="fw-bold my-2">22,18,445</h3>
              <small>Financial Year</small>
            </div>
            <FaDollarSign className="card-icon"/>
          </div>
          <div className="info-footer text-center">Collection Details</div>
        </div>

        <div className="info-card bg-danger text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4>24,092</h4>
              <small>October</small>
              <h3 className="fw-bold my-2">23,83,018</h3>
              <small>Financial Year</small>
            </div>
            <FaTrophy className="card-icon"/>
          </div>
          <div className="info-footer text-center">Generated Sales Details</div>
        </div>
      </div>

      {/* Footer */}
      <div className="dashboard-footer">
        Copyright © 2025 <span className="text-primary fw-bold">Networkz Systems</span>. 
        <span className="float-end text-secondary">CPD Team</span>
      </div>
    </div>
  );
};

export default ADashboard;
