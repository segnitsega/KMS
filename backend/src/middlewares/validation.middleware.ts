import { body, validationResult } from 'express-validator';
import { ApiError } from '../utils/api-error-class';
import { Request, Response, NextFunction } from 'express';

export const validateDocumentData = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required'),

  body('pages')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Pages must be a positive integer'),

  body('category')
    .custom((value) => {
      if (typeof value === 'string') {
        try {
          value = JSON.parse(value); 
        } catch (e) {
          value = value.split(','); 
        }
      }

      if (!Array.isArray(value)) {
        throw new Error('Category must be an array');
      }

      if (value.length === 0 || !value.every((item) => typeof item === 'string' && item.trim().length > 0)) {
        throw new Error('Category must be a non-empty array of non-empty strings');
      }
      return true;
    }),

  body('documentVersion')
    .trim()
    .notEmpty()
    .withMessage('Document version is required'),
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);

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