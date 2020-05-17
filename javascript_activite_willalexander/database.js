import { Book } from './Book.js';

let romanPremier = new Book("titrePremier","authorPremier",120,"ceci est un livre qui parle du sujet de mon premier libre");
let romanSecond = new Book("titreSecond","authorSecond",300,"ceci est un livre qui parle du sujet de mon deuxieme livre");
let romanTroisieme = new Book("titreTroisieme","authorTroisième",230,"ceci est un livre qui parle du sujet de mon trosième livre");

let bookList=[romanPremier, romanSecond, romanTroisieme];

export { bookList };
