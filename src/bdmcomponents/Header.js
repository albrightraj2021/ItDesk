import { FaBars } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = ({ onToggleSidebar }) => {
  // Get user role from localStorage
  const userRole = localStorage.getItem("userRole") || "";
  
  // Only show dropdown for Admin and Super Admin
  const shouldShowDropdown = userRole === "admin" || userRole === "super admin";

  return (
    <header className="header d-flex justify-content-between align-items-center p-3 bg-dark text-white">
      <div className="d-flex align-items-center">
        <img src="../bdmbg.png" alt="Logo" className="logo me-2" style={{width:"100px",height:"100px"}} />
        <button className="burger-btn d-md-none me-3" onClick={onToggleSidebar}>
          <FaBars size={22} />
        </button>
      </div>

      {/* React-Bootstrap Dropdown - Only for Admin and Super Admin */}
      {shouldShowDropdown && (
        <div className='drop-container'>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle variant="secondary" id="dropdown-office">
              Trinity Technologies
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <LinkContainer to="/it/dashboard">
                <Dropdown.Item>It Desk</Dropdown.Item>
              </LinkContainer>
              <LinkContainer to="/dashboard">
                <Dropdown.Item>Networkz System</Dropdown.Item>
              </LinkContainer>
              <LinkContainer to="/bdm/dashboard">
                <Dropdown.Item>BDM</Dropdown.Item>
              </LinkContainer>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
    </header>
  );
};

export default Header;