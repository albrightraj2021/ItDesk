import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [openMenus, setOpenMenus] = useState({});
  const [adminName, setAdminName] = useState("Admin");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const name = localStorage.getItem("adminName") || "Admin";
    setAdminName(name);
  }, []);

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = () => {
    window.location.href = "admin_login.html";
  };

  return (
    <div>
      <style>{`
        :root {
          --bg: #ffffff;
          --panel: #fff;
          --accent: #51A2FF;
          --new-bg: #BEDBFF;
          --text: #0a3c8a;
          --muted: #66788a;
          --card-shadow: 0 6px 18px rgba(10,20,40,0.06);
          --radius: 10px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; background: var(--bg); color: var(--text); }

        /* Topbar */
        .topbar {
          height: 64px;
          display: flex;
          align-items: center;
          padding: 0 18px;
          border-bottom: 1px solid #eef3fb;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: var(--bg);
          z-index: 100;
        }

        .brand { color: var(--accent); font-weight: 700; font-size: 20px; margin-left: 10px; }
        .header-actions { margin-left: auto; display: flex; align-items: center; gap: 12px; }
        .icon-btn { background: none; border: none; font-size: 22px; padding: 8px; cursor: pointer; color: var(--text); }
        .btn { background: var(--accent); color: white; border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer; box-shadow: var(--card-shadow); }
        .btn.ghost { background: transparent; color: var(--accent); border: 1px solid #dbeefc; }

        /* App layout */
        .app {
          display: flex;
          min-height: 100vh;
          transition: margin-left 0.3s ease;
          margin-top: 64px;
          margin-left: 220px;
        }
        .app.sidebar-closed {
          margin-left: 0;
        }

        /* Sidebar */
        .sidebar {
          width: 220px;
          background: linear-gradient(180deg, #ffffff, #f9fbff);
          padding: 22px 16px;
          border-right: 1px solid #eef3fb;
          height: calc(100vh - 64px);
          position: fixed;
          top: 64px;
          left: 0;
          overflow-y: auto;
          transition: left 0.3s ease;
          z-index: 60;
        }
        .sidebar.closed {
          left: -220px;
        }

        .sidebar nav ul { list-style: none; padding: 0; margin: 0; }
        .sidebar nav ul li { margin: 8px 0; position: relative; }
        .sidebar a {
          color: var(--text);
          text-decoration: none;
          display: block;
          padding: 8px 10px;
          border-radius: 8px;
          transition: background 0.2s ease;
        }
        .sidebar a.active, .sidebar a:hover {
          background: linear-gradient(90deg, #fff3ec, #e6f4ff);
          color: var(--accent);
        }

        .section-toggle {
          width: 100%;
          text-align: left;
          padding: 8px 10px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: var(--text);
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .section-toggle:focus { outline: 2px solid rgba(81,162,255,0.25); }
        .caret { transition: transform .18s ease; font-size: 13px; opacity: 0.8; }

        .sub { display: none; list-style: none; padding-left: 12px; margin: 6px 0 0 0; }
        .has-children.open > .sub { display: block; }
        .has-children.open > .section-toggle .caret { transform: rotate(90deg); }

        /* Main content */
        .content {
          flex: 1;
          padding: 28px 32px;
          transition: all 0.3s ease;
        }
        .section h2 {
          font-size: 32px;
          margin: 0 0 18px;
          font-weight: 800;
          color: var(--text);
        }

        .cards { display: flex; gap: 18px; flex-wrap: wrap; }
        .card {
          background: var(--panel);
          padding: 18px;
          border-radius: 12px;
          flex: 1;
          min-width: 220px;
          box-shadow: var(--card-shadow);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .app { margin-left: 0; }
          .sidebar { left: -260px; }
          .sidebar.open { left: 0; }
        }

        @media (max-width: 520px) {
          .cards { flex-direction: column; }
          .section h2 { font-size: 26px; }
        }
      `}</style>

      <header className="topbar">
        <button className="icon-btn" onClick={toggleSidebar}>☰</button>
        <h1 className="brand">Admin Dashboard</h1>
        <div className="header-actions">
          <span style={{ fontWeight: "500" }}>{adminName}</span>
          <button className="btn ghost" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className={`app ${isSidebarOpen ? "" : "sidebar-closed"}`}>
        <aside className={`sidebar ${isSidebarOpen ? "" : "closed"}`}>
          <nav>
            <ul>
              <li><a href="#">Dashboard</a></li>
              <li><a href="#">CRO</a></li>

              <li className={`has-children ${openMenus.employee ? "open" : ""}`}>
                <button className="section-toggle" onClick={() => toggleMenu("employee")}>
                  Employee <span className="caret">▶</span>
                </button>
                <ul className="sub">
                  <li><a href="#">Old Staff Details</a></li>
                  <li className={`has-children ${openMenus.newStaff ? "open" : ""}`}>
                    <button className="section-toggle" onClick={() => toggleMenu("newStaff")}>
                      New Staff Details <span className="caret">▶</span>
                    </button>
                    <ul className="sub">
                      <li><a href="new_staff.html">New Staff Add</a></li>
                      <li><a href="training_schedule.html">New Staff Training Schedule</a></li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li><a href="#">Batch Schedule</a></li>
              <li><a href="#">Marketing</a></li>
              <li><a href="#">Expense</a></li>
              <li><a href="#">Pending Services</a></li>
              <li><a href="#">Reports</a></li>
            </ul>
          </nav>
        </aside>

        <main className="content">
          <section className="section">
            <h2>Welcome Admin</h2>
            <p>Select a section from the sidebar to begin.</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
