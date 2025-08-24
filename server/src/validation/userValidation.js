const Joi = require("joi");

module.exports.userUpdateSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "Firstname is required.",
    "string.empty": "Firstname can't be empty.",
  }),

  lastName: Joi.string().required().messages({
    "any.required": "Lastname is required.",
    "string.empty": "Lastname can't be empty.",
  }),
});
