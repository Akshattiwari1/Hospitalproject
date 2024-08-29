const express = require('express');
const perception_router = express.Router();
const { perceptionget, perceptionpost, perceptionput, perceptiondelete } = require('../Controllers/perception');
const {validateSchema}=require('../Controllers/perceptionvalidate')


perception_router.post('/api/perceptionpost',validateSchema, perceptionpost);
perception_router.get('/api/perceptionget', perceptionget);
perception_router.put('/api/perceptionput/:pid',validateSchema, perceptionput);
perception_router.delete('/api/perceptiondelete/:pid', perceptiondelete);

module.exports = perception_router;
