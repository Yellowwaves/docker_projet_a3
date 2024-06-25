
<?php
include("database.php");

// Récupération des valeurs des cookies
$age = isset($_COOKIE['age']) ? $_COOKIE['age'] : null;
$gravite = isset($_COOKIE['gravite']) ? $_COOKIE['gravite'] : null;
$ville = isset($_COOKIE['ville']) ? $_COOKIE['ville'] : null;
$date = isset($_COOKIE['date']) ? $_COOKIE['date'] : null;
$athmo = isset($_COOKIE['athmo']) ? $_COOKIE['athmo'] : null;
$lum = isset($_COOKIE['lum']) ? $_COOKIE['lum'] : null;
$etat_surf = isset($_COOKIE['etat_surf']) ? $_COOKIE['etat_surf'] : null;
$securite = isset($_COOKIE['securite']) ? $_COOKIE['securite'] : null;
$cat_veh = isset($_COOKIE['cat_veh']) ? $_COOKIE['cat_veh'] : null;
$collision = isset($_COOKIE['collision']) ? $_COOKIE['collision'] : null;
$limit = isset($_COOKIE['limit']) ? $_COOKIE['limit'] : null;
$bdd = isset($_COOKIE['bdd']) ? $_COOKIE['bdd'] : null;

// Détermination de la table à utiliser en fonction de la valeur du cookie 'bdd'
$tableName = isset($_COOKIE['bdd']) && $_COOKIE['bdd'] === 'accident_new' ? 'accident_new' : 'accident';

// Limite le nombre d'accidents à 100 pour ne pas surcharger les ressources
if($limit > 100) {
    $limit = 100;
}

// Découpage de la valeur 'age' en début et fin de plage d'âge
if ($age) {
    list($age_start, $age_end) = explode('-', $age);
} else {
    $age_start = null;
    $age_end = null;
}

$formattedDate = null;

if ($date) {
    // Convertir la date au format DATETIME
    $formattedDate = date('Y-m-d', strtotime($date));
}

// Construction de la requête de base
$query = "SELECT $tableName.*, etat_route.descr_etat_surf, athmo.descr_athmo, lum.descr_lum, ceinture.descr_dispo_secu, collision.descr_type_col, vehicule.descr_cat_veh, ville.ville_nom
FROM $tableName
JOIN etat_route ON $tableName.id_etat_surf = etat_route.id_etat_surf
JOIN athmo ON $tableName.id_athmo = athmo.id_athmo
JOIN lum ON $tableName.id_lum = lum.id_lum
JOIN ceinture ON $tableName.id_dispo_secu = ceinture.id_dispo_secu
JOIN collision ON $tableName.id_type_col = collision.id_type_col
JOIN vehicule ON $tableName.id_cat_veh = vehicule.id_cat_veh
JOIN ville ON $tableName.id_code_insee = ville.id_code_insee";

// Construction de la clause WHERE dynamiquement
//Pour chaque nouveau parametre le WHERE va s'adapter
$where = [];
$params = [];

if ($age) {
    $where[] = "$tableName.age BETWEEN :age_start AND :age_end";
    $params[':age_start'] = $age_start;
    $params[':age_end'] = $age_end;
}

if ($gravite) {
    $where[] = "$tableName.id_grav = :gravite";
    $params[':gravite'] = $gravite;
}

if ($ville) {
    $where[] = "ville.ville_nom = :ville";
    $params[':ville'] = $ville;
}

if ($formattedDate) {
    $where[] = "DATE($tableName.date) = :date";
    $params[':date'] = $formattedDate;
}

if ($athmo) {
    $where[] = "athmo.id_athmo = :athmo";
    $params[':athmo'] = $athmo;
}

if ($lum) {
    $where[] = "lum.id_lum = :lum";
    $params[':lum'] = $lum;
}

if ($etat_surf) {
    $where[] = "etat_route.id_etat_surf = :etat_surf";
    $params[':etat_surf'] = $etat_surf;
}

if ($securite) {
    $where[] = "ceinture.id_dispo_secu = :securite";
    $params[':securite'] = $securite;
}

if ($cat_veh) {
    $where[] = "vehicule.id_cat_veh = :cat_veh";
    $params[':cat_veh'] = $cat_veh;
}

if ($collision) {
    $where[] = "collision.id_type_col = :collision";
    $params[':collision'] = $collision;
}

// Vérification si la clause WHERE est nécessaire
if (!empty($where)) {
    $query .= " WHERE " . implode(" AND ", $where);
}

// Ajout de la limite
if ($limit) {
    $query .= " LIMIT " . $limit;
} else {
    $query .= " LIMIT 10";
}

// Préparation et exécution de la requête
$$tableName = $pdo->prepare($query);

foreach ($params as $param => $value) {
    $$tableName->bindValue($param, $value, PDO::PARAM_STR);
}

$$tableName->execute();
$results = $$tableName->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);

echo $json;
?>
