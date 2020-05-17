// ------- Fonctions génériques AJAX ---------------------------------------------------

// Exécute un appel AJAX GET conformément à l'exemple donné au chapitre 9
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);

    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });

    req.addEventListener("error", function() {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}
// Exécute un appel AJAX POST conformément à l'exemple donné au chapitre 10
// Prend en paramètres l'URL cible, la donnée à envoyer et la fonction callback appelée en cas de succès
function ajaxPost(url, data, callback, isJson) {
    var b = true;
    var req = new XMLHttpRequest();
    req.open("POST", url);

    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });

    req.addEventListener("error", function() {
        console.error("Erreur réseau avec l'URL " + url);
    });

    if (isJson) {
        // Définit le contenu de la requête comme étant du JSON
        req.setRequestHeader("Content-Type", "application/json");

        // Transforme la donnée du format JSON vers le format texte avant l'envoi
        data = JSON.stringify(data);
    }
    req.send(data);	
}


/* 
Activité 2 initiale 
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
    {
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }
];

// Crée et renvoie un élément DOM affichant les données d'un lien
// Le paramètre lien est un objet JS représentant un lien
function creerElementLien(lien) {
    var titreElt = document.createElement("a");
    titreElt.href = lien.url;
    titreElt.style.color = "#428bca";
    titreElt.style.textDecoration = "none";
    titreElt.style.marginRight = "5px";
    titreElt.appendChild(document.createTextNode(lien.titre));

    var urlElt = document.createElement("span");
    urlElt.appendChild(document.createTextNode(lien.url));

    // Cette ligne contient le titre et l'URL du lien
    var ligneTitreElt = document.createElement("h4");
    ligneTitreElt.style.margin = "0px";
    ligneTitreElt.appendChild(titreElt);
    ligneTitreElt.appendChild(urlElt);

    // Cette ligne contient l'auteur
    var ligneDetailsElt = document.createElement("span");
    ligneDetailsElt.appendChild(document.createTextNode("Ajouté par " + lien.auteur));

    var divLienElt = document.createElement("div");
    divLienElt.classList.add("lien");
    divLienElt.appendChild(ligneTitreElt);
    divLienElt.appendChild(ligneDetailsElt);

    return divLienElt;
}

// NOUVEAU requête AJAX pour récupérer les données fournies par l'API------
var contenuApiElt = document.getElementById("contenu");
ajaxGet('https://oc-jswebsrv.herokuapp.com/api/liens', (reponse) => {
    // Transforme l'objet json récupéré en tableau javascript
    var liensTab = JSON.parse(reponse);

    // Parcours de la liste des liens et ajout d'un élément au DOM pour chaque lien
    liensTab.forEach((lien) => {
        var lienElt = creerElementLien(lien);
        contenuApiElt.appendChild(lienElt);
    });

});

// Pour l'AFFICHAGE CONTENU INITIAL
var contenuElt = document.getElementById("contenu");
// Parcours de la liste des liens et ajout d'un élément au DOM pour chaque lien
listeLiens.forEach(function (lien) {
    var lienElt = creerElementLien(lien);
    contenuElt.appendChild(lienElt);
});

// Crée et renvoie un élément DOM de type input
function creerElementInput(placeholder, taille) {
    var inputElt = document.createElement("input");
    inputElt.type = "text";
    inputElt.setAttribute("placeholder", placeholder);
    inputElt.setAttribute("size", taille);
    inputElt.setAttribute("required", "true");
    return inputElt;
}

// Gère l'ajout d'un nouveau lien

var ajouterLienElt = document.getElementById("ajoutLien");
ajouterLienElt.addEventListener("click", function() {
    var auteurElt = creerElementInput("Entrez votre nom", 20);
    var titreElt = creerElementInput("Entrez le titre du lien", 40);
    var urlElt = creerElementInput("Entrez l'URL du lien", 40);

    var ajoutElt = document.createElement("input");
    ajoutElt.type = "submit";
    ajoutElt.value = "Ajouter";

    var formAjoutElt = document.createElement("form");
    formAjoutElt.appendChild(auteurElt);
    formAjoutElt.appendChild(titreElt);
    formAjoutElt.appendChild(urlElt);
    formAjoutElt.appendChild(ajoutElt);

    var p = document.querySelector("p");
    // Remplace le bouton d'ajout par le formulaire d'ajout
    p.replaceChild(formAjoutElt, ajouterLienElt);

    // Ajoute le nouveau lien
    formAjoutElt.addEventListener("submit", function(e) {
        e.preventDefault(); // Annule la publication du formulaire

        var url = urlElt.value;
        // Si l'URL ne commence ni par "http://" ni par "https://"
        if ((url.indexOf("http://") !== 0) && (url.indexOf("https://") !== 0)) {
            // On la préfixe par "http://"
            url = "http://" + url;
        }

        // Création de l'objet contenant les données du nouveau lien
        var lien = {
            titre: titreElt.value,
            url: url,
            auteur: auteurElt.value
        };

        // NOUVEAU Requete AJAX pour envoyer les données à l'API
        ajaxPost('https://oc-jswebsrv.herokuapp.com/api/lien', lien, (reponse) => {
            console.log('Le lien suivant ' + JSON.stringify(lien) + ' a bien été envoyé');

            // Crée l'affichage du nouveau lien
            var lienElt = creerElementLien(lien);
            // Ajoute le nouveau lien en haut de la liste
            contenuElt.insertBefore(lienElt, contenuElt.firstChild);

            // Création du message d'information
            var infoElt = document.createElement("div");
            infoElt.classList.add("info");
            infoElt.textContent = "Le lien \"" + lien.titre + "\" a bien été ajouté.";
            p.insertBefore(infoElt, ajouterLienElt);
            // Suppresion du message après 2 secondes
            setTimeout(function() {
                p.removeChild(infoElt);
            }, 2000);
        }, true);

        // Remplace le formulaire d'ajout par le bouton d'ajout
        p.replaceChild(ajouterLienElt, formAjoutElt);
    });
});