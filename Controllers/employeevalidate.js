const Joi = require('joi');

const employeeSchema = Joi.object({
  eid: Joi.number().required(),
  name: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(6).required(),
  did: Joi.string().required(),
  roomno: Joi.string().required(), // Change this to match the input field name
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
