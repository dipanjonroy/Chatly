const Joi = require("joi");

module.exports.userRegisterSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "Firstname is required.",
    "string.empty": "Firstname can't be empty.",
  }),

  lastName: Joi.string().required().messages({
    "any.required": "Lastname is required.",
    "string.empty": "Lastname can't be empty.",
  }),

  email: Joi.string().email().trim().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email can't be empty.",
    "string.email": "Enter valid email.",
  }),

  password: Joi.string()
    .min(6)
    .required()
    .pattern(
      new RegExp(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d!@#$%&*?]{3,30}$/
      )
    )
    .messages({
      "any.required": "Password is required.",
      "string.empty": "Password can't be empty.",
      "string.min": "Password must be at least 6 characters.",
      "string.pattern.base":
        "Password must contain at least one letter, one number and one special character.",
    }),
  otp: Joi.string().optional(),
  profileImage: Joi.string().optional(),
  socketId: Joi.string().optional(),
  isOnline: Joi.boolean().optional(),
  lastSeen: Joi.date().optional(),
});

module.exports.userLoginSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email can't be empty.",
    "string.email": "Enter valid email.",
  }),

  password: Joi.string().required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password can't be empty.",
  }),
});

