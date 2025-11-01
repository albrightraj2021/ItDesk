import React from "react";
import { FaBars } from "react-icons/fa";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";

const SHeader = ({ onToggleSidebar, office, setOffice }) => {
  return (
    <header className="header d-flex justify-content-between align-items-center p-3 bg-dark text-white">
      {/* Left Section: Logo + Sidebar Toggle */}
      <div className="d-flex align-items-center">
        <img src="../nslogo1.png" alt="Logo" className="logo me-2" />
        <button className="burger-btn d-md-none me-3" onClick={onToggleSidebar}>
          <FaBars size={22} />
        </button>
      </div>

      {/* Right Section: Office Switch Dropdown */}
      <div className="itdrop-container">
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle variant="secondary" id="dropdown-office">
            {office || "Trinity Technologies"}
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <LinkContainer to="/it/dashboard">
              <Dropdown.Item onClick={() => setOffice("It Desk")}>
                It Desk
              </Dropdown.Item>
            </LinkContainer>

            <LinkContainer to="/dashboard">
              <Dropdown.Item onClick={() => setOffice("Networkz System")}>
                Networkz System
              </Dropdown.Item>
            </LinkContainer>

            <LinkContainer to="/bdm/dashboard">
              <Dropdown.Item onClick={() => setOffice("BDM")}>
                BDM
              </Dropdown.Item>
            </LinkContainer>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default SHeader;
