const { registerUser, loginUser, getUserByName, getUserByID } = require('../models/userModel')
const jwt = require('jsonwebtoken')

// Registration Controller
const register = async (req, res) => {
    try {
        await registerUser(req.body)
        return res.status(200).json({ message: 'Successfully Registered' })
    } catch (err) {
        return res.status(404).json({ error: err.message })
    }
}

const login = async (req, res) => {
    try {
        const user = await loginUser(req.body); // Assuming loginUser checks username & password

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create JWT token after successful login
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,  // Use your secret key
            { expiresIn: '1h' } // Optional: sets the token to expire in 1 hour
        );

        return res.status(200).json({
            message: 'Successfully Logged in',
            token: token // Return the token here
        });
    } catch (err) {
        return res.status(403).json({ error: `Unsuccessful Log in ${err.message}` });
    }
};

const getProfile = async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    try {
        const userProfile = getUserByID(userId);
        if (!userProfile) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(userProfile);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    register,
    login,
    getProfile
}