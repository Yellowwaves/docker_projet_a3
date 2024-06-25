
<?php
// Effectuez les validations et la vérification des données d'inscription ici
include("database.php");
$username = $_POST['username'];
$password = $_POST['password'];


  // Vérifier si l'utilisateur existe déjà
  $stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE username = :username");
  $stmt->bindParam(':username', $username);
  $stmt->execute();

  if ($stmt->rowCount() > 0) {
    echo "error";
  } else {
    // Insérer l'utilisateur dans la base de données
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO utilisateur (username, password) VALUES (:username, :password)");
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->execute();

    echo "success";
  }

?>
