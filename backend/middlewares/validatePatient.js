const { body, validationResult } = require('express-validator');
const pool = require('../config/db');

const validatePatient = [
  body('fullName')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('El nombre debe contener solo letras y espacios'),

    body('email')
    .isEmail()
    .withMessage('El correo debe ser válido')
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
    .withMessage('Solo se permiten correos de Gmail')
    .custom(async (value) => {
      const result = await pool.query('SELECT * FROM patients WHERE email = $1', [value]);
      if (result.rows.length > 0) {
        throw new Error('Ya existe un paciente con ese correo');
      }
      return true;
    }),
  
  body('phoneNumber')
    .matches(/^\+\d{1,3}\d{6,14}$/)
    .withMessage('Número de teléfono no válido'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validatePatient;
