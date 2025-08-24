const ApiError = require("../utilities/error");
const {
  userRegisterSchema,
  userLoginSchema,
} = require("../validation/authValidation");
const { userUpdateSchema } = require("../validation/userValidation");

module.exports.userRegisterValidator = (req, res, next) => {
  const { error } = userRegisterSchema.validate(req.body);

  if (error) {
    throw new ApiError(403, error.details[0].message);
  } else {
    next();
  }
};

module.exports.userLoginValidator = (req, res, next) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) {
    throw new ApiError(403, error.details[0].message);
  } else {
    next();
  }
};

module.exports.userUpdateValidator = (req, res, next) => {
  const { error } = userUpdateSchema.validate(req.body);
  if (error) {
    throw new ApiError(403, error.details[0].message);
  } else {
    next();
  }
};
