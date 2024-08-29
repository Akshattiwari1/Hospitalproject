// backend/Controllers/departmentsvalidation.js
const Joi = require('joi');

const employeeSchema = Joi.object({
  eid: Joi.number().required(),
  name: Joi.string().min(2).max(50).required(),
  e_ashar:Joi.number().required(),
  e_password:Joi.string().min(5).max(10).required()
  // Add other fields as required
});

const validateSchema = (req, res, next) => {
  const { error } = employeeSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Invalid request");
  } else {
    next();
  }
};

module.exports = { validateSchema };
