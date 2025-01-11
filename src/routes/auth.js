const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin, validate } = require('../middlewares/validator');
const auth = require('../middlewares/auth');

// Register route
router.post('/register', validateRegister, validate, authController.register);

// Login route
router.post('/login', validateLogin, validate, authController.login);

// Get profile route (protected)
router.get('/profile', auth, authController.getProfile);

module.exports = router;