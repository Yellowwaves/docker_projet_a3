<?php
// Démarrez la session si ce n'est pas déjà fait
session_start();

// Détruisez toutes les variables de session
session_unset();

// Détruisez la session
session_destroy();

// Supprimez le cookie 'auth_token'
setcookie('auth_token', '', time() - 3600, '/'); // Mettez le temps d'expiration dans le passé pour supprimer le cookie

// Réponse JSON pour l'AJAX (facultatif)
echo json_encode(['success' => true]);
exit;
?>