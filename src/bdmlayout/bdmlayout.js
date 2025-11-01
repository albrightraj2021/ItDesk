import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import BdmSidebar from "../bdmsidebar/bdmSidebar";
import Header from "../bdmcomponents/Header";

const BdmLayout = ({ office, setOffice }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="d-flex">
      {sidebarOpen && <BdmSidebar office={office} setOffice={setOffice} />}
      <div className="flex-grow-1">
        <Header office={office} setOffice={setOffice} onToggleSidebar={toggleSidebar} />
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BdmLayout;
