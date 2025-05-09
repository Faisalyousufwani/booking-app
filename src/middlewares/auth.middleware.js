import jwt from "jsonwebtoken"
export const authMiddleware = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader
        if (!token) return res.status(401).json({ message:'Access token missing'});
        jwt.verify(token, process.env.JWT_secret, (err,user) => {
            if (err) return res.status(403).json({ message:'Invalid token'});

            req.user = user;
            next();
        });
    };
