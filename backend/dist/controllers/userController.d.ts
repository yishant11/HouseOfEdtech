import { Request, Response } from "express";
export declare const getUsers: (req: Request, res: Response) => Promise<void>;
export declare const getUserByIdController: (req: Request, res: Response) => Promise<void>;
export declare const updateUserController: ((req: Request, res: Response, next: import("express").NextFunction) => void)[];
export declare const updateUserRoleController: ((req: Request, res: Response, next: import("express").NextFunction) => void)[];
export declare const deleteUserController: (req: Request, res: Response) => Promise<void>;
export declare const getProfile: (req: Request, res: Response) => Promise<void>;
export declare const updateProfile: ((req: Request, res: Response, next: import("express").NextFunction) => void)[];
//# sourceMappingURL=userController.d.ts.map