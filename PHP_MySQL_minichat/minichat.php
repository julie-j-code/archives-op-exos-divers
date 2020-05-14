<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Mini chat OpenClassrooms</title>
    <style type="text/css">
        body {
            font-family: "Verdana", "Arial", sans-serif;
            font-size: 100%;
        }

        form {
            text-align: center;
            margin: 20px auto;
        }

        input {
            background-color: silver;
            margin: 10px 0;
            padding: 5px;
            border-radius: 5px;
        }

        table {
            width: 500px;
            margin: 10px auto;
        }

        p {
            margin: 20px auto;
        }

        p,
        input,
        table {
            font-size: 0.8em;
        }
    </style>
</head>

<body>

    <form label="form_minichat" action="minichat_post_plus.php" method="post">
        <label for="pseudo">Pseudo</label> : <input type="text" name="pseudo" id="pseudo" value="<?php

                                                                                                    if (isset($_COOKIE['pseudo'])) {
                                                                                                        echo htmlspecialchars($_COOKIE['pseudo']);
                                                                                                    }

                                                                                                    ?>" required /><br>
        <label for="message">Message</label> : <input type="text" name="message" id="message" size="45" maxlength="255" autofocus required />
        <br />
        <input type="submit" value="Envoyer" />
    </form>

    <?php

    use PDO;
    // Connexion à la base de données
    try {
        $bdd = new PDO('mysql:host=localhost;dbname=minichat;charset=utf8', 'root', '');
    } catch (Exception $e) {
        die('Erreur : ' . $e->getMessage());
    }

    //Pour le système de pagination de 5 en 5 messages et non de 10 en 10 (pour ne pas avoir à créer un nombre important de messages bidons dans ma table)...
    $messagesParPage = 5; //Puisque on affiche 5 messages par page au lieu des 10.
    $retour_total = $bdd->query('SELECT COUNT(*) AS total FROM minichat'); //Nous récupérons le contenu de la requête dans $retour_total
    $donnees_total = $retour_total->fetch(); //On range retour sous la forme d'un tableau.
    $total = $donnees_total['total']; //On récupère le total pour le placer dans la variable $total.
    //Nous allons maintenant compter le nombre de pages.
    $nombreDePages = ceil($total / $messagesParPage);
    if (isset($_GET['page'])) // Si la variable $_GET['page'] existe...
    {
        $pageActuelle = intval($_GET['page']);
        if ($pageActuelle > $nombreDePages) // Si la valeur de $pageActuelle (le numéro de la page) est plus grande que $nombreDePages...
        {
            $pageActuelle = $nombreDePages;
        }
    } else // Sinon
    {
        $pageActuelle = 1; // La page actuelle est la n°1    
    }

    $premiereEntree = ($pageActuelle - 1) * $messagesParPage; // On calcul la première entrée à lire

    // La requête sql pour récupérer les messages de la page actuelle.
    $retour_messages = $bdd->query('SELECT pseudo, message, DATE_FORMAT(date_creation, \'%d/%m/%Y à %Hh%imin%ss\') AS date_creation_fr FROM minichat ORDER BY id DESC LIMIT ' . $premiereEntree . ', ' . $messagesParPage . '');
    while ($donnees_messages = $retour_messages->fetch()) // On lit les entrées une à une grâce à une boucle
    {
        //J'affiche les messages dans un tableau avec un nl2br pour prendre en compte les sauts à la ligne dans le message.
        echo '<table>
                <tr>
                     <td><strong>Ecrit par : ' . htmlspecialchars($donnees_messages['pseudo']) . '</strong> le <mark> ' . $donnees_messages['date_creation_fr'] . '</mark></td>
                </tr>
                <tr>
                     <td>' . nl2br(htmlspecialchars($donnees_messages['message'])) . '</td>
                </tr>
            </table>';
    }
    //Pour l'affichage des liens de page en bas de page
    echo '<p align="center">Page : ';
    for ($i = 1; $i <= $nombreDePages; $i++) //On fait notre boucle
    {     //On va faire notre condition
        if ($i == $pageActuelle) //Si il s'agit de la page actuelle...
        {
            echo ' [ ' . $i . ' ] ';
        } else //Sinon...
        {
            echo ' <a href="minichat.php?page=' . $i . '">' . $i . '</a> ';
        }
    }
    //Pour prévoir sommairement l'actualisation des messsages
    echo ' |  <a href="javascript:document.location.href=\'minichat.php\'">Actualiser l\'affichage des messages</a> </p>';

    $retour_messages->closeCursor();

    ?>
</body>

</html>