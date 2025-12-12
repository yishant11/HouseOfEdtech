import { Request, Response } from "express";
export declare const getProducts: (req: Request, res: Response) => Promise<void>;
export declare const getProductByIdController: (req: Request, res: Response) => Promise<void>;
export declare const createProductController: ((req: Request, res: Response, next: import("express").NextFunction) => void)[];
export declare const updateProductController: ((req: Request, res: Response, next: import("express").NextFunction) => void)[];
export declare const deleteProductController: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=productController.d.ts.map