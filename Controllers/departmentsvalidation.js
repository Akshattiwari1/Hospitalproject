const Joi = require('joi');

const departmentSchema = Joi.object({
  did: Joi.number().required(),
  dname: Joi.string().min(2).max(50).required(), // Ensure this matches your frontend field name
  // Add other fields as required
});

const validateSchema = (req, res, next) => {
  const { error } = departmentSchema.validate(req.body);
  if (error) {
    console.error(error.details); // Log the detailed error for debugging
    return res.status(400).send("Invalid request");
  } else {
    next();
  }
};

module.exports = { validateSchema };
