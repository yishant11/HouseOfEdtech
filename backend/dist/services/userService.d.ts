import { IUser } from "../models/User";
import { RegisterInput, LoginInput } from "../validation/schemas";
export declare const getAllUsers: () => Promise<{
    success: boolean;
    data: (import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[];
    message?: undefined;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: unknown;
    data?: undefined;
}>;
export declare const getUserById: (id: string) => Promise<{
    success: boolean;
    message: string;
    data?: undefined;
    error?: undefined;
} | {
    success: boolean;
    data: import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    };
    message?: undefined;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: unknown;
    data?: undefined;
}>;
export declare const createUser: (userData: RegisterInput) => Promise<{
    success: boolean;
    message: string;
    data?: undefined;
    error?: undefined;
} | {
    success: boolean;
    data: {
        _id: string;
        name: string;
        email: string;
        token: string;
    };
    message?: undefined;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: unknown;
    data?: undefined;
}>;
export declare const loginUser: (credentials: LoginInput) => Promise<{
    success: boolean;
    message: string;
    data?: undefined;
    error?: undefined;
} | {
    success: boolean;
    data: {
        _id: string;
        name: string;
        email: string;
        token: string;
    };
    message?: undefined;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: unknown;
    data?: undefined;
}>;
export declare const updateUser: (id: string, updateData: Partial<IUser>) => Promise<{
    success: boolean;
    message: string;
    data?: undefined;
    error?: undefined;
} | {
    success: boolean;
    data: import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    };
    message?: undefined;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: unknown;
    data?: undefined;
}>;
export declare const deleteUser: (id: string) => Promise<{
    success: boolean;
    message: string;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: unknown;
}>;
export declare const getUserProfile: (userId: string) => Promise<{
    success: boolean;
    message: string;
    data?: undefined;
    error?: undefined;
} | {
    success: boolean;
    data: import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    };
    message?: undefined;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: unknown;
    data?: undefined;
}>;
//# sourceMappingURL=userService.d.ts.map