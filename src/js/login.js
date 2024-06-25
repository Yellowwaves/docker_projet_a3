// Elouan Teissere - Lucas Le Bihan

$(document).ready(function() {
    $("#loginForm").submit(function(e) {
      e.preventDefault();
      var username = $("#username").val(); //recuperation des donnees
      var password = $("#password").val();

      // Envoi de la requête AJAX
      $.ajax({
        url: "php/login.php", //envoi des connees
        type: "POST",
        data: { username: username, password: password },
        success: function(response) {
          if (response.trim() === "success") {
            window.location.href = "creation.html"; //redirection
          } else {
            alert("Identifiants invalides");
          }
        }
      });
    });
  });