const express = require('express');
const BILL_router = express.Router();
const { BILLget, BILLpost, BILLput, BILLdelete } = require('../Controllers/BILL');
const { validateSchema } = require('../Controllers/Billvalidate');

// Use validateSchema middleware for POST requests
BILL_router.post('/api/BILLpost', validateSchema, BILLpost);

BILL_router.get('/api/BILLget', BILLget);

BILL_router.put('/api/BILLput/:Pid', BILLput);

// Correct DELETE route path
BILL_router.delete('/api/BILLdelete/:pid', BILLdelete);

module.exports = BILL_router;
