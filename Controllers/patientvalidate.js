const Joi = require('joi');

const patientSchema = Joi.object({
  pid: Joi.number().required(),
  pname: Joi.string().min(2).max(50).required(),
  mob: Joi.string().min(2).max(15).required(), // Adjusted to string with length constraints
  gender: Joi.string().min(1).max(7).required(),
  age: Joi.number().min(0).max(120).required()  // Adjusted age range to be more realistic
  // Add other fields as needed
});

const validateSchema = (req, res, next) => {
  const { error } = patientSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Invalid request");
  } else {
    next();
  }
};

module.exports = { validateSchema };
