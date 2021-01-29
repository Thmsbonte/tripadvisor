const $ = document;

$.addEventListener("DOMContentLoaded", () => {
  console.log("Page chargée");
  $.querySelector("#login-button").addEventListener("click", () => {
    console.log("click!");
    $.querySelector(".modal").classList.remove("hidden");
  });

  $.querySelector("#close-login-form").addEventListener("click", () => {
    $.querySelector(".modal").classList.add("hidden");
  });
});
