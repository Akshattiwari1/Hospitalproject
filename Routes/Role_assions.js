const express = require('express');
const Role_assions_router = express.Router();
const { Role_assions_post, Role_assions_get,Role_assions_put,Role_assions_delete} = require('../Controllers/Role_assions');
const {validateSchema} =require('../Controllers/Role_assions')

Role_assions_router.post('/api/Role_assions_post', Role_assions_post);


// Role_assions_router.get('/api/Role_assions_get', Role_assions_get);
Role_assions_router.get('/api/Role_assions_get/:eid', Role_assions_get);

Role_assions_router.put('/api/Role_assions_Update/:eid', Role_assions_put);

Role_assions_router.delete('/api/Role_assions_delete/:eid/:roleid', Role_assions_delete);

module.exports = Role_assions_router;
