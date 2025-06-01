import React, { useState, useEffect } from 'react';
import { addEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const EmployeeComponent = ({ onSuccess, isModal, isEdit, id }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      getEmployeeById(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      });
    } else if (!isEdit) {
      setFirstName('');
      setLastName('');
      setEmail('');
    }
  }, [isEdit, id]);

  function validateForm() {
    let validate = true;
    const errorCopy = { ...error };

    if (firstName.trim()) {
      errorCopy.firstName = '';
    } else {
      errorCopy.firstName = 'firstName is required';
      validate = false;
    }

    if (lastName.trim()) {
      errorCopy.lastName = '';
    } else {
      errorCopy.lastName = 'lastName is required';
      validate = false;
    }

    if (email.trim()) {
      errorCopy.email = '';
    } else {
      errorCopy.email = 'email is required';
      validate = false;
    }

    setError(errorCopy);
    return validate;
  }

  function saveEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { firstName, lastName, email };
      if (isEdit && id) {
        updateEmployee(id, { id, ...employee }).then(() => {
          if (onSuccess) onSuccess();
          else navigate('/employess');
        });
      } else {
        addEmployee(employee).then(() => {
          if (onSuccess) onSuccess();
          else navigate('/employess');
        });
      }
    }
  }

  return (
    isModal ? (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1050
      }}>
        <div className="card shadow-lg p-4" style={{ minWidth: 320, maxWidth: 500, width: '100%' }}>
          <h2 className="text-center mb-4 text-primary">{isEdit ? 'Update Employee' : 'Add Employee'}</h2>
          <form autoComplete="off">
            <div className="form-group mb-3">
              <label className="form-label fw-semibold">First Name</label>
              <input
                type="text"
                placeholder="Enter Employee First Name"
                className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              {error.firstName && <div className="invalid-feedback">{error.firstName}</div>}
            </div>
            <div className="form-group mb-3">
              <label className="form-label fw-semibold">Last Name</label>
              <input
                type="text"
                placeholder="Enter Employee Last Name"
                className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              {error.lastName && <div className="invalid-feedback">{error.lastName}</div>}
            </div>
            <div className="form-group mb-4">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                placeholder="Enter Employee Email"
                className={`form-control ${error.email ? 'is-invalid' : ''}`}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {error.email && <div className="invalid-feedback">{error.email}</div>}
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" onClick={saveEmployee} className="btn btn-success px-4">
                {isEdit ? 'Update' : 'Add'}
              </button>
              {isModal && (
                <button type="button" className="btn btn-secondary px-4" onClick={onSuccess}>Cancel</button>
              )}
            </div>
          </form>
        </div>
      </div>
    ) : (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="row justify-content-center w-100 m-0">
          <div className="col-12 col-md-8 col-lg-6 d-flex justify-content-center p-0">
            <div className="card shadow-lg p-4 w-100" style={{ maxWidth: 500 }}>
              <h2 className="text-center mb-4 text-primary">{isEdit ? 'Update Employee' : 'Add Employee'}</h2>
              <div className="card-body">
                <form autoComplete="off">
                  <div className="form-group mb-3">
                    <label className="form-label fw-semibold">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter Employee First Name"
                      className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />
                    {error.firstName && <div className="invalid-feedback">{error.firstName}</div>}
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label fw-semibold">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter Employee Last Name"
                      className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />
                    {error.lastName && <div className="invalid-feedback">{error.lastName}</div>}
                  </div>
                  <div className="form-group mb-4">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      placeholder="Enter Employee Email"
                      className={`form-control ${error.email ? 'is-invalid' : ''}`}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    {error.email && <div className="invalid-feedback">{error.email}</div>}
                  </div>
                  <div className="d-flex justify-content-between">
                    <button type="submit" onClick={saveEmployee} className="btn btn-success px-4">
                      {isEdit ? 'Update' : 'Add'}
                    </button>
                    {isModal && (
                      <button type="button" className="btn btn-secondary px-4" onClick={onSuccess}>Cancel</button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EmployeeComponent;
