// backend/Controllers/departmentsvalidation.js
const Joi = require('joi');

const labsSchema = Joi.object({
  labid: Joi.string().required(),
  labname: Joi.string().min(2).max(50).required(),
  roomno:Joi.string().min(2).max(10).required()
});

const validateSchema = (req, res, next) => {
  const { error } = labsSchema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send("Invalid request");
  } else {
    next();
  }
};

module.exports = { validateSchema };
