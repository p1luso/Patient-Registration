const pool = require('../config/db');
const { body, validationResult } = require('express-validator');

// Validaciones
const validatePatient = (req, res, next) => {
    // Primero validamos los campos de texto
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Validar que se haya subido un archivo para `documentPhoto`
    if (!req.files || !req.files.documentPhoto) {
        return res.status(400).json({ message: 'Es necesario subir una foto del documento' });
    }

    // Verificar que el archivo sea una imagen válida (por ejemplo, JPEG)
    const documentPhoto = req.files.documentPhoto;
    if (!documentPhoto.mimetype.startsWith('image/')) {
        return res.status(400).json({ message: 'El archivo debe ser una imagen' });
    }

    if (documentPhoto.mimetype !== 'image/jpeg') {
        return res.status(400).json({ message: 'Solo se permiten imágenes en formato JPG' });
    }

    // Validar que el tamaño del archivo no sea mayor a 2 MB (por ejemplo)
    if (documentPhoto.size > 2 * 1024 * 1024) {
        return res.status(400).json({ message: 'La foto del documento no debe superar los 2 MB' });
    }

    // Validaciones de los campos de texto (como nombre, email y teléfono)
    body('fullName')
        .isAlpha('es-ES', { ignore: ' ' })
        .withMessage('El nombre debe contener solo letras y espacios')
        .run(req);
    
    body('email')
        .isEmail()
        .withMessage('El correo debe ser válido')
        .custom(async (value) => {
            const result = await pool.query('SELECT * FROM patients WHERE email = $1', [value]);
            if (result.rows.length > 0) {
                throw new Error('Ya existe un paciente con ese correo');
            }
            return true;
        })
        .run(req);
    
    body('phoneNumber')
        .matches(/^\+\d{1,3}\d{1,14}$/)
        .withMessage('Número de teléfono no válido')
        .run(req);

    next();
};

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validatePatient, validateRequest };
