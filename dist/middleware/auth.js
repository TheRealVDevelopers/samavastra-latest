"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = authenticateJWT;
const jwt_1 = require("../shared/utils/jwt");
function authenticateJWT(req, res, next) {
    const header = req.headers['authorization'];
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or invalid authorization header' });
    }
    const token = header.slice(7);
    try {
        const payload = (0, jwt_1.verifyJwt)(token);
        req.user = payload;
        return next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}
//# sourceMappingURL=auth.js.map