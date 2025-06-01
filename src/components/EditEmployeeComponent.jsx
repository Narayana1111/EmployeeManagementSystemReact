import React, { useEffect, useState } from 'react';
import { getEmployeeById, updateEmployee } from '../services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployeeComponent = ({ isModal = false, onSuccess = null, id: modalId = null }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const navigate = useNavigate();
  const routeParams = useParams();
  const id = isModal ? modalId : routeParams.id;

  useEffect(() => {
    if (id) {
      getEmployeeById(id).then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      });
    }
  }, [id]);

  function validateForm() {
    let isValid = true;
    const errorCopy = { ...error };

    if (!firstName.trim()) {
      errorCopy.firstName = 'First Name is required';
      isValid = false;
    } else {
      errorCopy.firstName = '';
    }

    if (!lastName.trim()) {
      errorCopy.lastName = 'Last Name is required';
      isValid = false;
    } else {
      errorCopy.lastName = '';
    }

    if (!email.trim()) {
      errorCopy.email = 'Email is required';
      isValid = false;
    } else {
      errorCopy.email = '';
    }

    setError(errorCopy);
    return isValid;
  }

  function saveEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = { id, firstName, lastName, email };
      updateEmployee(id, employee).then(() => {
        if (onSuccess) {
          onSuccess(); 
        } else {
          navigate('/employess');
        }
      });
    }
  }

  const form = (
    <>
      <h4 className="text-center">{isModal ? 'Edit Employee' : 'Update Employee'}</h4>
      <form>
        <div className="form-group mb-2">
          <label className="form-label">Employee First Name:</label>
          <input
            type="text"
            placeholder="Enter Employee First Name"
            className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          {error.firstName && <div className="invalid-feedback">{error.firstName}</div>}

          <label className="form-label mt-2">Employee Last Name:</label>
          <input
            type="text"
            placeholder="Enter Employee Last Name"
            className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          {error.lastName && <div className="invalid-feedback">{error.lastName}</div>}

          <label className="form-label mt-2">Employee Email:</label>
          <input
            type="text"
            placeholder="Enter Employee Email"
            className={`form-control ${error.email ? 'is-invalid' : ''}`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {error.email && <div className="invalid-feedback">{error.email}</div>}
        </div>

        <div className="text-end">
          <button type="submit" onClick={saveEmployee} className="btn btn-success me-2">
            Update
          </button>
          {onSuccess && (
            <button type="button" onClick={onSuccess} className="btn btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );

  return isModal ? (
    <>{form}</>
  ) : (
    <div className="container d-flex justify-content-center" style={{ marginLeft: 330 }}>
      <div className="row">
        <div className="card p-4">{form}</div>
      </div>
    </div>
  );
};

export default EditEmployeeComponent;
