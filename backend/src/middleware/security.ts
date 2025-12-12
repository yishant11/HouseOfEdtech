import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Rate limiting middleware
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// Security headers middleware
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
});

// XSS protection middleware
export const xssProtection = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Sanitize input data
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        // Basic XSS prevention
        req.body[key] = req.body[key]
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
    }
  }
  next();
};
