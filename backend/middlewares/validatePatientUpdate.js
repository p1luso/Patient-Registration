const { body } = require('express-validator');

const validatePatientUpdate = [
    body('fullName').optional().isAlpha().withMessage('El nombre solo debe contener letras'),
    body('email').optional().isEmail().withMessage('El correo debe ser válido')
        .custom(async (value, { req }) => {
            if (value) {
                const patient = await pool.query('SELECT * FROM patients WHERE email = $1 AND id != $2', [value, req.params.id]);
                if (patient.rows.length > 0) {
                    throw new Error('El correo electrónico ya está registrado');
                }
            }
        }),
    body('phoneNumber').optional().matches(/^\+\d{1,3}\d{1,14}$/).withMessage('Número de teléfono no válido')
        .custom(async (value, { req }) => {
            if (value) {
                const patient = await pool.query('SELECT * FROM patients WHERE phone_number = $1 AND id != $2', [value, req.params.id]);
                if (patient.rows.length > 0) {
                    throw new Error('El número de teléfono ya está registrado');
                }
            }
        }),
    body('documentPhoto').optional().custom((value, { req }) => {
        if (value && !req.files) {
            throw new Error('La foto del documento es obligatoria');
        }
        return true;
    }),
];

module.exports = validatePatientUpdate;
