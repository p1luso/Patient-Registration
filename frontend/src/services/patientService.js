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
        const response = await axios.post(API_URL, patientData);

        if (response.status === 201) {
            return { success: true, data: response.data }; 
        } else {
            return { success: false, message: response.data.message || 'Error desconocido' };
        }
    } catch (error) {
        console.error('Error adding patient:', error);
        return { success: false, message: error.response?.data?.message || 'Error inesperado' };
    }
};


