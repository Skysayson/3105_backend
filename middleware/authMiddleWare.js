const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) => {
    const token = req.headers['authorization']

    if(!token) {
        return res.send(403).json({ error: 'no token provided' })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
        if(err) {
            return res.send(401).json({ error: 'Unauthorized' })
        }
        req.userID = decoded.id;
        req.username = decoded.username;
        next();
    })

}

module.exports = { verifyToken }
