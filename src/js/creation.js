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

    // Récupération du jeton CSRF
    var csrfToken = "";

    // Requête AJAX pour récupérer le jeton CSRF
    $.ajax({
        url: "php/csrf_token.php", // Assurez-vous d'ajuster le chemin vers votre fichier CSRF PHP
        type: "GET",
        success: function(response) {
            csrfToken = response;
            $("#csrf_token").val(csrfToken); // Mettre à jour la valeur du champ CSRF dans le formulaire
        },
        error: function(xhr, status, error) {
            console.error("Erreur lors de la récupération du jeton CSRF:", error);
            // Gestion de l'erreur (redirection ou autre)
        }
    });
    $("#submit").on('click', function () {
        // Récupérez le jeton CSRF depuis le formulaire
    
        $.ajax({
            url: 'php/creation.php',
            type: "POST",
            data: $("#form").serialize(), // Inclure le jeton CSRF
            headers: {
                'X-CSRF-Token': csrfToken // Utilisation du jeton CSRF dans les en-têtes de requête
            },
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
