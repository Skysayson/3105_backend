const express = require('express')
const { register, login, getProfile } = require('../controllers/userController')
const { verifyToken } = require('../middleware/authMiddleWare')
const router = express.Router();

// Routes
router.post('/register', register);
router.post('/login', login);
// Shows the id of the user when specified in the URL of the request
router.get('/profile/:id', getProfile);

module.exports = router;
