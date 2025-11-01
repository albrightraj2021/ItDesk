import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import './Sidebar.css';
import Header from '../components/Header';

const ItSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [office, setOffice] = useState('Networkz System');

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleMenuClick = (menu) => setActiveMenu(activeMenu === menu ? null : menu);

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} office={office} setOffice={setOffice} />

      <div className={`sidebar bg-dark text-white vh-100 p-3 ${isOpen ? 'open' : 'closed'}`}>
        <ul className="nav flex-column">

          {/* Dashboard */}
          <li className="nav-item">
            <NavLink to="/it/dashboard" className="nav-link menu-item" end>
              Dashboard
            </NavLink>
          </li>

          {/* CROs */}
          <li className="nav-item">
            <div
              className={`nav-link menu-item d-flex justify-content-between align-items-center ${activeMenu === 'cro' ? 'active' : ''}`}
              onClick={() => handleMenuClick('cro')}
            >
              CRO <FaChevronRight className={`arrow ${activeMenu === 'cro' ? 'rotate' : ''}`} />
            </div>
            <div className={`submenu ps-3 ${activeMenu === 'cro' ? 'show bg-submenu' : ''}`}>
              <NavLink to="/bdm/bdmcro/sheela/sheelawalkin" className="nav-link nested-submenu">Walkin</NavLink>
              <NavLink to="/bdm/bdmcro/sheela/sheelaleed" className="nav-link nested-submenu">Lead</NavLink>
              <NavLink to="/bdm/bdmcro/sheela/sheelacall" className="nav-link nested-submenu"> Call Details</NavLink>
              <NavLink to="/bdm/bdmcro/sheela/sheelaregistration" className="nav-link nested-submenu"> Registration</NavLink>
            </div>
          </li>

          {/* Employees */}
          <li className="nav-item">
            <div
              className={`nav-link menu-item d-flex justify-content-between align-items-center ${activeMenu === 'employees' ? 'active' : ''}`}
              onClick={() => handleMenuClick('employees')}
            >
              Employees <FaChevronRight className={`arrow ${activeMenu === 'employees' ? 'rotate' : ''}`} />
            </div>
            <div className={`submenu ps-3 ${activeMenu === 'employees' ? 'show bg-submenu' : ''}`}>
              <NavLink to="/bdm/employees/new" className="nav-link nested-submenu">New Staff</NavLink>
              <NavLink to="/bdm/employees/old" className="nav-link nested-submenu">Old Staff</NavLink>
            </div>
          </li>

          {/* Expense */}
          <li className="nav-item">
            <NavLink to="/bdm/bdmexpence/bdmexpences" className="nav-link menu-item">
              Expense
            </NavLink>
          </li>

          {/* Marketing */}
          <li className="nav-item">
  <div
    className={`nav-link menu-item d-flex justify-content-between align-items-center ${activeMenu === 'marketing' ? 'active' : ''}`}
    onClick={() => handleMenuClick('marketing')}
  >
    Marketing <FaChevronRight className={`arrow ${activeMenu === 'marketing' ? 'rotate' : ''}`} />
  </div>
  <div className={`submenu ps-3 ${activeMenu === 'marketing' ? 'show bg-submenu' : ''}`}>
    <NavLink to="/it/itmarketting/activities" className="nav-link nested-submenu">Activities</NavLink>
    <NavLink to="/it/itmarketting/seminar" className="nav-link nested-submenu">Seminar</NavLink>
    <NavLink to="/it/itmarketting/workshop" className="nav-link nested-submenu">Workshop</NavLink>
  </div>
</li>

          {/* Pending Service */}
          <li className="nav-item">
            <div
              className={`nav-link menu-item d-flex justify-content-between align-items-center ${activeMenu === 'pending' ? 'active' : ''}`}
              onClick={() => handleMenuClick('pending')}
            >
              Pending Service <FaChevronRight className={`arrow ${activeMenu === 'pending' ? 'rotate' : ''}`} />
            </div>
            <div className={`submenu ps-3 ${activeMenu === 'pending' ? 'show bg-submenu' : ''}`}>
              <NavLink to="/it/pending-service/certificate" className="nav-link nested-submenu">Certificate</NavLink>
            </div>
          </li>

          {/* Reports */}
          <li className="nav-item">
  <div
    className={`nav-link menu-item d-flex justify-content-between align-items-center ${activeMenu === 'reports' ? 'active' : ''}`}
    onClick={() => handleMenuClick('reports')}
  >
    Reports <FaChevronRight className={`arrow ${activeMenu === 'reports' ? 'rotate' : ''}`} />
  </div>
  <div className={`submenu ps-3 ${activeMenu === 'reports' ? 'show bg-submenu' : ''}`}>
    <NavLink to="/bdm/bdmreport/bdmwalkin" className="nav-link nested-submenu">Walkin</NavLink>
    <NavLink to="/bdm/bdmreport/bdmcollection" className="nav-link nested-submenu">Collection</NavLink>
    <NavLink to="/bdm/bdmreport/bdmRegistrationReport" className="nav-link nested-submenu">Registration</NavLink>
    <NavLink to="/bdm/bdmreport/bdmreference" className="nav-link nested-submenu">Reference</NavLink>
    <NavLink to="/bdm/bdmreport/bdmfollowup" className="nav-link nested-submenu">Followup</NavLink>
    <NavLink to="/bdm/bdmreport/bdmpending" className="nav-link nested-submenu">Pending Payment Reports</NavLink>
  </div>
</li>


          {/* Batch Schedule */}
          <li className="nav-item">
            <NavLink to="/bdm/bdmbatchschedule/bdmBatchSchedule" className="nav-link menu-item">
              Batch Schedule
            </NavLink>
          </li>

          {/* Admin */}
          <li className="nav-item">
            <div
              className={`nav-link menu-item d-flex justify-content-between align-items-center ${activeMenu === 'admin' ? 'active' : ''}`}
              onClick={() => handleMenuClick('admin')}
            >
              Admin <FaChevronRight className={`arrow ${activeMenu === 'admin' ? 'rotate' : ''}`} />
            </div>
            <div className={`submenu ps-3 ${activeMenu === 'admin' ? 'show bg-submenu' : ''}`}>
              <NavLink to="/bdm/bdmAdmin/AdminDB" className="nav-link nested-submenu">Admin DB</NavLink>
              <NavLink to="/bdm/bdmAdmin/Adminlogin" className="nav-link nested-submenu">Admin Login</NavLink>
              <NavLink to="/bdm/bdmAdmin/Newstaff" className="nav-link nested-submenu">New Staff</NavLink>
              <NavLink to="/bdm/bdmAdmin/Trainingsch" className="nav-link nested-submenu">Training Schedule</NavLink>
            </div>
          </li>

        </ul>
      </div>

      {isOpen && <div className="overlay d-md-none" onClick={toggleSidebar}></div>}
    </>
  );
};

export default ItSidebar;
