const express = require('express');
const labs_router = express.Router();
const {  labsget, labspost, labsput, labsdelete  } = require('../Controllers/labs');
const  {validateSchema}=require('../Controllers/labsvalidate')

labs_router.post('/api/labspost',validateSchema, labspost);


labs_router.get('/api/labsget', labsget);


labs_router.put('/api/labsput/:labid',validateSchema, labsput);

labs_router.delete('/api/labsdelete/:labid', labsdelete );

module.exports = labs_router;
