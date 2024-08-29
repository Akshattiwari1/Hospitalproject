const express = require('express');
const { register, login, protectRoute, loginVerification } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify', protectRoute, loginVerification);

module.exports = router;
