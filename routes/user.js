const express = require('express')
const { register,login, getProfile } = require('../controllers/userController')
const { verifyToken } = require('../middleware/authMiddleWare')
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/profile/:id', getProfile);

module.exports = router;
