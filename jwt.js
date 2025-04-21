const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token not found or invalid format' });
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach decoded user info
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        res.status(401).json({ error: 'Invalid token' });
    }
};

//function to generate token
const generateToken = (userData) =>{
    //generate a new token using user data
    return jwt.sign(userData, process.env.JWT_SECRET)
}

module.exports = {jwtAuthMiddleware, generateToken};