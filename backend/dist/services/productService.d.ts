import { IProduct } from "../models/Product";
import { ProductInput } from "../validation/schemas";
export declare const getAllProducts: () => Promise<{
    success: boolean;
    data: (import("mongoose").Document<unknown, {}, IProduct, {}, import("mongoose").DefaultSchemaOptions> & IProduct & Required<{
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
export declare const getProductById: (id: string) => Promise<{
    success: boolean;
    message: string;
    data?: undefined;
    error?: undefined;
} | {
    success: boolean;
    data: import("mongoose").Document<unknown, {}, IProduct, {}, import("mongoose").DefaultSchemaOptions> & IProduct & Required<{
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
export declare const createProduct: (productData: ProductInput) => Promise<{
    success: boolean;
    data: import("mongoose").Document<unknown, {}, IProduct, {}, import("mongoose").DefaultSchemaOptions> & IProduct & Required<{
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
export declare const updateProduct: (id: string, productData: ProductInput) => Promise<{
    success: boolean;
    message: string;
    data?: undefined;
    error?: undefined;
} | {
    success: boolean;
    data: import("mongoose").Document<unknown, {}, IProduct, {}, import("mongoose").DefaultSchemaOptions> & IProduct & Required<{
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
export declare const deleteProduct: (id: string) => Promise<{
    success: boolean;
    message: string;
    error?: undefined;
} | {
    success: boolean;
    message: string;
    error: unknown;
}>;
//# sourceMappingURL=productService.d.ts.map