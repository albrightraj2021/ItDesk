import React, { useState } from "react";

export default function SPending() {
  const [allData, setAllData] = useState([]);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    financialYear: "2025-2026",
    centre: "",
    employee: "ALL",
    fromDate: "2025-10-01",
    toDate: "2025-10-31",
  });

  const generateReport = () => {
    // Example dummy data — replace with real API call
    const dummyData = [
      {
        date: "2025-10-01",
        centre: "NSNCV024",
        employee: "EMP001",
        student: "John Doe",
        course: "Math",
        amount: "1000",
        status: "Pending",
      },
      {
        date: "2025-10-05",
        centre: "NSNCV025",
        employee: "EMP002",
        student: "Jane Smith",
        course: "Science",
        amount: "2000",
        status: "Pending",
      },
    ];
    setAllData(dummyData);
  };

  const filteredData = allData.filter((r) =>
    [r.student, r.course, r.employee]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const updateTableEntries = (e) => {
    setEntries(parseInt(e.target.value));
  };

  const downloadExcel = () => {
    let csv = "Date,Centre,Employee,Student,Course,Pending Amount,Status\n";
    allData.forEach((r) => {
      csv += `${r.date || ""},${r.centre || ""},${r.employee || ""},${r.student || ""},${r.course || ""},${r.amount || ""},${r.status || ""}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Pending_Report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pending Report</h1>

      <div style={styles.filterGrid}>
        <div style={styles.filterField}>
          <label>Financial Year</label>
          <select
            name="financialYear"
            value={filters.financialYear}
            onChange={handleFilterChange}
          >
            <option value="2025-2026">2025-2026</option>
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
          </select>
        </div>

        <div style={styles.filterField}>
          <label>Centre</label>
          <select
            name="centre"
            value={filters.centre}
            onChange={handleFilterChange}
          >
            <option value="">-- All Centres --</option>
            <option value="NSNCV024">NSNCV024</option>
            <option value="NSNCV025">NSNCV025</option>
            <option value="NSNCV026">NSNCV026</option>
          </select>
        </div>

        <div style={styles.filterField}>
          <label>Employee</label>
          <select
            name="employee"
            value={filters.employee}
            onChange={handleFilterChange}
          >
            <option value="ALL">ALL</option>
            <option value="EMP001">EMP001</option>
            <option value="EMP002">EMP002</option>
          </select>
        </div>

        <div style={styles.filterField}>
          <label>From Date</label>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
          />
        </div>

        <div style={styles.filterField}>
          <label>To Date</label>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div style={styles.actions}>
        <button style={styles.btnPrimary} onClick={generateReport}>
          Show Details
        </button>
        <button style={styles.btnSecondary} onClick={downloadExcel}>
          Download Excel
        </button>
      </div>

      <div style={styles.tableControls}>
        <div style={styles.entriesControl}>
          <label>Show</label>
          <select value={entries} onChange={updateTableEntries}>
            <option value="10">10</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>entries</span>
        </div>

        <div style={styles.searchBox}>
          <label>Search:</label>
          <input
            type="text"
            placeholder="Type to filter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Centre</th>
              <th>Employee</th>
              <th>Student</th>
              <th>Course</th>
              <th>Pending Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" style={styles.empty}>
                  No data to display
                </td>
              </tr>
            ) : (
              filteredData.slice(0, entries).map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.centre}</td>
                  <td>{row.employee}</td>
                  <td>{row.student}</td>
                  <td>{row.course}</td>
                  <td>{row.amount}</td>
                  <td>{row.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// CSS-in-JS styles
const styles = {
  container: {
    maxWidth: "1150px",
    margin: "50px auto",
    marginLeft:"300px",
    marginTop:"80px",
    background: "#fff",
    padding: "30px 35px",
    borderRadius: "10px",
    boxShadow: "0 3px 12px rgba(0, 0, 0, 0.08)",
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    color: "#1b2a47",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "30px",
    color: "#0d295b",
    letterSpacing: "0.5px",
  },
  filterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "25px",
  },
  filterField: {
    display: "flex",
    flexDirection: "column",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "10px",
    marginBottom: "20px",
  },
  btnPrimary: {
    padding: "10px 20px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    background: "#0066ff",
    color: "white",
  },
  btnSecondary: {
    padding: "10px 20px",
    fontWeight: "600",
    border: "1px solid #c9d9ff",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    background: "#eef3ff",
    color: "#0066ff",
  },
  tableControls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "14px",
    marginBottom: "10px",
    flexWrap: "wrap",
    gap: "10px",
  },
  entriesControl: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginLeft: "auto",
  },
  tableContainer: {
    overflowX: "auto",
    border: "1px solid #dbe1f1",
    borderRadius: "8px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
    minWidth: "900px",
  },
  empty: {
    textAlign: "center",
    padding: "20px",
    color: "#888",
  },
};
