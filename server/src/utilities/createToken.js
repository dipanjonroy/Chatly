const jwt  = require("jsonwebtoken");

module.exports.createToken = (payload, secretKey, time)=>{
  return jwt.sign(payload, secretKey, {expiresIn : time})
}