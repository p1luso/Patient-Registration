const express = require('express');
const patientController = require('../controllers/patientController');
const { validatePatient, validateRequest } = require('../middlewares/validatePatient');
const validatePatientUpdate = require('../middlewares/validatePatientUpdate');
const upload = require('../middlewares/upload');

const router = express.Router();


router.post('/patients', upload.single('documentPhoto'), patientController.registerPatient);
router.get('/patients', patientController.getPatients);
router.get('/patients/:id', patientController.getPatientById);
router.patch('/patients/:id', validatePatientUpdate, patientController.updatePatient);
router.delete('/patients/:id', patientController.deletePatient);

module.exports = router;
