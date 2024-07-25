const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

exports.createToken = (user_id) => {
  // פרמטר ראשון - תכולה מקודדת של טוקן
  // פרמטר שני - מילה סודית שככה נוכל גם לפענח את הקידוד
  // אסור לעולם לחשוף את המילה הזאתי
  // פרמטר שלישי - טווח זמן שבו יפוג התוקף
  // של הטוקן ולאחר מכן הוא לא יהיה שמיש
  const token = jwt.sign({ _id: user_id }, config.tokenSecret, {
    expiresIn: "30d",
  });
  return token;
};

exports.validateUser = (_reqBody) => {
  const joiSchema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    // email() -> בודק שהמייל שנשלח במאפיין הגיוני למייל
    email: Joi.string().min(2).max(150).email().required(),
    password: Joi.string().min(3).max(16).required(),
  });
  return joiSchema.validate(_reqBody);
};

// וולדזציה להתחברות
exports.validateLogin = (_reqBody) => {
  const joiSchema = Joi.object({
    email: Joi.string().min(2).max(150).email().required(),
    password: Joi.string().min(3).max(16).required(),
  });
  return joiSchema.validate(_reqBody);
};
