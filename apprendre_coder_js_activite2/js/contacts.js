/*
Activité : gestion des contacts
*/

// Message de bienvenue à l'ouverture
console.log("Bienvenue dans ce gestionnaire de contacts !");

//Pour faciliter la création d'objets partageant mêmes données et comportement je crée une classe Contact pour les modéliser..
class Contact {
    constructor(nom, prenom) {
        //la forme this.nomVariable = valeur permet d'initialiser les propriétés de l'objet
        this.nom = nom;
        this.prenom = prenom;

        //pour ajouter tout nouveau contact directement dans un tableau interne à l'objet	
        if (typeof Contact.list == "undefined") {
            Contact.list = [];
        }
        Contact.list.push(this);
    }

}
//création des 2 premiers contacts
const caroleLeviss = new Contact("Léviss", "Carole");
const melodieNelsson = new Contact("Nelsson", "Mélodie");

// Création du tableau contenant les options au choix pour l'utilisateur
var tableOptions = ["1 Afficher les contacts", "2 Ajouter un contact", "0 Quitter le programme"];

//afficher la fenêtre des options utilisateur et les gérer tant que l'option Quitter n'a pas été chosie	
do {

    // parcourir le tableau des options avec autant d'itérations qu'il y a d'items
    for (var i = 0; i < tableOptions.length; i++) {
        console.log(tableOptions[i]);
    };

    //exploitation des options choisies par l'utilisateur 
    var optionUtilisateur = Number(prompt("Choisissez parmis les options 1, 2 ou 0"));

    switch (optionUtilisateur) {
        case 1:
            console.log("Voici les contacts actuels :");
            Contact.list.map(Contact => console.log(Contact.nom, Contact.prenom));
            break;
        case 2:
            const nom = prompt("Saisissez le NOM du nouveau contact");
            const prenom = prompt("Saisissez le PRENOM du nouveau contact");
            new Contact(nom, prenom);
            console.log("Votre nouveau contact a bien été créé !");
            break;
        case 0:
            console.log("Merci et à bientôt !");
    }

} while (optionUtilisateur !== 0);