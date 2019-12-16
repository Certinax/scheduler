$(document).ready(() => {
  console.log("Appointment");
  populateDateTime();
  $("#modalNew").on("shown", function() {
    populateDateTime();
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
