const express = require('express');
const role_router = express.Router();
const { rolesget, rolespost, rolesput, rolesdelete  } = require('../Controllers/Roles');


role_router.post('/api/rolespost', rolespost);


role_router.get('/api/rolesget', rolesget);


role_router.put('/api/role/:roleid', rolesput);

role_router.delete('/api/roledelete/:roleid', rolesdelete);

module.exports = role_router;
