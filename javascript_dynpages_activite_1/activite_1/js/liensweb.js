/* 
Activité 1
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

// TODO : compléter ce fichier pour ajouter les liens à la page web



listeLiens.forEach(function (lien) {
	
var newElt = document.createElement("div");
var aElt = document.createElement("a");
var urlElt = document.createElement("span");
var autorElt = document.createElement("span");
var pElt = document.createElement("p");

	//Définition des éléments
	newElt.setAttribute("class", "lien");

	aElt.href = lien.url;
	aElt.textContent = lien.titre;
	aElt.style.color = "#428bca";
	aElt.style.textDecoration = "none";
	aElt.style.fontWeight = "bold";
	urlElt.textContent = " " + lien.url;
	pElt.classList.add("paragraphe");
	pElt.style = "margin: 0px";

	autorElt.textContent = "Ajouté par " + lien.auteur;
	
	//Insertion des éléments
	document.getElementById("contenu").appendChild(newElt);
	newElt.appendChild(aElt);
	newElt.appendChild(urlElt);
	newElt.appendChild(pElt);
	pElt.appendChild(autorElt);

})

