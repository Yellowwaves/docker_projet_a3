// js/script.js

$(document).ready(function () {

    // Vérification de l'authentification au chargement de la page
    $.ajax({
        url: "php/check_auth.php",
        type: "GET",
        success: function(response) {
            console.log(response);
            if (response.trim() !== "success") {
                // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
                window.location.href = "login.html";
            }
        },
        error: function(xhr, status, error) {
            console.error("Erreur de vérification d'authentification:", error);
            // Redirection en cas d'erreur (optionnel)
            window.location.href = "login.html";
        }
    });

    // Votre autre code JavaScript existant ici
    $.get('php/dynamic_select.php', function (data) {
        var villeData = JSON.parse(data.ville);
        $.each(villeData, function (idx, opt) {
            $('#ville').append('<option value="' + opt.id_code_insee + '">' + opt.ville_nom + '</option>');
        });
    }, 'json');

    $("#submit").on('click', function () {
        $.ajax({
            url: 'php/creation.php',
            type: "POST",
            data: $("#form").serialize(),
            success: function (result) {
                result = JSON.parse(result);
                location.href = result['redirect'];
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    });

    // Gestionnaire d'événement pour le bouton de déconnexion
    $("#logout").on('click', function () {
        $.ajax({
            url: 'php/logout.php',
            type: "POST",
            success: function (response) {
                window.location.href = "login.html"; // Redirection après déconnexion
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    });
});
