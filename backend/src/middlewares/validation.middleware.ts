import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const categories = [
  "Financial and Accounting",
  "Technical and Project Docs",
  "Reports and Analytics ",
  "Policies and Procedures",
  "HR",
];

export const validateDocumentData = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("pages")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Pages must be a positive integer"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(categories)
    .withMessage(`Category must be one of: ${categories.join(", ")}`),
  // body("category")
  //   .custom((value, { req }) => {
  //     // let value = value;
  //     // console.log(typeof(value), value)
  //     if (typeof value === "string") {
  //       console.log("value is string");
  //       const trimmed = value.trim();
  //       console.log("trimmed value: ", trimmed);

  //       if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
  //         try {
  //           value = JSON.parse(trimmed);
  //           console.log("parsed on: ", value);
  //           console.log("is the parsed value an array? ", Array.isArray(value));
  //         } catch (e) {
  //           throw new Error(
  //             "Category must be a valid JSON array or comma-separated string"
  //           );
  //         }
  //       } else {
  //         value = trimmed.split(",").map((item) => item.trim());
  //       }
  //     }

  //     if (!Array.isArray(value)) {
  //       throw new Error("Category must be an array");
  //     }

  //     if (
  //       value.length === 0 ||
  //       !value.every(
  //         (item) => typeof item === "string" && item.trim().length > 0
  //       )
  //     ) {
  //       throw new Error(
  //         "Category must be a non-empty array of non-empty strings"
  //       );
  //     }
  //     // console.log(typeof(value), value)

  //     console.log(
  //       `Final result, category: ${value} is array:  ${Array.isArray(value)}`
  //     );
  //     req.body.category = value;
  //     return true;
  //   })
  //   .customSanitizer((value) => {
  //     if (typeof value === "string") {
  //       const trimmed = value.trim();
  //       if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
  //         return JSON.parse(trimmed);
  //       }
  //       return trimmed.split(",").map((item) => item.trim());
  //     }
  //     return value;
  //   }),
];

export const validateArticleData = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("pages")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Pages must be a positive integer"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(categories)
    .withMessage(`Category must be one of: ${categories.join(", ")}`),
  // body("category").custom((value) => {
  //   if (typeof value === "string") {
  //     try {
  //       value = JSON.parse(value);
  //     } catch (e) {
  //       value = value.split(",");
  //     }
  //   }

  //   if (!Array.isArray(value)) {
  //     throw new Error("Category must be an array");
  //   }

  //   if (
  //     value.length === 0 ||
  //     !value.every((item) => typeof item === "string" && item.trim().length > 0)
  //   ) {
  //     throw new Error(
  //       "Category must be a non-empty array of non-empty strings"
  //     );
  //   }

  //   return true;
  // }),
];

export const validateDiscussionData = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(categories)
    .withMessage(`Category must be one of: ${categories.join(", ")}`),
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const allErrors = errors.array().map((err) => ({
      message: err.msg,
    }));
    return res.status(400).json({
      success: false,
      errors: allErrors,
    });
  }

  next();
};
