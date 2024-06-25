
<?php

    $age_cond = $_POST['age_cond']; //on recupere avec un port toutes les valeurs envoyees par le ajax
    $date = $_POST['date'];
    $date = isset($_POST['date']) ? $_POST['date'] : null;
    $formattedDate = null;
    $formattedDate = date('Y-m-d H:i:s', strtotime($date));
    $ville = $_POST['ville'];
    $lat = $_POST['lat'];
    $lon = $_POST['lon'];
    $cond_ath = $_POST['cond_ath'];
    $cond_lum = $_POST['cond_lum'];
    $etat_surf = $_POST['etat_surf'];
    $dispo_secu = $_POST['dispo_secu'];
    $id_cat_veh = $_POST['id_cat_veh'];
    $id_type_col = $_POST['id_type_col'];

    include("database.php"); //on fais notre requete pour envoyer toutes les valeurs a la base
    $nouvel_accident = $pdo->prepare("INSERT INTO accident_new (acc_id, date, latitude, longitude, age, id_athmo, id_lum, id_etat_surf, id_dispo_secu,id_grav, id_cat_veh, id_code_insee, id_type_col) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?,NULL, ?, ?, ?)");
    $nouvel_accident->execute(array($formattedDate, $lat, $lon, $age_cond, $cond_ath, $cond_lum, $etat_surf, $dispo_secu, $id_cat_veh, $ville, $id_type_col));
    $resp['redirect'] = "liste.html"; //on redirige vers la liste
    echo json_encode($resp);
?>