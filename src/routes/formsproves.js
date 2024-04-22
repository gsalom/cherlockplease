-- npm install express-validator

const { body, validationResult } = require("express-validator");


 // …
 body("name", "Empty name").trim().isLength({ min: 1 }).escape(),
 // …

 // …
 body("age", "Invalid age")
 .optional({ values: "falsy" })
 .isISO8601()
 .toDate(),
// …

// …
body("name")
.trim()
.isLength({ min: 1 })
.withMessage("Name empty.")
.isAlpha()
.withMessage("Name must be alphabet letters."),
// …


asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      // Error messages can be returned in an array using `errors.array()`.
    } else {
      // Data from form is valid.
    }
  });
  