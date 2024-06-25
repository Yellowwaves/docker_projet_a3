<?php
include("database.php");

if (isset($_COOKIE['auth_token'])) {
  $token = $_COOKIE['auth_token'];

  try {
    // Requête pour vérifier si le token est valide
    $stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE auth_token = :token");
    $stmt->bindParam(':token', $token);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
      echo "success";
    } else {
      echo "redirected";
    }
  } catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
  }
}