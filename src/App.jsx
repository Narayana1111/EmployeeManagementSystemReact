import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import NavBarComponent from "./components/NavBarComponent";
import ListEmployeeComponent from './components/EmployeeListComponent';
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeComponent from "./components/EmployeeComponent";
import EditEmployeeComponent from "./components/EditEmployeeComponent";
import { useState } from 'react';

function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleAddEmployeeClick() {
    setShowAddModal(true);
  }

  function closeAddModal() {
    setShowAddModal(false);
    setRefreshKey((k) => k + 1);
  }

  function handleEditEmployeeClick(id) {
    setEditId(id);
    setShowEditModal(true);
  }

  function closeEditModal() {
    setShowEditModal(false);
    setEditId(null);
    setRefreshKey((k) => k + 1);
  }

  return (
    <>
      <BrowserRouter>
        <NavBarComponent onAddEmployeeClick={handleAddEmployeeClick} />
        <div className="container-fluid" style={{ paddingTop: '80px', paddingBottom: '60px', minHeight: 'calc(100vh - 140px)' }}>
          <Routes>
            <Route path="/" element={<ListEmployeeComponent onEditEmployee={handleEditEmployeeClick} refreshKey={refreshKey} />} />
            <Route path="/employess" element={<ListEmployeeComponent onEditEmployee={handleEditEmployeeClick} refreshKey={refreshKey} />} />
            <Route path="/add-employee" element={<EmployeeComponent />} />
            <Route path="/edit-employee/:id" element={<EditEmployeeComponent />} />
          </Routes>
        </div>
        <FooterComponent />
        {/* Modal for Add Employee from NavBar */}
        {showAddModal && (
          <div
            className="modal fade show"
            style={{
              display: 'block',
              background: 'rgba(0,0,0,0.2)',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 2000,
            }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-2">
                <div className="modal-body">
                  <EmployeeComponent onSuccess={closeAddModal} isModal={true} />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Modal for Edit Employee from View All Employees */}
        {showEditModal && (
          <div
            className="modal fade show"
            style={{
              display: 'block',
              background: 'rgba(0,0,0,0.2)',
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 2000,
            }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-2">
                <div className="modal-body">
                  <EmployeeComponent id={editId} onSuccess={closeEditModal} isModal={true} isEdit={true} />
                </div>
              </div>
            </div>
          </div>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
