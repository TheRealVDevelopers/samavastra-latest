"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const routes_1 = __importDefault(require("./portals/chalkboard/routes"));
const routes_2 = __importDefault(require("./portals/samavest/routes"));
const errorHandler_1 = require("./middleware/errorHandler");
// Import marketplace routes
const product_routes_1 = __importDefault(require("./modules/marketplace/products/product.routes"));
const order_routes_1 = __importDefault(require("./modules/marketplace/orders/order.routes"));
const logistics_routes_1 = __importDefault(require("./modules/marketplace/logistics/logistics.routes"));
const payment_routes_1 = __importDefault(require("./modules/marketplace/payments/payment.routes"));
const notification_routes_1 = __importDefault(require("./modules/notifications/notification.routes"));
const fee_routes_1 = __importDefault(require("./modules/fees/fee.routes"));
const inventory_routes_1 = __importDefault(require("./modules/marketplace/inventory/inventory.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('combined'));
// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/chalkboard', routes_1.default);
app.use('/api/samavest', routes_2.default);
app.use('/api/notifications', notification_routes_1.default);
app.use('/api/fees', fee_routes_1.default);
// Mount Marketplace Modules under /api/marketplace
const marketplaceRouter = express_1.default.Router();
marketplaceRouter.use('/products', product_routes_1.default);
marketplaceRouter.use('/orders', order_routes_1.default);
marketplaceRouter.use('/logistics', logistics_routes_1.default);
marketplaceRouter.use('/payments', payment_routes_1.default);
marketplaceRouter.use('/inventory', inventory_routes_1.default);
app.use('/api/marketplace', marketplaceRouter);
// Serve frontend (samavest-portal build)
const portalDistPath = path_1.default.join(__dirname, '..', 'samavest-portal', 'dist');
app.use(express_1.default.static(portalDistPath));
// SPA fallback: for GET requests that aren't API and aren't static files, serve index.html
// Express 5 requires a named wildcard: * is not valid (path-to-regexp)
app.get('/{*path}', (req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api'))
        return next();
    res.sendFile(path_1.default.join(portalDistPath, 'index.html'), (err) => {
        if (err)
            next(err);
    });
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map