const Joi = require('joi');

const studentSchema = Joi.object({
    pid: Joi.number().integer().min(1).max(500).required(),
    did: Joi.string().min(2).max(50).required(),
    tid: Joi.string().min(3).max(5000).required(),
    date: Joi.date().iso().required(), // Ensures the date is in ISO format
});

const validateSchema = (req, res, next) => {
    const { error } = studentSchema.validate(req.body);
    if (error) {
        console.log(error);
        return res.status(400).send(`Invalid request: ${error.details[0].message}`);
    } else {
        next();
    }
};

module.exports = { validateSchema };
