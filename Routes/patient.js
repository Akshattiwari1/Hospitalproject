const express = require('express');
const patient_router = express.Router();
const { patientget, patientpost, patientput, patientdelete } = require('../Controllers/patient');
const{validateSchema}=require('../Controllers/patientvalidate')

patient_router.post('/api/patientpost',validateSchema, patientpost);


patient_router.get('/api/patientget', patientget);


patient_router.put('/api/patientput/:pid', patientput);

patient_router.delete('/api/patientd/:pid', patientdelete);

module.exports = patient_router;
