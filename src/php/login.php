
<?php
session_start();

include("database.php");

$username = $_POST['username'];
$password = $_POST['password'];


  // Requête pour récupérer le mot de passe haché et le token d'authentification
  $stmt = $pdo->prepare("SELECT password, auth_token FROM utilisateur WHERE username = :username");
  $stmt->bindParam(':username', $username);
  $stmt->execute();

  $row = $stmt->fetch(PDO::FETCH_ASSOC);
  if ($row && password_verify($password, $row['password'])) {
    $token = $row['auth_token'];

    // Vérifiez si le token est déjà défini
    if (empty($token)) {
      // Générez un jeton d'authentification unique
      $token = bin2hex(random_bytes(32));

      // Stockez le jeton dans la base de données
      $stmt = $pdo->prepare("UPDATE utilisateur SET auth_token = :token WHERE username = :username");
      $stmt->bindParam(':token', $token);
      $stmt->bindParam(':username', $username);
      $stmt->execute();
    }
    // Stockez le jeton dans un cookie sécurisé
    setcookie('auth_token', $token, time() + 3600, '/');

    echo "success";
  } else {
    echo "error";
  }
?>
