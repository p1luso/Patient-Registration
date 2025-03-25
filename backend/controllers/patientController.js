const path = require('path');
const fs = require('fs');
const pool = require('../config/db');
const logger = require('../logs');
const sendConfirmationEmail = require('../middlewares/mail');
const upload = require('../middlewares/upload'); // Importa Multer

// Asegurémonos de que el directorio de archivos exista
const ensureDirectoryExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};


const registerPatient = async (req, res) => {
    try {
        const { fullName, email, phoneNumber } = req.body;
        const documentPhoto = req.file;

        if (!fullName || !email || !phoneNumber || !documentPhoto) {
            return res.status(400).json({ message: 'Todos los campos son requeridos y debe incluir una foto' });
        }

        // Ruta donde se guardó la imagen
        const fileUrl = `http://localhost:5000/uploads/${documentPhoto.filename}`;

        // Verificar si el paciente ya existe
        const existingPatientQuery = 'SELECT * FROM patients WHERE email = $1 OR phone_number = $2';
        const result = await pool.query(existingPatientQuery, [email, phoneNumber]);

        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'Ya existe un paciente con ese correo electrónico o número de teléfono' });
        }

        // Insertar el paciente en la base de datos
        const insertQuery = 'INSERT INTO patients (full_name, email, phone_number, document_photo) VALUES ($1, $2, $3, $4) RETURNING *';
        const insertResult = await pool.query(insertQuery, [fullName, email, phoneNumber, fileUrl]);

        const patient = insertResult.rows[0];

        await sendConfirmationEmail({
            email: patient.email,
            fullName: patient.full_name,
            phoneNumber: patient.phone_number,
            documentPhoto: patient.document_photo
        });

        res.status(201).json({ message: 'Paciente registrado exitosamente', patient });
        logger.info('Paciente registrado exitosamente', patient);
    } catch (error) {
        console.error(error);
        logger.error('Error al registrar el paciente', error);
        res.status(500).json({ message: 'Error al registrar el paciente', error });
    }
};


const updatePatient = async (req, res) => {
    const { id } = req.params;
    const { fullName, email, phoneNumber, documentPhoto } = req.body;

    try {
        const updateQuery = `
            UPDATE patients
            SET 
                full_name = COALESCE($1, full_name),
                email = COALESCE($2, email),
                phone_number = COALESCE($3, phone_number),
                document_photo = COALESCE($4, document_photo)
            WHERE id = $5
            RETURNING *;
        `;
        
        const updateResult = await pool.query(updateQuery, [
            fullName, email, phoneNumber, documentPhoto, id
        ]);

        if (updateResult.rows.length === 0) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        res.status(200).json({ message: 'Paciente actualizado exitosamente', patient: updateResult.rows[0] });
        logger.info('Paciente actualizado exitosamente', updateResult.rows[0]);
    } catch (error) {
        console.error(error);
        logger.error('Error al actualizar el paciente', error);
        res.status(500).json({ message: 'Error al actualizar el paciente', error });
    }
};


const getPatients = async (req, res) => {
    const { page = 1, limit = 4 } = req.query; 

    try {
        const offset = (page - 1) * limit;

        const result = await pool.query(
            'SELECT * FROM patients ORDER BY id DESC LIMIT $1 OFFSET $2', 
            [limit, offset]
        );
        const countResult = await pool.query('SELECT COUNT(*) FROM patients');
        const totalPatients = parseInt(countResult.rows[0].count, 10);
        const totalPages = Math.ceil(totalPatients / limit);
        res.status(200).json({
            patients: result.rows,
            totalPatients,
            totalPages,
            currentPage: page,
        });
        logger.info('Pacientes obtenidos exitosamente', result.rows);
    } catch (error) {
        console.error(error);
        logger.error('Error al obtener los pacientes', error);
        res.status(500).json({ message: 'Error al obtener los pacientes', error });
    }
};

const deletePatient = async (req, res) => {
    const { id } = req.params;

    try {
        const deleteQuery = 'DELETE FROM patients WHERE id = $1 RETURNING *';
        const result = await pool.query(deleteQuery, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        res.status(200).json({ message: 'Paciente eliminado exitosamente', patient: result.rows[0] });
        logger.info('Paciente eliminado exitosamente', result.rows[0]);
    } catch (error) {
        console.error(error);
        logger.error('Error al eliminar el paciente', error);
        res.status(500).json({ message: 'Error al eliminar el paciente', error });
    }
};


const getPatientById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM patients WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }

        res.json(result.rows[0]);
        logger.info('Paciente obtenido exitosamente', result.rows[0]);
    } catch (error) {
        logger.error('Error al obtener el paciente', error);
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el paciente', error });
    }
};

module.exports = {
    registerPatient,
    getPatients,
    updatePatient,
    deletePatient,
    getPatientById 
};
