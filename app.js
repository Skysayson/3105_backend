const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config();

// Import middlewares
const { verifyToken } = require('./middleware/authMiddleWare');
const { logRequests } = require('./middleware/logMiddleWare');

// Import routes
const userRoutes = require('./routes/user');

// Apply logging middleware globally (logs all incoming requests)
app.use(logRequests);

// Parse JSON in incoming requests
app.use(express.json());

app.get('/',(req,res) => {
    res.send("3105-Backend Activity")
})

// Use the user routes
app.use('/api', userRoutes);

// Protected route (requires token)
app.get('/api/profile', verifyToken, (req, res) => {
    // Only accessible if token is valid
    res.status(200).json({ message: 'Welcome to your profile!', userId: req.userId });
});

// Start the server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
