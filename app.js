// ספריית אקספרס עם כל היכולות
const express = require("express");
const cors = require("cors");
const { routesInit } = require("./routes/configRoutes");
const cookieParser = require("cookie-parser");
const { logs } = require("./middlewares/logs");

const app = express();
// מאפשר גישה בדפדפן לכל הדומיינים כך שגם דומיין א' יוכל לשלוח בקשה לשרת בדומיין ב
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(logs);

// כדי שנוכל לקבל באדי עם ג'ייסון בבקשות פוסט , עריכה ומחיקה
app.use(express.json());

// פונקציה שאחראית להגדיר את כל הרואטים שנייצר באפלקציית שרת
routesInit(app);

// בודק באיזה פורט להריץ את השרת  , אם בשרת אמיתי אוסף
// את המשתנה פורט מהסביבת עבודה שלו ואם לא 3001
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`is runnig on http://localhost:${port}`);
});
