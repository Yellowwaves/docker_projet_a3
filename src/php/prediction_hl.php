
<?php
include("database.php");

// Récupération des paramètres POST
$acc_id = isset($_POST['acc_id']) ? $_POST['acc_id'] : null;
$tableName = $_POST['bdd'];
if ($tableName=='null') {
    $tableName='accident';
}

// Récupération des informations de l'accident depuis la base de données
$accident = $pdo->prepare("SELECT * FROM $tableName WHERE acc_id = :acc_id");
$accident->bindParam(':acc_id', $acc_id, PDO::PARAM_INT);
$accident->execute();
$results = $accident->fetch(PDO::FETCH_ASSOC);

$lum = $results['id_lum'];
$type_col = $results['id_type_col'];
$cat_veh = $results['id_cat_veh'];
$latitude = $results['latitude'];
$longitude = $results['longitude'];
$athmo = $results['id_athmo'];
$etat_surf = $results['id_etat_surf'];
$securite = $results['id_dispo_secu'];
$age = $results['age'];


// Construction de la commande pour exécuter le script Python
$command_knn = "/var/www/html/cgi/script_knn.py \"descr_lum=$lum&descr_cat_veh=$cat_veh&latitude=$latitude&longitude=$longitude&descr_athmo=$athmo&descr_etat_surf=$etat_surf&descr_dispo_secu=$securite&age=$age\"";
$command_rf = "/var/www/html/cgi/script_highlevel.py \"descr_lum=$lum&descr_type_col=$type_col&descr_cat_veh=$cat_veh&latitude=$latitude&longitude=$longitude&descr_athmo=$athmo&descr_etat_surf=$etat_surf&descr_dispo_secu=$securite&age=$age&methode=rf\"";
$command_svm = "/var/www/html/cgi/script_highlevel.py \"descr_lum=$lum&descr_type_col=$type_col&descr_cat_veh=$cat_veh&latitude=$latitude&longitude=$longitude&descr_athmo=$athmo&descr_etat_surf=$etat_surf&descr_dispo_secu=$securite&age=$age&methode=svm\"";
$command_mlp = "/var/www/html/cgi/script_highlevel.py \"descr_lum=$lum&descr_type_col=$type_col&descr_cat_veh=$cat_veh&latitude=$latitude&longitude=$longitude&descr_athmo=$athmo&descr_etat_surf=$etat_surf&descr_dispo_secu=$securite&age=$age&methode=mlp\"";

// // Exécution des commandes et récupération des sorties
$output_knn = shell_exec($command_knn);
$output_rf = shell_exec($command_rf);
$output_svm = shell_exec($command_svm);
$output_mlp = shell_exec($command_mlp);

// // Extraction des valeurs JSON des résultats
$result_knn = json_decode(trim(substr($output_knn, strpos($output_knn, '{'))), true);
$result_rf = json_decode(trim(substr($output_rf, strpos($output_rf, '{'))), true);
$result_svm = json_decode(trim(substr($output_svm, strpos($output_svm, '{'))), true);
$result_mlp = json_decode(trim(substr($output_mlp, strpos($output_mlp, '{'))), true);

// Construction du tableau des résultats
$results = array(
    "knn" => $result_knn,
    "rf" => $result_rf,
    "svm" => $result_svm,
    "mlp" => $result_mlp
);

// Envoi de la réponse en tant que JSON
header('Content-Type: application/json');
echo json_encode($results);
?>
