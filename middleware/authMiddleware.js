import * as jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader  = req.header('Authorization');
    if (!authHeader ) {
        return res.status(401).json({ message: 'Access Denied. No token provided.'});
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Invalid token format' });
    }

    try {
        // const decoded = jwt.verify(authHeader, JWT_SECRET);
        const decoded = jwt.decode(token, { complete: true });
        console.log(decoded);
        req.employee = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

export const AuthMiddleware = authMiddleware;