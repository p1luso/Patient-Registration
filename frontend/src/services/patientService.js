import axios from 'axios';

const API_URL = 'http://localhost:5000/api/patients';

export const getPatients = async (page = 1) => {
    try {
        const response = await axios.get(`${API_URL}?page=${page}`);
        return response.data;  // Devolver todos los datos, incluidos `patients` y `totalPages`
    } catch (error) {
        console.error('Error fetching patients:', error);
        throw error;
    }
};

export const addPatient = async (patientData) => {
    try {
        const formData = new FormData();
        formData.append('fullName', patientData.fullName);
        formData.append('email', patientData.email);
        formData.append('phoneNumber', patientData.phoneNumber);

        // Si el usuario subió un archivo, agregarlo al FormData
        if (patientData.documentPhoto instanceof File) {
            formData.append('documentPhoto', patientData.documentPhoto);
        }

        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'  // Importante para enviar archivos
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error adding patient:', error);
        throw error;
    }
};
