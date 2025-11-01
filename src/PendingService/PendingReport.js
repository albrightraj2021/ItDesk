PendingReport.js


import React, { useState, useEffect } from "react";
import "./PendingReports.css";

const PendingReports = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    month: "",
    year: "",
    product: "",
    serviceType: "",
  });

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/pending-services/");
        if (!response.ok) throw new Error("Network response was not ok");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Filter data based on all filters
  const filteredData = data.filter(item => {
    const monthMatch = filters.month ? item.start_date.split("-")[1] === filters.month : true;
    const yearMatch = filters.year ? item.start_date.split("-")[0] === filters.year : true;
    const productMatch = filters.product ? item.product === filters.product : true;
    const serviceTypeMatch = filters.serviceType ? item.service_type === filters.serviceType : true;
    return monthMatch && yearMatch && productMatch && serviceTypeMatch;
  });

  return (
    <div className="reports-container">
      <h2>Pending Service Reports</h2>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label>Month</label>
          <select name="month" value={filters.month} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Year</label>
          <select name="year" value={filters.year} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Product</label>
          <select name="product" value={filters.product} onChange={handleFilterChange}>
            <option value="">All</option>
            {/* You can dynamically populate products from backend if needed */}
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="UIUX">UI/UX</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Service Type</label>
          <select name="serviceType" value={filters.serviceType} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="internship">Internship</option>
            <option value="workshop">Workshop</option>
            <option value="course">Course</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <table className="reports-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Phone Number</th>
            <th>Service Type</th>
            <th>Product</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Days</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.student_name}</td>
                <td>{item.phone_number}</td>
                <td>{item.service_type}</td>
                <td>{item.product}</td>
                <td>{item.start_date}</td>
                <td>{item.end_date}</td>
                <td>{item.total_days}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingReports;