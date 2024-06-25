
<?php
include("database.php");
//Ici, on va faire tout le temps la meme chose, on recupere tous les infos pour les rentrer dans les select

// Récupération des informations pour le filtre 'ville'
$queryVille = $pdo->prepare("SELECT * FROM ville LIMIT 100");
$queryVille->execute();
$resultatsVille = $queryVille->fetchAll(PDO::FETCH_ASSOC);
$jsonVille = json_encode($resultatsVille);

// Récupération des informations pour le filtre 'athmo'
$queryAthmo = $pdo->prepare("SELECT * FROM athmo");
$queryAthmo->execute();
$resultatsAthmo = $queryAthmo->fetchAll(PDO::FETCH_ASSOC);
$jsonAthmo = json_encode($resultatsAthmo);

// Récupération des informations pour le filtre 'luminosite'
$queryLuminosite = $pdo->prepare("SELECT * FROM lum");
$queryLuminosite->execute();
$resultatsLuminosite = $queryLuminosite->fetchAll(PDO::FETCH_ASSOC);
$jsonLuminosite = json_encode($resultatsLuminosite);

// Récupération des informations pour le filtre 'etat_surf'
$queryEtatSurf = $pdo->prepare("SELECT * FROM etat_route");
$queryEtatSurf->execute();
$resultatsEtatSurf = $queryEtatSurf->fetchAll(PDO::FETCH_ASSOC);
$jsonEtatSurf = json_encode($resultatsEtatSurf);

// Récupération des informations pour le filtre 'securite'
$querySecurite = $pdo->prepare("SELECT * FROM ceinture");
$querySecurite->execute();
$resultatsSecurite = $querySecurite->fetchAll(PDO::FETCH_ASSOC);
$jsonSecurite = json_encode($resultatsSecurite);

// Récupération des informations pour le filtre 'cat_veh'
$queryCatVeh = $pdo->prepare("SELECT * FROM vehicule");
$queryCatVeh->execute();
$resultatsCatVeh = $queryCatVeh->fetchAll(PDO::FETCH_ASSOC);
$jsonCatVeh = json_encode($resultatsCatVeh);

// Récupération des informations pour le filtre 'collision'
$queryCollision = $pdo->prepare("SELECT * FROM collision");
$queryCollision->execute();
$resultatsCollision = $queryCollision->fetchAll(PDO::FETCH_ASSOC);
$jsonCollision = json_encode($resultatsCollision);

// Regroupement des résultats dans un tableau
$data = [
    'ville' => $jsonVille,
    'athmo' => $jsonAthmo,
    'lum' => $jsonLuminosite,
    'etat_route' => $jsonEtatSurf,
    'ceinture' => $jsonSecurite,
    'vehicule' => $jsonCatVeh,
    'collision' => $jsonCollision
];

// Conversion du tableau en JSON
$jsonData = json_encode($data);

// Envoi de la réponse JSON

echo $jsonData;
?>
