const { body } = require("express-validator");

const blogValidationRules = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("content")
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long"),

  body("author")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Author name must be under 50 characters"),
];

module.exports = blogValidationRules;
