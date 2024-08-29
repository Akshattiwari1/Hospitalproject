const express = require('express');
const departments_router = express.Router();
const { departmentsget, departmentspost, departmentsput, departmentsdelete } = require('../Controllers/Departments');
const { validateSchema } = require('../Controllers/departmentsvalidation'); // Correct path

departments_router.post('/api/departmentspost', validateSchema, departmentspost); // Added validation middleware

departments_router.get('/api/departmentsget', departmentsget);

departments_router.put('/api/departmentsput/:did', validateSchema, departmentsput); // Added validation middleware

departments_router.delete('/api/departmentsdelete/:did', departmentsdelete); // Corrected route path

module.exports = departments_router;
