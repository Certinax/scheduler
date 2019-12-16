$(document).ready(() => {
  $("#createToggler").on("click", () => {
    $("#signin").toggle();
  });

  $("#modalSignIn").keyup(e => {
    if (e.keyCode === 13) {
      if ($("#signin").is(":visible")) {
        console.log("Signin...");
        signin();
      } else if ($("#signin").is(":hidden")) {
        console.log("Create user...");
        create();
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
      console.log(result);
      if (result.success) {
        $("#modalSignIn").modal("toggle");
        window.location.reload();
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
      console.log(result);
      if (result.success) {
        $("#modalSignIn").modal("toggle");
        window.location.reload();
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
      console.log(result);
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

  // alert("Copied the text: " + copyText.value);
}
