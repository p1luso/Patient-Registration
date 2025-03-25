import React, { useState, useEffect } from 'react';
import { usePatients } from '../context/patientContext';
import PatientCard from '../components/PatientCard/PatientCard';
import AddPatientButton from '../components/AddPatientButton';

const Home = () => {
  const { patients, setPage, page, totalPages, loading } = usePatients();

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="headerBar">
        <h1 className="text-3xl font-semibold">Lista de Pacientes</h1>
        <AddPatientButton /> {/* El botón estará a la derecha */}
      </div>
      <div className='hero'>
      {loading ? <p>Cargando...</p> : (
        <div className='content'>
          {patients.length > 0 ? patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          )) : 'No hay pacientes'}
        </div>
      )}

      <div className="mt-4">
        <button 
          onClick={handlePreviousPage} 
          disabled={page === 1}  // Deshabilitar si estamos en la primera página
          className="mr-2"
        >
          Anterior
        </button>
        <button 
          onClick={handleNextPage} 
          disabled={page === totalPages}  // Deshabilitar si estamos en la última página
        >
          Siguiente
        </button>
      </div>
      
      <p className="mt-4">Página {page} de {totalPages}</p> {/* Muestra la página actual y el total */}
    </div>
    </div>
  );
};

export default Home;
