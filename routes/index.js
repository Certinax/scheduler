const express = require("express");
const router = express.Router();
const authRouter = require("./auth/index");

// Home page
router.get("/", function(req, res, next) {
  console.log("userId: ", req.session.userId);
  console.log("Name: ", req.session.name);
  if (req.session.userId && req.session.name) {
    res.render("index", {
      title: "Scheduler",
      username: req.session.name
    });
  } else {
    res.render("index", {
      title: "Scheduler"
    });
  }
});

router.use("/auth", authRouter);

module.exports = router;
