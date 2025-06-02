import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const NAV_FOOTER_GRADIENT = 'linear-gradient(90deg, #005c97 0%, #363795 100%)';

const NavBarComponent = ({ onAddEmployeeClick }) => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggle = () => setCollapsed((prev) => !prev);

  const handleAddEmployee = () => {
    setCollapsed(true);
    if (onAddEmployeeClick) onAddEmployeeClick();
  };

  return (
   <nav
  className="navbar navbar-expand-lg shadow-sm"
  style={{
    background: NAV_FOOTER_GRADIENT,
    color: '#fff',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1050,
    padding: '0 1rem',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
  }}
    >
      <div className="container-fluid">
        <span className="navbar-brand fw-bold" style={{ color: '#fff' }}>
          EMS
        </span>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={handleToggle}
          style={{ border: 'none' }}
        >
          <span
            className="navbar-toggler-icon"
            style={{
              filter: 'invert(1)',
            }}
          ></span>
        </button>
        <div
          className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`}
          id="navbarNav"
          style={{
            background: collapsed ? 'transparent' : NAV_FOOTER_GRADIENT,
            padding: collapsed ? '0' : '0.5rem 1rem',
            borderTop: collapsed ? 'none' : '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <ul className="navbar-nav ms-auto text-center">
            <li className="nav-item">
              <button
                className="nav-link bg-transparent border-0"
                style={{ color: '#fff' }}
                onClick={() => setCollapsed(true)}
              >
                View All Employees
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                style={{ color: '#b3e0ff', textDecoration: 'none' }}
                onClick={handleAddEmployee}
              >
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
