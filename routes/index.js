const express = require("express");
const router = express.Router();
const authRouter = require("./auth/index");
const appointmentRouter = require("./appointment");

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

router.get("/rubric", function(req, res) {
  res.render("page/rubric", {
    rubric: true,
    title: "Rubric",
    username: req.session.name
  });
});

router.get("/about", function(req, res) {
  res.render("page/about", {
    about: true,
    title: "About",
    username: req.session.name
  });
});

router.use("/auth", authRouter);
router.use("/appointment", appointmentRouter);

module.exports = router;
