const express = require("express");
const router = express.Router();
const createConnection = require("../../db/database");
const mysql = require("mysql2");
var uniqid = require("uniqid");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/login", function(req, res) {
  const { email, password } = req.body;
  req.session.lok = "FRA LOGIN";
  const sql =
    "SELECT id, firstname, password, invite_key FROM user WHERE email = ?";

  const connection = createConnection();

  connection.query(sql, email, function(error, results, fields) {
    if (error) {
      res.json({
        success: false,
        message: "Credentials doesn't match"
      });
    }
    if (results.length === 1) {
      bcrypt.compare(password, results[0].password, function(err, result) {
        if (err) throw err;
        if (result) {
          req.session.userId = results[0].id;
          req.session.name = results[0].firstname;
          req.session.inviteKey = results[0].invite_key;
          res.json({
            success: true,
            message: "Login successful"
          });
        } else {
          res.json({
            success: false,
            message: "Wrong password!"
          });
        }
      });
    } else {
      res.json({
        success: false,
        message: "User does not exist!"
      });
    }
  });
  connection.end();
});

router.post("/create", function(req, res) {
  const { email, firstname, lastname, password } = req.body;

  const inviteKey = uniqid();

  bcrypt.hash(password, saltRounds, function(err, hash) {
    const insert = [email, firstname, lastname, hash, inviteKey];

    let sql =
      "INSERT INTO user (email, firstname, lastname, password, invite_key) VALUES (?)";
    sql = mysql.format(sql, [insert]);

    const connection = createConnection();
    connection.query(sql, function(error, results, fields) {
      if (error) {
        res.json({
          success: false,
          message: "User created failed!"
        });
      }
      if (results) {
        req.session.userId = results.insertId;
        req.session.name = firstname;
        res.json({
          success: true,
          id: results.insertId,
          message: "User successfully created!"
        });
      }
    });
    connection.end();
  });
});

router.get("/logout", function(req, res) {
  if (req.session.userId && req.session.name) {
    req.session.destroy();
    res.json({
      success: true,
      message: "Successfully logged out!"
    });
  } else {
    res.json({
      success: false,
      message: "Something weird with logout has happened!"
    });
  }
});

module.exports = router;
