<?php

setcookie('pseudo', $_POST['pseudo'], time() + 365 * 24 * 3600, null, null, false, true);


if ($_POST['message'] != '')
//{try {$bdd = new PDO('mysql:host=rdbms.strato.de;dbname=DB3848654', 'U3848654', 'xTuxGfRNgB5kWBQ', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));}
{
     try {
          $bdd = new PDO('mysql:host=rdbms.strato.de;dbname=minichat', 'U3848654', 'xTuxGfRNgB5kWBQ', array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
     } catch (Exception $e) {
          die('Erreur : ' . $e->getMessage());
     }

     if (isset($_POST['pseudo']) and isset($_POST['message'])) {
          $req = $bdd->prepare('INSERT INTO minichat (pseudo, message, date_creation) VALUES (?, ? , NOW())');
          $req->execute(array($_POST['pseudo'], $_POST['message']));
     }
}

// Redirection du visiteur vers la page du minichat
// initialement minichat.php mais modifié pour la mise en ligne
header('Location: index.php');
