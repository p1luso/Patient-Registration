const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    documentPhoto: { type: String, required: true }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;