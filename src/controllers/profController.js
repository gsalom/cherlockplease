// inici proves nous forms

const {body,  validationResult} = require("express-validator");

// fi proves nous forms


// Display Professor create form on GET.
exports.Professor_create_get = (req, res, next) => {
  res.render("prof_form", {
    title: "Crear Professorat"
  });
};

// Handle Professor create on POST.
exports.Professor_create_post = [
  // Validate and sanitize fields.
  body("codi").trim().isLength({ min: 1 }).escape()withMessage("Codi GestIB must be specified.")
  .isAlphanumeric().withMessage("Codi GestIB has non-alphanumeric characters."),
  body("nom")
  .trim()
  .isLength({
    min: 1
  })
  .escape()
  .withMessage("Nom must be specified.")
  .isAlphanumeric()
  .withMessage("Nom has non-alphanumeric characters."),

  body("llin1")
  .trim()
  .isLength({
    min: 1
  })
  .escape()
  .withMessage("Llin1 must be specified.")
  .isAlphanumeric()
  .withMessage("Llin1 has non-alphanumeric characters."),
  body("llin2")
  .trim()
  .isLength({
    min: 1
  })
  .escape()
  .withMessage("Llin2 must be specified.")
  .isAlphanumeric()
  .withMessage("Llin2 has non-alphanumeric characters."),
  body("email")
  .trim()
  .isLength({
    min: 1
  })
  .escape()
  .withMessage("Email must be specified.")
  .isAlphanumeric()
  .withMessage("Email has non-alphanumeric characters."),

  body("departament")
  .trim()
  .isLength({
    min: 1
  })
  .escape()
  .withMessage("Departament must be specified.")
  .isAlphanumeric()
  .withMessage("Departament has non-alphanumeric characters."),
  body("Comentaris")
  .trim()
  .isLength({
    min: 1
  })
  .escape()
  .withMessage("Comentaris must be specified.")
  .isAlphanumeric()
  .withMessage("Comentaris has non-alphanumeric characters."),
  body("Credit")
  .trim()
  .isLength({
    min: 1
  })
  .escape()
  .withMessage("Credit must be specified.")
  .isAlphanumeric()
  .withMessage("Credit has non-alphanumeric characters."),


  
  // Process request after validation and sanitization.
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Professor object with escaped and trimmed data
    const professor = new Professor({
      codi: req.body.codi,
      nom: req.body.nom,
      llin1: req.body.llin1,
      llin2: req.body.llin2,
      email: req.body.email,
      departament: req.body.departament,
      comentaris: req.body.comentaris,
      credit: req.body.credit
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("prof_form", {
        title: "Crear Professorat",
        professor: Professor,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Save Professor.
      await professor.save();
      // Redirect to new Professor record.
      res.redirect(professorat.ejs);
    }
  }),
];