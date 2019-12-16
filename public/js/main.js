$(document).ready(() => {
  $("#createToggler").on("click", () => {
    $("#signin").toggle();
    $("#signinFeedback").empty();
  });

  $("#signin").on("click", () => {
    if (loginValidation()) {
      signin();
    } else {
      $("#signinFeedback").empty();
      $("#signinFeedback").html("All fields required");
    }
  });

  $("#create").on("click", () => {
    if (createValidation()) {
      create();
    } else {
      $("#signinFeedback").empty();
      $("#signinFeedback").html("All fields required");
    }
  });

  $("#modalSignIn").keyup(e => {
    if (e.keyCode === 13) {
      if ($("#signin").is(":visible")) {
        if (loginValidation()) {
          signin();
        } else {
          $("#signinFeedback").empty();
          $("#signinFeedback").html("All fields required");
        }
      } else if ($("#signin").is(":hidden")) {
        if (createValidation()) {
          create();
        } else {
          $("#signinFeedback").empty();
          $("#signinFeedback").html("All fields required");
        }
      }
    }
  });

  $("#logout").on("click", () => {
    logout();
  });

  $("#copyKey").on("click", () => {
    copyURL();
  });
});

function enter() {}

function signin() {
  $.ajax({
    url: "/auth/login",
    method: "post",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
      email: $("#username").val(),
      password: $("#password").val()
    }),
    success: function(result) {
      if (result.success) {
        $("#modalSignIn").modal("toggle");
        window.location.reload();
      } else {
        $("#signinFeedback").html(result.message);
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function create() {
  $.ajax({
    url: "/auth/create",
    method: "post",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({
      email: $("#username").val(),
      password: $("#password").val(),
      firstname: $("#firstname").val(),
      lastname: $("#lastname").val()
    }),
    success: function(result) {
      if (result.success) {
        $("#modalSignIn").modal("toggle");
        window.location.reload();
      } else {
        $("#signinFeedback").html(result.message);
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function logout() {
  $.ajax({
    url: "/auth/logout",
    method: "get",
    dataType: "json",
    contentType: "application/json",
    success: function(result) {
      if (result.success) {
        window.location.reload();
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function copyURL() {
  var copyText = document.getElementById("inviteURL");

  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  document.execCommand("copy");
}

function createValidation() {
  const inputs = $("#modalSignIn").find("input");
  let valid = true;
  inputs.map(input => {
    if ($(inputs[input]).val() === "") {
      valid = false;
      return valid;
    }
  });
  return valid;
}

function loginValidation() {
  let valid = true;
  if ($("#username").val() === "") {
    valid = false;
    return valid;
  }
  if ($("#password").val() === "") {
    valid = false;
    return valid;
  }
  return valid;
}
