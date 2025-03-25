import React, { useState } from 'react';
import './styles.css';

const PatientCard = ({ patient }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="patient-card">
      <div className="patient-card-header">
        <h3 className="patient-name">{patient.full_name}</h3>
        <img 
          src={patient.document_photo} 
          alt="Foto del Documento" 
          className="patient-photo" 
        />
      </div>
      <button 
        onClick={() => setExpanded(!expanded)} 
        className="expand-btn"
      >
        {expanded ? 'Ver menos' : 'Ver más'}
      </button>
      {expanded && (
        <div className="patient-details">
          <p>Email: {patient.email}</p>
          <p>Teléfono: {patient.phone_number}</p>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
