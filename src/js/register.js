// Elouan Teissere - Lucas Le Bihan

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