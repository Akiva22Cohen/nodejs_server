const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

// פונקציית מיידלוואר / אמצעית
exports.auth = (req, res, next) => {
  // const token = req.header("x-api-key");
  // בודק שנשלח טוקן בהידר
  const token = req.cookies["token"];
  if (!token) {
    return res
      .status(401)
      .json({ msg: "You need to send token to this endpoint url" });
  }
  try {
    // מנסה לפענח את הטוקן אם הוא לא בתוקף
    // או שיש טעות אחרת נעבור לקץ'
    const decodeToken = jwt.verify(token, config.tokenSecret);
    // נעביר את המידע של הטוקן כמאפיין לריק
    // מכיוון שהמשתנה שלו זהה לחלוטין בזכרון לריק של הפונקציה
    // הבאה בשרשור של הראוטר
    req.tokenData = decodeToken;
    // לעבור בפונקציה הבאה בתור בשרשור של הרואטר
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ msg: "Token invalid or expired, log in again or you hacker!" });
  }
};
