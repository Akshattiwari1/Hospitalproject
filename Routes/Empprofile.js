const express = require('express');
const employee_router = express.Router();
const { Empprofileget, Empprofilepost, Empprofileput, Empprofiledelete } = require('../Controllers/Empprofile');
const {validateSchema}=require('../Controllers/Empprofilevalidate')


employee_router.get('/api/Empprofileget',validateSchema, Empprofileget);
employee_router.post('/api/Empprofilepost', Empprofilepost);
employee_router.put('/api/Empprofileput/:eid',validateSchema, Empprofileput);
employee_router.delete('/api/Empprofiledelete/:eid', Empprofiledelete);

module.exports = employee_router;
