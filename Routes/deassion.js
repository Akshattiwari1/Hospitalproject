const express = require('express');
const deassion_router = express.Router();
const { deassionget, deassionpost, deassionput, deassiondelete } = require('../Controllers/deassion');
const { validateSchema } = require('../Controllers/deassionvalidation');

deassion_router.post('/api/deassionpost', validateSchema, deassionpost); 

deassion_router.get('/api/deassionget', deassionget);

deassion_router.put('/api/deassionput/:eid', validateSchema, deassionput);

deassion_router.delete('/api/deassiondelete/:eid', deassiondelete); 

module.exports = deassion_router;
