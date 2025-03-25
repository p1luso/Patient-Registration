import React, { useState } from 'react';
import PatientForm from './PatientForm/PatientForm';

const AddPatientButton = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  }

  return (
    <div>
    <button
      onClick={handleClick} // Llama a handleClick al hacer clic
      className="add-patient-button"
    >
      Add Patient
    </button>
    {showForm && <PatientForm onClose={handleCloseForm} />}
    </div>
  );
};

export default AddPatientButton;
