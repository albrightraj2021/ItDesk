import React, { useState, useEffect } from "react";
import "./registration.css";

const RegistrationReport = () => {
  const [financialYear, setFinancialYear] = useState("2025-2026");
  const [course, setCourse] = useState("ALL");
  const [entriesToShow, setEntriesToShow] = useState("10");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);

  // Fetch all registrations
  const fetchData = async () => {
    try {
      const url = `http://127.0.0.1:8000/api/sheela-registrations/`;
      const res = await fetch(url);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter data on frontend
  const filteredData = data.filter(row => {
    const matchesCourse = course === "ALL" || row.course === course;
    const matchesSearch = row.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  const displayedData = entriesToShow === "all" ? filteredData : filteredData.slice(0, parseInt(entriesToShow));

  const downloadFile = () => {
    if (!displayedData.length) return alert("No data to download!");
    let csv = "Date,Name,Address,Enquired Product,Contact Number,Staff Name,Course,Payment Type,Installments,Installment Date,Total Fees,Discount\n";
    displayedData.forEach(row => {
      csv += [
        row.date, row.name, row.address, row.enquire_product, row.contact_number, row.staff_name,
        row.course, row.payment_type, row.installment_count, row.installment_date, row.total_fees, row.discount
      ].map(v => v || "").join(",") + "\n";
    });
    const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Registration_Report_${course}_${financialYear}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container">
      <h2>Registration Report</h2>

      <div className="filters">
        <div>
          <label>Financial Year</label>
          <select value={financialYear} onChange={e => setFinancialYear(e.target.value)}>
            <option value="2025-2026">2025-2026</option>
            <option value="2024-2025">2024-2025</option>
          </select>
        </div>

        <div>
          <label>Course</label>
          <select value={course} onChange={e => setCourse(e.target.value)}>
            <option value="ALL">ALL</option>
            <option value="Python Fullstack">Python Fullstack</option>
            <option value="Data Science">Data Science</option>
            <option value="ML">ML</option>
          </select>
        </div>

        <div>
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by Name..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <button onClick={downloadFile} style={{ margin: "10px 0", backgroundColor: "#28a745" }}>Download Excel</button>

      <table className="report-table">
        <thead>
          <tr>
            <th>Date</th><th>Name</th><th>Address</th><th>Enquired Product</th>
            <th>Contact Number</th><th>Staff Name</th><th>Course</th><th>Payment Type</th>
            <th>Installments</th><th>Installment Date</th><th>Total Fees</th><th>Discount</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.length > 0 ? displayedData.map((row, i) => (
            <tr key={i}>
              <td>{row.date}</td><td>{row.name}</td><td>{row.address}</td><td>{row.enquire_product}</td>
              <td>{row.contact_number}</td><td>{row.staff_name}</td><td>{row.course}</td><td>{row.payment_type}</td>
              <td>{row.installment_count}</td><td>{row.installment_date}</td><td>{row.total_fees}</td><td>{row.discount}</td>
            </tr>
          )) : <tr><td colSpan="12" style={{ textAlign:"center" }}>No data available</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationReport;
