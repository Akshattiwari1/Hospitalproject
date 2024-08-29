const Joi=require('joi')

const studentSchema = Joi.object({
    eid: Joi.number().min(1).max(500).required(),
    roleid: Joi.string().min(2).max(50).required(),
    
})
const validateSchema = (req, res, next) => {
    const { error, value } = studentSchema.validate(req.body);
    if (error) {
        console.log(error);
        return res.send("invalid req")
    }
    else{
    next();
    }
}
module.exports={ validateSchema }