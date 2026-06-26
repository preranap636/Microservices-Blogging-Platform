import jwt, {} from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Please Login - No auth header",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SEC;
        if (!secret) {
            console.error("❌ JWT_SEC is not defined in .env file");
            res.status(500).json({
                message: "Internal server error: JWT secret not configured",
            });
            return;
        }
        const decodeValue = jwt.verify(token ?? "", secret);
        if (!decodeValue || !decodeValue.user || !decodeValue.user._id) {
            res.status(401).json({
                message: "Invalid token",
            });
        }
        req.user = decodeValue.user;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({
                message: "Session expired. Please log in again.",
            });
            return;
        }
        res.status(401).json({
            message: "Invalid token or authentication error",
        });
    }
};
//# sourceMappingURL=isAuth.js.map