$(document).ready(() => {
  $("#createToggler").on("click", () => {
    $("#signin").toggle();
  });

  $("#modalSignIn").keyup(e => {
    if (e.keyCode === 13) {
      if ($("#signin").is(":visible")) {
        console.log("Signin...");
      } else if ($("#signin").is(":hidden")) {
        console.log("Create user...");
      }
    }
  });
});
