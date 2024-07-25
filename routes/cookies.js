const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "cookies work!" });
});

router.get("/check", async (req, res) => {
  if (req.cookies["myCookie"]) {
    return res.json({ msg: req.cookies.myCookie });
  } else {
    res.json({ msg: "No cookie" });
  }
});

router.get("/test", async (req, res) => {
  res
    .cookie("myCookie", "hello monkeys 2222", {
      httpOnly: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    })
    .json({ msg: "cookies sended" });
});

router.delete("/", async (req, res) => {
  res
    .cookie("myCookie", "", {
      httpOnly: false,
      expires: new Date(Date.now() - 999999),
    })
    .json({ msg: "Cookie deleted" });
});

module.exports = router;
