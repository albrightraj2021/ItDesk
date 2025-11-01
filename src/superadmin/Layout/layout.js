import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

const SLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar fixed on the left */}
      <Sidebar />

      {/* Page content */}
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#f9f9f9" }}>
        <Outlet />
        {/* This renders the child routes like Dashboard, Walkin, etc. */}
      </div>
    </div>
  );
};

export default SLayout;
