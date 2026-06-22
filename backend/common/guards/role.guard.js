"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowRoles = void 0;
const allowRoles = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ error: "access denied" });
        }
        next();
    };
};
exports.allowRoles = allowRoles;
//# sourceMappingURL=role.guard.js.map