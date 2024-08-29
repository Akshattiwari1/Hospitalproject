const express = require('express');
const employee_router = express.Router();
const { employeeget, employeepost, employeeput, employeedelete } = require('../Controllers/employee'); 
const {validateSchema}=require('../Controllers/employeevalidate')

employee_router.post('/api/employeepost',validateSchema, employeepost);
employee_router.get('/api/employeeget', employeeget);
employee_router.put('/api/employeeput/:eid',validateSchema, employeeput);
employee_router.delete('/api/employeeput/:eid', employeedelete);

module.exports = employee_router;
