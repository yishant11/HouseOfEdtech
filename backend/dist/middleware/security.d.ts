import { Request, Response, NextFunction } from "express";
export declare const limiter: import("express-rate-limit").RateLimitRequestHandler;
export declare const securityHeaders: (req: import("http").IncomingMessage, res: import("http").ServerResponse, next: (err?: unknown) => void) => void;
export declare const xssProtection: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=security.d.ts.map