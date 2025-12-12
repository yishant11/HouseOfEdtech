"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => (req, res, next) => {
    try {
        console.log("Request Body:", req.body); // Log request body for debugging
        // Validate the request body against the schema
        const parsedData = schema.parse(req.body);
        // Attach the parsed and validated data back to req.body
        req.body = parsedData;
        next();
    }
    catch (error) {
        console.error("Validation Error:", error); // Log validation error
        if (error instanceof zod_1.ZodError) {
            const errorDetails = error.issues.map((err) => ({
                param: err.path[0],
                msg: err.message,
            }));
            res.status(400).json({
                message: "Validation failed",
                errors: errorDetails,
            });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
exports.validate = validate;
//# sourceMappingURL=middleware.js.map