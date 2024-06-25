// Elouan Teissere - Lucas Le Bihan

$(document).ready(function() {
    // Extraire les paramètres de l'URL
    var params = new URLSearchParams(window.location.search); // on cherche dans les parametres les valeurs envoyees

    // Récupérer la valeur de l'attribut spécifié
    var acc_id = params.get('acc_id'); //on recupere les deux valeurs
    var bdd = params.get('bdd')
    $('#loadingIndicator').show();

    // Faire la requête AJAX avec l'ID si nécessaire
    $.ajax({
        url: 'php/prediction_hl.php', //on appelle les 4 methodes qui sont dans le php et on les recupere
        method: 'POST',
        data: { acc_id: acc_id, bdd: bdd},
        dataType: 'json',
        success: function(data) {

            // Accéder aux résultats du KNN
            // Accéder aux résultats du KNN
            var knnResult = data.knn;
            var knnClasseAccident = knnResult.classe_accident;

            // Remplacer la valeur si nécessaire
            if (knnClasseAccident === '1') {
            knnClasseAccident = "Pas grave";
            } else if (knnClasseAccident === '2') {
            knnClasseAccident = "Grave";
            }



            // Accéder aux résultats de RF
            var rfResult = data.rf;
            var rfGravite = rfResult.gravite;

            // Remplacer la valeur si nécessaire
            if (rfGravite === 1) {
            rfGravite = "Pas grave";
            } else if (rfGravite === 2) {
            rfGravite = "Grave";
            }

            // Accéder aux résultats de SVM
            var svmResult = data.svm;
            var svmGravite = svmResult.gravite;

            // Remplacer la valeur si nécessaire
            if (svmGravite === 1) {
            svmGravite = "Pas grave";
            } else if (svmGravite === 2) {
            svmGravite = "Grave";
            }

            // Accéder aux résultats de MLP
            var mlpResult = data.mlp;
            var mlpGravite = mlpResult.gravite;

            // Remplacer la valeur si nécessaire
            if (mlpGravite === 1) {
            mlpGravite = "Pas grave";
            } else if (mlpGravite === 2) {
            mlpGravite = "Grave";
            }

            // Ajouter les résultats au tableau
            var accidentsTable = $("#accidentsTable");
            $('#loadingIndicator').hide();
            var newRow = "<tr>"; //affichage du tablean
            newRow += "<td>" + acc_id + "</td>";
            newRow += "<td>" + knnClasseAccident + "</td>";
            newRow += "<td>" + rfGravite + "</td>";
            newRow += "<td>" + svmGravite + "</td>";
            newRow += "<td>" + mlpGravite + "</td>";
            newRow += "</tr>";

            accidentsTable.append(newRow); //envoi du tableau au html
        },
        error: function(xhr, resp, text,data) {
            console.log(xhr, resp, text);
        }
    });
});

