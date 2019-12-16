const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  if (req.session.userId && req.session.name) {
    res.render("page/appointment", {
      appointment: true,
      title: "Appointment",
      username: req.session.name
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
