$(document).ready(() => {
  getAppointments();
  populateDateTime();
  $("#modalNew").on("shown", function() {
    populateDateTime();
  });

  $("#saveAppointment").on("click", () => {
    createAppointment();
  });

  $("#tableBod").on("click", "button", function() {
    const appointment = $(this)[0].id;
    getSpecificAppointment(appointment);
    $("#appointmentId").text(appointment);
  });

  $("#confirmDelete").on("click", () => {
    deleteAppointment();
  });
});

function populateDateTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const outDate = year + "-" + month + "-" + day;
  $("#startDate").val(outDate);
  $("#startTime").val("08:00");
  $("#endTime").val("09:00");
  const inputs = $("#modalNew").find("input");
  inputs.map(input => {
    prepInput($(inputs[input]).attr("id"));
  });
}

function prepInput(inputField) {
  $(`#${inputField}`).trigger("focusin");
  $(`#${inputField}`).trigger("blur");
}

function createAppointment() {
  $.ajax({
    url: "/appointment/create",
    method: "post",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
      date: $("#startDate").val(),
      startTime: $("#startTime").val(),
      endTime: $("#endTime").val()
    }),
    success: function(result) {
      console.log(result);
      if (result.success) {
        $("#modalNew").modal("toggle");
        getAppointments();
      } else {
        $("#appointmentFeedback").val(result.message);
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function getAppointments() {
  $.ajax({
    url: "/appointment/getAppointments",
    method: "get",
    dataType: "json",
    contentType: "application/json",
    success: function(result) {
      console.log(result);
      if (result.success) {
        result.data.forEach(appointment => {
          displayAppointment(appointment);
        });
      } else {
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function displayAppointment(appointment) {
  let { id, start_time, booked_by, duration, date } = appointment;
  if (!booked_by) booked_by = "Not booked";
  const row = `
    <tr>
      <td>${date}</td>
      <td>${start_time}</td>
      <td>${duration} hours</td>
      <td>${booked_by}</td>
      <td>
        <button id="${id}" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#confirmModal">Delete</button>
      </td>
    <tr/>
  `;
  $("#tableBod").append(row);
}

function deleteAppointment() {
  $.ajax({
    url: `/appointment`,
    method: "delete",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
      appointmentId: $("#appointmentId").html()
    }),
    success: function(result) {
      console.log(result);
      if (result.success) {
        getAppointments();
      } else {
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function getSpecificAppointment(id) {
  $.ajax({
    url: `/appointment/${id}`,
    method: "get",
    dataType: "json",
    contentType: "application/json",
    success: function(result) {
      console.log("KOMMER HIT?", result);
      if (result.success) {
        populateDeleteModal(result.data[0]);
      } else {
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function populateDeleteModal(appointment) {
  console.log("POPULATION: ", appointment);
  const { date, start_time, end_time } = appointment;

  $("#startTimeDel").text(date + " " + start_time);
  $("#endTimeDel").text(date + " " + end_time);
}
