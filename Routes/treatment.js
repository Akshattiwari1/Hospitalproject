const express = require('express');
const treatment_router = express.Router();
const {treatmentget, treatmentpost, treatmentput, treatmentdelete} = require('../Controllers/treatment');


treatment_router.post('/api/treatmentpost', treatmentpost);


treatment_router.get('/api/treatmentget', treatmentget);


treatment_router.put('/api/treatmentput/:did', treatmentput);

treatment_router.delete('/api/treatmentput/:did', treatmentdelete);

module.exports = treatment_router;
