const Joi = require("joi");

exports.validateTasks = (_reqbody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    time: Joi.string().min(2).max(400).required(),
    created: Joi.number().min(1).max(99999).required(),
    Completed: Joi.number().min(1972).max(2030).required(),
    edit: Joi.string().min(2).max(400).allow(null, ""),
  });
  return joiSchema.validate(_reqbody);
};
