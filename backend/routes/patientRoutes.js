const express = require('express');
const patientController = require('../controllers/patientController');
const { validatePatient, validateRequest } = require('../middlewares/validatePatient');
const validatePatientUpdate = require('../middlewares/validatePatientUpdate');
const fileUpload = require('express-fileupload'); // Asegúrate de que el middleware esté disponible

const router = express.Router();

// Asegúrate de que express-fileupload esté habilitado para recibir archivos
router.use(fileUpload());  // Esto permitirá el uso de archivos en todas las rutas

// Ruta para registrar un paciente, validando los campos y el archivo
router.post('/patients', validatePatient, validateRequest, patientController.registerPatient);
router.get('/patients', patientController.getPatients);
router.get('/patients/:id', patientController.getPatientById);
router.patch('/patients/:id', validatePatientUpdate, patientController.updatePatient);
router.delete('/patients/:id', patientController.deletePatient);

module.exports = router;
