
<?php
include("constants.php");
//Author: Prenom NOM
//Login : etuXXX
//Groupe: ISEN X GROUPE Y
//Annee:
$mysqlDsn = "mysql:host=".$mysqlServerIp.";port=".$mysqlServerPort.";dbname=".$mysqlDbName.";charset=".$mysqlDbCharset.";"; 

//Connexion à la BDD
try { 
  $pdo = new PDO($mysqlDsn,$mysqlDbUser,$mysqlDbPwd, array(PDO::ATTR_PERSISTENT => true));
} catch (PDOException $e) {
  echo "Failed to get DB handle: " . $e->getMessage() . "\n";
  exit;
} 
?>
