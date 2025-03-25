import React, { useState } from 'react';
import { usePatients } from '../../context/patientContext';

const PatientForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    documentPhoto: null, // Cambié esto a null para ser consistente con los archivos
  });

  const { newPatient } = usePatients();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      documentPhoto: e.target.files[0], // Almacenar solo el archivo
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('fullName', formData.fullName);
    form.append('email', formData.email);
    form.append('phoneNumber', formData.phoneNumber);

    // Si hay una foto, la agregamos al FormData
    if (formData.documentPhoto) {
      form.append('documentPhoto', formData.documentPhoto);
    }

    try {
      const response = await newPatient(form);
      console.log(response);

      if (!response.ok) {
        throw new Error('Error al agregar el paciente');
      }

      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="patient-form-overlay">
      <div className="patient-form-container">
        <h2>Agregar Paciente</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName">Nombre Completo</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Teléfono</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="documentPhoto">Foto del Documento</label>
            <input
              type="file"
              id="documentPhoto"
              name="documentPhoto"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <button type="submit">Agregar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
