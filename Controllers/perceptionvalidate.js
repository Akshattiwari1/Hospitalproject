// backend/Controllers/departmentsvalidation.js
const Joi = require('joi');

const perceptionSchema = Joi.object({
  pid: Joi.number().required(),
  did: Joi.string().min(2).max(50).required(),
  date:Joi.number().min(10).max(12).required(),
  medicine1:Joi.string().min(5).max(7).required(),

});

const validateSchema = (req, res, next) => {
  const { error } = perceptionSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Invalid request");
  } else {
    next();
  }
};

module.exports = { validateSchema };
