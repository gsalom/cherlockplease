// inici proves nous forms

const { body, validationResult } = require("express-validator");

// fi proves nous forms


// Display Author create form on GET.
exports.author_create_get = (req, res, next) => {
    res.render("prof_form", { title: "Crear Professorat" });
  };

  // Handle Author create on POST.
exports.author_create_post = [
    // Validate and sanitize fields.
    body("first_name")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("First name must be specified.")
      .isAlphanumeric()
      .withMessage("First name has non-alphanumeric characters."),
    body("family_name")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Family name must be specified.")
      .isAlphanumeric()
      .withMessage("Family name has non-alphanumeric characters."),
    body("date_of_birth", "Invalid date of birth")
      .optional({ values: "falsy" })
      .isISO8601()
      .toDate(),
    body("date_of_death", "Invalid date of death")
      .optional({ values: "falsy" })
      .isISO8601()
      .toDate(),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create Author object with escaped and trimmed data
      const author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      });
  
      if (!errors.isEmpty()) {
        // There are errors. Render form again with sanitized values/errors messages.
        res.render("prof_form", {
          title: "Crear Professorat",
          author: author,
          errors: errors.array(),
        });
        return;
      } else {
        // Data from form is valid.
  
        // Save author.
        await author.save();
        // Redirect to new author record.
        res.redirect(professorat.ejs);
      }
    }),
  ];