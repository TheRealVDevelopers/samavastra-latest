"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = authenticateJWT;
// TEMPORARY: Auth bypassed — always authenticated as admin
const MOCK_USER_PAYLOAD = {
    id: 'demo-user-001',
    email: 'admin@samavest.com',
    userRole: 'ADMIN',
    firstName: 'Demo',
    lastName: 'User'
};
function authenticateJWT(req, res, next) {
    console.log('TEMPORARY: Bypassing auth for request:', req.method, req.url);
    // Set mock user on request
    req.user = MOCK_USER_PAYLOAD;
    return next();
}
//# sourceMappingURL=auth.js.map