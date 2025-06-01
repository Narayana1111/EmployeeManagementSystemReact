import { Link } from 'react-router-dom';
import React from 'react';

const NAV_FOOTER_GRADIENT = 'linear-gradient(90deg, #005c97 0%, #363795 100%)';

const NavBarComponent = ({ onAddEmployeeClick }) => {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={{
      background: NAV_FOOTER_GRADIENT,
      color: '#fff',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1050,
      minHeight: 56,
      paddingTop: 0,
      paddingBottom: 0,
      display: 'flex',
      alignItems: 'center',
    }}>
      <div className="container-fluid">
        <span className="navbar-brand fw-bold" style={{ color: '#fff' }}>EMS</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link" style={{ color: '#fff' }}>View All Employees</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" style={{ color: '#b3e0ff', textDecoration: 'none' }} onClick={onAddEmployeeClick}>
                Add Employee
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
