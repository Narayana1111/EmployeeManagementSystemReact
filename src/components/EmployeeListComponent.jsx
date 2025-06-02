import React, { useEffect, useState } from "react";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import EmployeeComponent from "./EmployeeComponent";

const ListEmployeeComponent = ({ onEditEmployee, refreshKey }) => {
  const [Employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    fetchEmployees(); 
  }, [refreshKey]);

  function fetchEmployees() {
    listEmployees()
      .then((Response) => {
        setEmployees(Response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  function handleDelete(id) {
    setDeleteId(id);
    setShowModal(true);
  }

  function confirmDelete() {
    if (deleteId) {
      deleteEmployee(deleteId).then(() => {
        fetchEmployees();
        setShowModal(false);
        setDeleteId(null);
      });
    }
  }

  function cancelDelete() {
    setShowModal(false);
    setDeleteId(null);
  }

  function handleAddEmployee() {
    setShowAddModal(true);
  }

  function closeAddModal() {
    setShowAddModal(false);
    fetchEmployees(); 
  }

  function handleEdit(id) {
    if (onEditEmployee) {
      onEditEmployee(id);
    } else {
      navigator(`/edit-employee/${id}`);
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center w-100"
      style={{
        minHeight: 'calc(100vh - 110px)',
        background: '#f8f9fa',
        margin: 0,
        overflow: 'hidden',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      <div
        className="card shadow-lg border-0 mb-0 d-flex flex-column"
        style={{
          width: '80vw',
          maxWidth: 1200,
          minWidth: 320,
          height: 'calc(100vh - 200px)',
          maxHeight: 'calc(100vh - 200px)',
          boxSizing: 'border-box',
          overflow: 'hidden',
          background: '#fff',
          position: 'relative',
        }}
      >
        <div className="card-header bg-primary text-white d-flex align-items-center justify-content-center">
          <h3 className="mb-0">Employee Directory</h3>
        </div>
        <div className="card-body p-0 flex-grow-1 d-flex flex-column" style={{ overflow: 'hidden', height: '100%' }}>
          <div className="table-responsive flex-grow-1" style={{ overflowY: 'auto', height: '100%' }}>
            <table className="table table-hover align-middle mb-0 w-100">
              <thead className="table-light">
                <tr>
                  <th style={{ minWidth: 80 }}>ID</th>
                  <th style={{ minWidth: 150 }}>First Name</th>
                  <th style={{ minWidth: 150 }}>Last Name</th>
                  <th style={{ minWidth: 220 }}>Email</th>
                  <th style={{ minWidth: 160 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Employees.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      No employees found.
                    </td>
                  </tr>
                ) : (
                  Employees.map((employee) => (
                    <tr key={employee.id} className="align-middle">
                      <td>{employee.id}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.email}</td>
                      <td  className="text-end">
                        <button
                          className="btn btn-warning btn-sm me-2 px-3"
                          onClick={() => onEditEmployee && onEditEmployee(employee.id)}
                        >
                          <i className="bi bi-pencil-square me-1"></i>Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm px-3"
                          onClick={() => handleDelete(employee.id)}
                        >
                          <i className="bi bi-trash me-1"></i>Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Delete Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.2)' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this employee?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Add Modal */}
      {showAddModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.2)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-2">
              <div className="modal-header">
                <h5 className="modal-title">Add Employee</h5>
                <button type="button" className="btn-close" onClick={closeAddModal}></button>
              </div>
              <div className="modal-body">
                <EmployeeComponent onSuccess={closeAddModal} isModal={true} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListEmployeeComponent;
