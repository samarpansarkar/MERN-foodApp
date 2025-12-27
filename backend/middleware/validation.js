import { body, validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

export const validateRegister = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),

  validate,
];

export const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),

  validate,
];

export const validateOrder = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Order must contain at least one item"),

  body("items.*.name").notEmpty().withMessage("Item name is required"),

  body("items.*.price")
    .isFloat({ min: 0 })
    .withMessage("Item price must be a positive number"),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Item quantity must be at least 1"),

  body("amount")
    .isFloat({ min: 0 })
    .withMessage("Order amount must be a positive number"),

  body("address.firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required"),

  body("address.lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required"),

  body("address.email").trim().isEmail().withMessage("Valid email is required"),

  body("address.phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[0-9]{10,15}$/)
    .withMessage("Phone number must be between 10-15 digits"),

  body("address.street")
    .trim()
    .notEmpty()
    .withMessage("Street address is required"),

  body("address.city").trim().notEmpty().withMessage("City is required"),

  body("address.state").trim().notEmpty().withMessage("State is required"),

  body("address.zipcode").trim().notEmpty().withMessage("Zipcode is required"),

  body("address.country").trim().notEmpty().withMessage("Country is required"),

  validate,
];

export const validateFood = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Food name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Food name must be between 2 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters"),

  body("price")
    .isFloat({ min: 0.01 })
    .withMessage("Price must be a positive number"),

  body("category").trim().notEmpty().withMessage("Category is required"),

  validate,
];
