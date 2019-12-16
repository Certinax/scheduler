const express = require("express");
const router = express.Router();
const createConnection = require("../db/database");
const mysql = require("mysql2");
const dateConverter = require("../tools/datehandler");

router.get("/", function(req, res) {
  if (req.session.userId && req.session.name) {
    res.render("page/appointment", {
      appointment: true,
      title: "Appointment",
      username: req.session.name,
      inviteKey: req.session.inviteKey
    });
  } else {
    res.redirect("/");
  }
});

router.post("/create", function(req, res) {
  if (req.session.userId && req.session.name) {
    const { date, startTime, endTime } = req.body;
    const startDate = date + " " + startTime;
    const endDate = date + " " + endTime;

    const inputs = [startDate, endDate, req.session.userId];

    let sql =
      "INSERT INTO appointment (`start_time`, `end_time`, `owner`) VALUES (?)";

    sql = mysql.format(sql, [inputs]);

    const connection = createConnection();

    connection.execute(sql, function(error, result, fields) {
      if (error) {
        console.log(error);
        if (error.errno === 1062) {
          res.json({
            success: false,
            message:
              "You already have an appointment listed for this time and date"
          });
        } else {
          res.json({
            success: false,
            message: "Appointment cannot be added at this time"
          });
        }
      }
      if (result) {
        res.json({
          success: true,
          insertId: result.insertId,
          message: "Appointment added"
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: "You dont have privilege"
    });
  }
});

router.get("/getAppointments", function(req, res) {
  if (req.session.userId && req.session.name) {
    const sql =
      "SELECT A.*, TIMESTAMPDIFF(HOUR, A.start_time, A.end_time) AS duration FROM `appointment` as A WHERE A.owner = ? AND start_time >= date(curdate() - INTERVAL 8 HOUR) ORDER BY start_time;";

    const connection = createConnection();

    connection.query(sql, req.session.userId, function(error, results, fields) {
      if (error) {
        console.log(error);
        res.json({
          success: false,
          message: "Failed retrieving appointments"
        });
      }
      if (results) {
        results.map(appointment => {
          // Formatting sql date object into YYYY-MM-DD format
          appointment.date = dateConverter(appointment.start_time);
          appointment.start_time = extractTime(appointment.start_time);
          appointment.end_time = extractTime(appointment.end_time);
        });
        console.log(results);
        res.json({
          success: true,
          data: results
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: "You don't have permission to view this data"
    });
  }
});

router.delete("/", function(req, res) {
  if (req.session.userId && req.session.name) {
    const appointmentId = req.body.appointmentId;

    const sql = "DELETE A.* FROM appointment AS A WHERE id = ?";

    const connection = createConnection();
    connection.query(sql, appointmentId, function(error, results, fields) {
      if (error) throw error;
      if (results) {
        if (results.affectedRows === 1) {
          res.json({
            success: true,
            message: "Appoinment deleted"
          });
        } else {
          res.json({
            success: false,
            message: "No rows were deleted"
          });
        }
      }
    });
  } else {
    res.json({
      success: false,
      message: "You don't have permission to delete"
    });
  }
});

router.get("/:id", function(req, res) {
  if (req.session.userId && req.session.name) {
    const id = req.params.id;

    const sql = "SELECT * from appointment WHERE id = ?";

    const connection = createConnection();
    connection.query(sql, id, function(error, results, fields) {
      if (error) {
        res.json({
          success: false,
          message: "Appointment not found"
        });
      } else if (results.length === 1) {
        results.map(appointment => {
          appointment.date = dateConverter(appointment.start_time);
          appointment.start_time = extractTime(appointment.start_time);
          appointment.end_time = extractTime(appointment.end_time);
        });
        res.json({
          success: true,
          message: "Successful",
          data: results
        });
      }
    });
  }
});

module.exports = router;

function extractTime(date) {
  if (date) {
    return date.toLocaleTimeString().slice(0, 5);
  }
  return;
}
