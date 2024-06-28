<?php
session_start();

// Génération d'un jeton CSRF
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32)); // Génération d'un jeton CSRF sécurisé
}

echo $_SESSION['csrf_token'];
?>