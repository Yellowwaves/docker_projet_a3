// Elouan Teissere - Lucas Le Bihan

$(document).ready(function() {

    $.get('php/dynamic_select.php', function (data) {//meme fonctionnement que carte.js, au lieu d'afficher une map on affiche un table
                                                    //voir en bas du code
        // Filtre 'ville
        var villeData = JSON.parse(data.ville); // Conversion de la chaîne JSON en un tableau d'objets
        $.each(villeData, function (idx, opt) {
          $('#ville').append('<option value="' + opt.ville_nom + '">' + opt.ville_nom + '</option>');
        });

        // Filtre 'athmo'
        var athmoData = JSON.parse(data.athmo); // Conversion de la chaîne JSON en un tableau d'objets
        $.each(athmoData, function (idx, opt) {
            $('#athmo').append('<option value="' + opt.id_athmo + '">' + opt.descr_athmo + '</option>');
        });
    
        // Filtre 'luminosite'
        var lumData = JSON.parse(data.lum); // Conversion de la chaîne JSON en un tableau d'objets
        $.each(lumData, function (idx, opt) {
            $('#luminosite').append('<option value="' + opt.id_lum + '">' + opt.descr_lum + '</option>');
        });
    
        // Filtre 'etat_surf'
        var etatData = JSON.parse(data.etat_route); // Conversion de la chaîne JSON en un tableau d'objets
        $.each(etatData, function (idx, opt) {
            $('#etat_surf').append('<option value="' + opt.id_etat_surf + '">' + opt.descr_etat_surf + '</option>');
        });
    
        // Filtre 'securite'
        var securiteData = JSON.parse(data.ceinture); // Conversion de la chaîne JSON en un tableau d'objets
        $.each(securiteData, function (idx, opt) {
            $('#securite').append('<option value="' + opt.id_dispo_secu + '">' + opt.descr_dispo_secu + '</option>');
        });
    
        // Filtre 'cat_veh'
        var catVehData = JSON.parse(data.vehicule); // Conversion de la chaîne JSON en un tableau d'objets
        $.each(catVehData, function (idx, opt) {
            $('#cat_veh').append('<option value="' + opt.id_cat_veh + '">' + opt.descr_cat_veh + '</option>');
        });
    
        // Filtre 'collision'
        var collisionData = JSON.parse(data.collision); // Conversion de la chaîne JSON en un tableau d'objets
        $.each(collisionData, function (idx, opt) {
            $('#collision').append('<option value="' + opt.id_type_col + '">' + opt.descr_type_col + '</option>');
        });
    }, 'json');


    $('#age').val($.cookie('age'));
    $('#gravite').val($.cookie('gravite'));
    $('#ville').val($.cookie('ville'));
    $('#date').val($.cookie('date'));
    $('#athmo').val($.cookie('athmo'));
    $('#luminosite').val($.cookie('lum'));
    $('#etat_surf').val($.cookie('etat_surf'));
    $('#securite').val($.cookie('securite'));
    $('#cat_veh').val($.cookie('cat_veh'));
    $('#collision').val($.cookie('collision'));
    $('#limit').val($.cookie('limit'));
    $('#bdd').val($.cookie('bdd'));
  
    // Fonction pour filtrer les accidents
    // Récupération du jeton CSRF
    var csrfToken = "";

    // Requête AJAX pour récupérer le jeton CSRF
    function filtrerAccidents() {
      var age = $('#age').val();
      var gravite = $('#gravite').val();
      var ville = $('#ville').val();
      var date = $('#date').val();
      var athmo = $('#athmo').val();
      var lum = $('#luminosite').val();
      var etat_surf = $('#etat_surf').val();
      var securite = $('#securite').val();
      var cat_veh = $('#cat_veh').val();
      var collision = $('#collision').val();
      var limit = $('#limit').val();
      var bdd = $('#bdd').val();
  
      // Enregistrer les valeurs des options dans les cookies
      $.cookie('age', age);
      $.cookie('gravite', gravite);
      $.cookie('ville', ville);
      $.cookie('date', date);
      $.cookie('athmo', athmo);
      $.cookie('lum', lum);
      $.cookie('etat_surf', etat_surf);
      $.cookie('securite', securite);
      $.cookie('cat_veh', cat_veh);
      $.cookie('collision', collision);
      $.cookie('limit', limit);
      $.cookie('bdd', bdd);

      
        $.ajax({
            url: 'php/filtre.php',
            method: 'POST',
            data: { age: age, gravite: gravite, ville: ville, date: date, athmo: athmo, lum: lum, etat_surf: etat_surf, securite: securite, cat_veh: cat_veh, collision: collision, limit: limit, bdd: bdd},
            dataType: 'json',
            headers: {
                'X-CSRF-Token': csrfToken // Utilisation du jeton CSRF dans les en-têtes de requête
            },
            success: function (data) {
                var tbody = $('#liste_accident tbody'); //on va remplir le tbody avec des accidents
                tbody.empty(); // Effacer le contenu précédent de la table

                $.each(data, function(index, item) { //pour chaque ligne envoyee on rajoute des lignes avec les infos des accidents
                    var row = '<tr>' +
                        '<td>' + item.acc_id + '</td>' + //affichage des differentes lignes
                        '<td>' + item.date + '</td>' +
                        '<td>' + item.latitude + '</td>' +
                        '<td>' + item.longitude + '</td>' +
                        '<td>' + item.age + '</td>' +
                        '<td>' + item.descr_athmo + '</td>' +
                        '<td>' + item.descr_lum + '</td>' +
                        '<td>' + item.descr_etat_surf + '</td>' +
                        '<td>' + item.descr_dispo_secu + '</td>' +
                        '<td>' + item.id_grav + '</td>' +
                        '<td>' + item.descr_cat_veh + '</td>' +
                        '<td>' + item.ville_nom + '</td>' +
                        '<td>' + item.descr_type_col + '</td>' +
                        '<td><input type="radio" name="radio_predict" value="' + item.acc_id + '"></td>' + //creation du bouton radio pour predire
                        '</tr>';
                    tbody.append(row); //envoi des lignes
                });
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    }

    
    $('#filterBtn').click(function() {
        $.ajax({
            url: "php/csrf_token.php", // Assurez-vous d'ajuster le chemin vers votre fichier CSRF PHP
            type: "GET",
            success: function(response) {
                csrfToken = response;
                $("#csrf_token").val(csrfToken); // Mettre à jour la valeur du champ CSRF dans le formulaire
                // Une fois le jeton CSRF récupéré, appeler la fonction pour filtrer les accidents
                filtrerAccidents();
            },
            error: function(xhr, status, error) {
                console.error("Erreur lors de la récupération du jeton CSRF:", error);
                // Gestion de l'erreur (redirection ou autre)
            }
          });
    });
    $('#cluster').click(function() {
        window.location.href = "cluster.html";  
    });
    $('#predict').click(function() {
        // Récupérer la valeur sélectionnée
        var bdd = $('#bdd').val();
        if (bdd === '') {
        bdd = 'accident';
        } //on rentre dans le lien de la page la bdd selectionnee et la valeur du bouton radio pour ensuite trouver notre prediction
        var selectedPred = $('input[name="radio_predict"]:checked').val();
        window.location.href = "prediction.html?acc_id=" + selectedPred + "&bdd=" + bdd;
      });
      $.ajax({
        url: "php/csrf_token.php", // Assurez-vous d'ajuster le chemin vers votre fichier CSRF PHP
        type: "GET",
        success: function(response) {
            csrfToken = response;
            $("#csrf_token").val(csrfToken); // Mettre à jour la valeur du champ CSRF dans le formulaire
            // Une fois le jeton CSRF récupéré, appeler la fonction pour filtrer les accidents
            filtrerAccidents();
        },
        error: function(xhr, status, error) {
            console.error("Erreur lors de la récupération du jeton CSRF:", error);
            // Gestion de l'erreur (redirection ou autre)
        }
      });
});
