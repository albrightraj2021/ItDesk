import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPaw, FaUserPlus, FaDollarSign, FaTrophy } from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const BdmDashboard = () => {
  const [financialYear, setFinancialYear] = useState("2025-2026");
  const [month, setMonth] = useState("Oct");
  const [centre, setCentre] = useState("All");
  const [salesPerson, setSalesPerson] = useState("All");

  // Dashboard data state
  const [walkinCount, setWalkinCount] = useState(0);
  const [walkinFinancial, setWalkinFinancial] = useState(0);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [registrationFinancial, setRegistrationFinancial] = useState(0);
  const [collectionAmount, setCollectionAmount] = useState(0);
  const [collectionFinancial, setCollectionFinancial] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [gstFinancial, setGstFinancial] = useState(0);

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const centres = ["All","Centre 1","Centre 2"];
  const salesPersons = ["All","John","Jane"];

  useEffect(() => {
    fetchDashboardData();
  }, [month, financialYear]);

  const fetchDashboardData = async () => {
    try {
      const walkinResponse = await axios.get("http://127.0.0.1:8000/api/walkins/");
      const walkins = walkinResponse.data;
      
      const registrationResponse = await axios.get("http://127.0.0.1:8000/api/sheela-registrations/");
      const registrations = registrationResponse.data;
      
      const monthNumber = months.indexOf(month) + 1;
      const currentYear = financialYear.split("-")[0];
      
      const currentMonthWalkins = walkins;
      
      const currentMonthRegistrations = registrations.filter(r => {
        if (r.created_at) {
          const date = new Date(r.created_at);
          return date.getMonth() + 1 === monthNumber && date.getFullYear() === parseInt(currentYear);
        }
        return false;
      });
      
      setWalkinCount(currentMonthWalkins.length);
      setWalkinFinancial(walkins.length);
      
      setRegistrationCount(currentMonthRegistrations.length);
      setRegistrationFinancial(registrations.length);
      
      const monthCollection = currentMonthRegistrations.reduce((sum, r) => sum + (parseFloat(r.total_fees) || 0), 0);
      const financialYearCollection = registrations.reduce((sum, r) => sum + (parseFloat(r.total_fees) || 0), 0);
      setCollectionAmount(monthCollection);
      setCollectionFinancial(financialYearCollection);
      
      const gst = monthCollection * 0.18;
      const gstFY = financialYearCollection * 0.18;
      setGstAmount(gst);
      setGstFinancial(gstFY);
      
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const companies = ["Walkin", "Registration", "Collection", "GST"];
  const lastMonthData = [walkinCount, registrationCount, collectionAmount / 1000, gstAmount / 1000];
  const currentMonthData = [walkinFinancial, registrationFinancial, collectionFinancial / 1000, gstFinancial / 1000];

  const chartData = {
    labels: companies,
    datasets: [
      {
        label: "Last Month",
        data: lastMonthData,
        backgroundColor: "rgba(75,192,192,0.5)",
      },
      {
        label: "Current Month",
        data: currentMonthData,
        backgroundColor: "rgba(255,99,132,0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Growth Comparison" },
    },
  };

  const pieChartData = {
    labels: ["Walkin", "Registration", "Collection", "GST"],
    datasets: [
      {
        data: [
          walkinCount,
          registrationCount,
          Math.round(collectionAmount / 100),
          Math.round(gstAmount / 100)
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 2
      }
    ]
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Growth Distribution (%)" },
    },
  };

  return (
    <div className="dashboard-wrapper">
      <h4 className="fw-bold mb-4">BDM Dashboard</h4>

      <div className="filters mb-4 d-flex gap-3 flex-wrap">
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

      <div className="dashboard-container">
        <div className="info-card bg-info text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4>{walkinCount}</h4>
              <small>{month}</small>
              <h3 className="fw-bold my-2">{walkinFinancial}</h3>
              <small>Financial Year</small>
            </div>
            <FaPaw className="card-icon"/>
          </div>
          <div className="info-footer text-center">Walkin Details</div>
        </div>

        <div className="info-card bg-warning text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4>{registrationCount}</h4>
              <small>{month}</small>
              <h3 className="fw-bold my-2">{registrationFinancial}</h3>
              <small>Financial Year</small>
            </div>
            <FaUserPlus className="card-icon"/>
          </div>
          <div className="info-footer text-center">Registration Details</div>
        </div>

        <div className="info-card bg-success text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4>₹{Math.round(collectionAmount).toLocaleString()}</h4>
              <small>{month}</small>
              <h3 className="fw-bold my-2">₹{Math.round(collectionFinancial).toLocaleString()}</h3>
              <small>Financial Year</small>
            </div>
            <FaDollarSign className="card-icon"/>
          </div>
          <div className="info-footer text-center">Collection Details</div>
        </div>

        <div className="info-card bg-danger text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4>₹{Math.round(gstAmount).toLocaleString()}</h4>
              <small>{month}</small>
              <h3 className="fw-bold my-2">₹{Math.round(gstFinancial).toLocaleString()}</h3>
              <small>Financial Year</small>
            </div>
            <FaTrophy className="card-icon"/>
          </div>
          <div className="info-footer text-center">GST Details</div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="chart-container my-5">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="chart-container my-5">
            <Doughnut data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        Copyright © 2025 <span className="text-primary fw-bold">Networkz Systems</span>. 
        <span className="float-end text-secondary">CPD Team</span>
      </div>
    </div>
  );
};

export default BdmDashboard;
