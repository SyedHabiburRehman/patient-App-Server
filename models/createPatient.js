const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CreatePatientSchema = new Schema({
    patientName: {
        type: String,
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    medication: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const CreatePatient = mongoose.model('createPatient', CreatePatientSchema);
module.exports = CreatePatient;