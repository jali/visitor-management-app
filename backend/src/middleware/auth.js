const jsonwebtoken = require('jsonwebtoken');

module.exports = {
    generateToken: (data, seconds=3600) => {
        const encode = {
            exp: Math.floor(Date.now() / 1000) + seconds,
            ...data
        };
        const token = jsonwebtoken.sign(encode, process.env.TOKEN_SECRET, { algorithm: 'HS256' });
        return token;
    },
    verifyToken: (req, res, next) => {
        try {
            const token = req.header('security_token');
            const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            next();
        } catch (error) {
            return res.status(401).send({ info: 'invalid token' });
        }
    },
    checkRole: (roles) => {
        if (typeof roles === 'string') {
            roles = [roles];
        }
        return (req, res, next) => {
            // Assumes this middleware is used after verifyToken, so req.user is set
            if (req.user && roles.includes(req.user.role)) {
                next();
            } else {
                return res.status(403).send({ info: 'access denied' });
            }
        };
    }
};
