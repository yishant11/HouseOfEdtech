import { ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";
export declare const handleValidationErrors: (req: Request, res: Response, next: NextFunction) => void;
export declare const userValidationRules: () => ValidationChain[];
export declare const productValidationRules: () => ValidationChain[];
//# sourceMappingURL=validation.d.ts.map