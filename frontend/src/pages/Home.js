import React, { useState, useEffect } from "react";
import { usePatients } from "../context/patientContext";
import PatientCard from "../components/PatientCard/PatientCard";
import AddPatientButton from "../components/AddPatientButton";
import PatientForm from "../components/PatientForm/PatientForm";

const Home = () => {
  const { patients, setPage, page, totalPages, loading } = usePatients();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <div className="headerBar">
        <h1 className="text-3xl font-semibold">Lista de Pacientes</h1>
        <AddPatientButton onClick={openModal} />{" "}
      </div>
      <div className="hero">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="content">
            {patients.length > 0
              ? patients.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))
              : <div className="noPatients"><h2>"No hay pacientes"</h2><p>No agregaste ningún paciente todavía!</p></div>}
          </div>
        )}
        <div className="pageButtons">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="mr-2"
          >
            Anterior
          </button>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Siguiente
          </button>
        </div>
        <p className="mt-4">
          Página {page} de {totalPages}
        </p>{" "}
      </div>
      {isModalOpen && <div className="modal"><PatientForm onClose={closeModal} /></div>}
    </div>
  );
};

export default Home;
