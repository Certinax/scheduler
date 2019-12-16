const express = require("express");
const router = express.Router();

// Home page
router.get("/", function(req, res, next) {
  res.render("index");
});

// * API Router.
// router.use("/api", apiRouter);

module.exports = router;
