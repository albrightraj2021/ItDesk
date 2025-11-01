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
              ItDashboard
            </NavLink>
          </li>

          {/* CROs */}
          <li className="nav-item">
            <div
              className={`nav-link menu-item d-flex justify-content-between align-items-center ${activeMenu === 'cro' ? 'active' : ''}`}
              onClick={() => handleMenuClick('cro')}
            >
              ItCRO <FaChevronRight className={`arrow ${activeMenu === 'cro' ? 'rotate' : ''}`} />
            </div>
            <div className={`submenu ps-3 ${activeMenu === 'cro' ? 'show bg-submenu' : ''}`}>
              <NavLink to="/it/itcro/sheela/sheelawalkin" className="nav-link nested-submenu">It Walkin</NavLink>
              <NavLink to="/it/itcro/sheela/sheelaleed" className="nav-link nested-submenu">It Lead</NavLink>
              <NavLink to="/it/itcro/sheela/sheelacall" className="nav-link nested-submenu">It Call Details</NavLink>
              <NavLink to="/it/itcro/sheela/sheelaregistration" className="nav-link nested-submenu">It Registration</NavLink>
            </div>
          </li>

          {/* Employees */}
          <li className="nav-item">
            <div
              className={`nav-link menu-item d-flex justify-content-between align-items-center ${activeMenu === 'employees' ? 'active' : ''}`}
              onClick={() => handleMenuClick('employees')}
            >
              ItEmployees <FaChevronRight className={`arrow ${activeMenu === 'employees' ? 'rotate' : ''}`} />
            </div>
            <div className={`submenu ps-3 ${activeMenu === 'employees' ? 'show bg-submenu' : ''}`}>
              <NavLink to="/it/employees/new" className="nav-link nested-submenu">ItNew Staff</NavLink>
              <NavLink to="/it/employees/old" className="nav-link nested-submenu">ItOld Staff</NavLink>
            </div>
          </li>

          {/* Expense */}
          <li className="nav-item">
            <NavLink to="/it/itexpence/itexpences" className="nav-link menu-item">
              ItExpense
            </NavLink>
          </li>

          {/* Marketing */}
          <li className="nav-item">
  <div
    className={`nav-link menu-item d-flex justify-content-between align-items-center ${activeMenu === 'marketing' ? 'active' : ''}`}
    onClick={() => handleMenuClick('marketing')}
  >
    ItMarketing <FaChevronRight className={`arrow ${activeMenu === 'marketing' ? 'rotate' : ''}`} />
  </div>
  <div className={`submenu ps-3 ${activeMenu === 'marketing' ? 'show bg-submenu' : ''}`}>
    <NavLink to="/it/itmarketting/activities" className="nav-link nested-submenu">ItActivities</NavLink>
    <NavLink to="/it/itmarketting/seminar" className="nav-link nested-submenu">ItSeminar</NavLink>
    <NavLink to="/it/itmarketting/workshop" className="nav-link nested-submenu">ItWorkshop</NavLink>
  </div>
</li>

          {/* Pending Service */}
          <li className="nav-item">
            <div
              className={`nav-link menu-item d-flex justify-content-between align-items-center ${activeMenu === 'pending' ? 'active' : ''}`}
              onClick={() => handleMenuClick('pending')}
            >
              ItPending Service <FaChevronRight className={`arrow ${activeMenu === 'pending' ? 'rotate' : ''}`} />
            </div>
            <div className={`submenu ps-3 ${activeMenu === 'pending' ? 'show bg-submenu' : ''}`}>
              <NavLink to="/it/pending-service/certificate" className="nav-link nested-submenu">ItCertificate</NavLink>
            </div>
          </li>

          {/* Reports */}
          <li className="nav-item">
            <div
              className={`nav-link menu-item d-flex justify-content-between align-items-center ${activeMenu === 'reports' ? 'active' : ''}`}
              onClick={() => handleMenuClick('reports')}
            >
              ItReports <FaChevronRight className={`arrow ${activeMenu === 'reports' ? 'rotate' : ''}`} />
            </div>
            <div className={`submenu ps-3 ${activeMenu === 'reports' ? 'show bg-submenu' : ''}`}>
              <NavLink to="/it/itreport/itwalkin" className="nav-link nested-submenu">ItWalkin</NavLink>
              <NavLink to="/it/itreport/itcollection" className="nav-link nested-submenu">ItCollection</NavLink>
              <NavLink to="/it/itreport/itRegistrationReport" className="nav-link nested-submenu">ItRegistration</NavLink>
              <NavLink to="/it/itreport/itreference" className="nav-link nested-submenu">ItReference</NavLink>
              <NavLink to="/it/itreport/itfollowup" className="nav-link nested-submenu">ItFollowup</NavLink>
              <NavLink to="/it/itreport/itpending" className="nav-link nested-submenu">ItPending Payment Reports</NavLink>
            </div>
          </li>

          {/* Batch Schedule */}
          <li className="nav-item">
            <NavLink to="/it/itbatchschedule/itBatchSchedule" className="nav-link menu-item">
              ItBatch Schedule
            </NavLink>
          </li>

          {/* Admin */}
          <li className="nav-item">
            <div
              className={`nav-link menu-item d-flex justify-content-between align-items-center ${activeMenu === 'admin' ? 'active' : ''}`}
              onClick={() => handleMenuClick('admin')}
            >
              ItAdmin <FaChevronRight className={`arrow ${activeMenu === 'admin' ? 'rotate' : ''}`} />
            </div>
            <div className={`submenu ps-3 ${activeMenu === 'admin' ? 'show bg-submenu' : ''}`}>
              <NavLink to="/it/itAdmin/AdminDB" className="nav-link nested-submenu">ItAdmin DB</NavLink>
              <NavLink to="/it/itAdmin/Adminlogin" className="nav-link nested-submenu">ItAdmin Login</NavLink>
              <NavLink to="/it/itAdmin/Newstaff" className="nav-link nested-submenu">ItNew Staff</NavLink>
              <NavLink to="/it/itAdmin/Trainingsch" className="nav-link nested-submenu">ItTraining Schedule</NavLink>
            </div>
          </li>

        </ul>
      </div>

      {isOpen && <div className="overlay d-md-none" onClick={toggleSidebar}></div>}
    </>
  );
};

export default ItSidebar;
