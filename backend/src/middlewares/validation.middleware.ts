import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateDocumentData = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("pages")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Pages must be a positive integer"),
  body("category").optional(),
  body("category").custom((value, { req }) => {
    let parsedValue = value;

    if (typeof value === "string") {
      const trimmed = value.trim();

      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
          parsedValue = JSON.parse(trimmed);
        } catch (e) {
          throw new Error(
            "Category must be a valid JSON array or comma-separated string"
          );
        }
      } else {
        parsedValue = trimmed.split(",").map((item) => item.trim());
      }
    }

    if (!Array.isArray(parsedValue)) {
      throw new Error("Category must be an array");
    }

    if (
      parsedValue.length === 0 ||
      !parsedValue.every(
        (item) => typeof item === "string" && item.trim().length > 0
      )
    ) {
      throw new Error(
        "Category must be a non-empty array of non-empty strings"
      );
    }

    req.body.category = parsedValue;
    return true;
  }),

  body("documentVersion")
    .trim()
    .notEmpty()
    .withMessage("Document version is required"),
];

export const validateArticleData = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("pages")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Pages must be a positive integer"),
  body("category").custom((value) => {
    if (typeof value === "string") {
      try {
        value = JSON.parse(value);
      } catch (e) {
        value = value.split(",");
      }
    }

    if (!Array.isArray(value)) {
      throw new Error("Category must be an array");
    }

    if (
      value.length === 0 ||
      !value.every((item) => typeof item === "string" && item.trim().length > 0)
    ) {
      throw new Error(
        "Category must be a non-empty array of non-empty strings"
      );
    }

    return true;
  }),
];

export const validateDiscussionData = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("category").custom((value) => {
    if (typeof value === "string") {
      try {
        value = JSON.parse(value);
      } catch (e) {
        value = value.split(",");
      }
    }

    if (!Array.isArray(value)) {
      throw new Error("Category must be an array");
    }

    if (
      value.length === 0 ||
      !value.every((item) => typeof item === "string" && item.trim().length > 0)
    ) {
      throw new Error(
        "Category must be a non-empty array of non-empty strings"
      );
    }
    return true;
  }),
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
