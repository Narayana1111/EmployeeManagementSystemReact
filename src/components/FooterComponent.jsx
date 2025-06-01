import React from 'react'

const NAV_FOOTER_GRADIENT = 'linear-gradient(90deg, #005c97 0%, #363795 100%)';

const FooterComponent = () => {
  return (
    <footer className="footer text-light py-3 mt-auto shadow-lg" style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      zIndex: 1050,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.1rem',
      letterSpacing: '0.5px',
      background: NAV_FOOTER_GRADIENT,
      borderTop: '1px solid #222',
      boxShadow: '0 -2px 12px rgba(0,0,0,0.08)'
    }}>
      <span style={{ fontWeight: 500, opacity: 0.95 }}>
        <i className="bi bi-c-circle me-1" style={{fontSize: '1.2em'}}></i>
        All rights reserved © 2025 by <span style={{ color: '#b3e0ff', fontWeight: 600 }}>Teja</span>
      </span>
    </footer>
  )
}

export default FooterComponent
