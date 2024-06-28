// Elouan Teissere - Lucas Le Bihan
let password = document.getElementById("password");
  let power = document.getElementById("power-point");
  password.oninput = function () {
    let point = 0;
    let value = password.value;
    let widthPower = ["1%", "25%", "50%", "75%", "100%"];
    let colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];

    if (value.length >= 6) {
      let arrayTest = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/];
      arrayTest.forEach((item) => {
        if (item.test(value)) {
          point += 1;
        }
      });
    }
    power.style.width = widthPower[point];
    power.style.backgroundColor = colorPower[point];
  };
$(document).ready(function() {
  
  $("#registerForm").submit(function(e) {
    e.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();

    // Envoi de la requête AJAX
    $.ajax({
      url: "php/register.php",
      type: "POST",
      data: { username: username, password: password },
      success: function(response) {
        // console.log(response.trim());
        if (response.trim() === "success") {
          alert("Inscription réussie!");
          window.location.href = "login.html";
        } else {
          alert("Erreur lors de l'inscription");
        }
      }
    });
  });
});