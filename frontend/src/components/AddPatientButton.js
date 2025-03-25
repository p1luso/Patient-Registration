import React from 'react';

const AddPatientButton = ({ onClick }) => {
  return (
    <button className="add-patient-button" onClick={onClick}>
      Agregar Paciente
    </button>
  );
};

export default AddPatientButton;
