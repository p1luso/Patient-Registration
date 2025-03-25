import React, { useContext, useState, useEffect } from "react";
import { addPatient, getPatients, postPatient } from "../services/patientService";

const PatientContext = React.createContext(null);

export const PatientProvider = ({ children }) => {
    const [patients, setPatients] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);  
    const [loading, setLoading] = useState(false);  

    const fetchPatients = async () => {
        setLoading(true); 
        try {
            const data = await getPatients(page); 
            if (data) {
                setPatients(data.patients);
                setTotalPages(data.totalPages);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error("Error al cargar los pacientes:", error);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchPatients(); 
    }, [page]);

    const newPatient = async (patientData) => {
        const response = await addPatient(patientData);
        if (response.success) {
            setPatients(prevPatients => [...prevPatients, response.data]);
            return { success: true };
        } else {
            return { success: false, message: response.message };
        }
    };

    return (
        <PatientContext.Provider value={{ patients, setPatients, newPatient, fetchPatients, page, setPage, totalPages, loading }}>
            {children}
        </PatientContext.Provider>
    );
};

PatientProvider.displayName = "PatientProvider";

export const usePatients = () => useContext(PatientContext);
