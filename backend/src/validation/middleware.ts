import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export const validate =
  (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      console.log("Request Body:", req.body); // Log request body for debugging
      // Validate the request body against the schema
      const parsedData = schema.parse(req.body);
      // Attach the parsed and validated data back to req.body
      req.body = parsedData;
      next();
    } catch (error) {
      console.error("Validation Error:", error); // Log validation error
      if (error instanceof ZodError) {
        const errorDetails = error.issues.map((err: any) => ({
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
