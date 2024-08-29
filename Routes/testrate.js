const express = require('express');
const test_router = express.Router();
const { testrateget, testratepost, testrateput, testratedelete  } = require('../Controllers/testrate');


test_router.post('/api/testratepost', testratepost);


test_router.get('/api/testrateget', testrateget);


test_router.put('/api/testrate/:testid', testrateput);

test_router.delete('/api/testratedelete/:testid', testratedelete);

module.exports = test_router;
