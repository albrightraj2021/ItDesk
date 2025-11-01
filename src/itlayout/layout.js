import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ItSidebar from "../itsidebar/itSidebar";
import Header from "../itcomponents/Itheader";

const ItLayout = ({ office, setOffice }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="d-flex">
      {sidebarOpen && <ItSidebar />} {/* IT Sidebar */}
      <div className="flex-grow-1">
        <Header office={office} setOffice={setOffice} onToggleSidebar={toggleSidebar} />
        <div className="p-3">
          <Outlet /> {/* IT pages render here */}
        </div>
      </div>
    </div>
  );
};

export default ItLayout;
