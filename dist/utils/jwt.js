import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET;
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};
export default authenticateJWT;
