const semi = document.getElementById("typeSemi");
const classique = document.getElementById("typeClassique");
const panier = document.querySelector("#lePanier p");
panier.textContent = "Aucune sélection pour le moment";
let total = 0; // variable pour le total du panier
let listeParticipants = []; // tableau pour stocker les participants

//Constantes supplémentaires pour pouvoir reset le formulaire après chaque inscription
const phone = document.getElementById("Phone");
const email = document.getElementById("Email");
const age = document.getElementById("Age");

// créer une constante pour récupérer le nom + prénom du formulaire
const nom = document.getElementById("Lastname");
const prenom = document.getElementById("Firstname");
const inscription = document.querySelector("#solo")
const formulaire = document.querySelector("form")
let participants = document.querySelector(".nomDesParticipants")
console.log(participants);

formulaire.addEventListener("submit", afficherParticipant);

function afficherParticipant(evt) {
evt.preventDefault(); // Empêche le rechargement de la page

  let billets = [];// tableau pour stocker les types de billets sélectionnés
  let sousTotal = 0;// variable pour le sous-total du participant

  if (semi.checked) {
    billets.push("Semi-marathon");
    sousTotal += 90;
  }

  if (classique.checked) {
    billets.push("Marathon classique");
    sousTotal += 130;
  }

  if (billets.length === 0) {
    alert("Veuillez sélectionner au moins un billet");
    return;
  }

  // Ajouter un participant
  listeParticipants.push({
    nom: nom.value,
    prenom: prenom.value,
    billets: billets,
    prix: sousTotal
  });

  total += sousTotal; // Mettre à jour le total

  // Mise à jour affichage
  afficherPanier();

  // Reset du formulaire
  nom.value = "";
  prenom.value = "";
  semi.checked = false;
  classique.checked = false;
  phone.value = "";
  email.value = "";
  age.value = "";
}

function afficherPanier() {
  let contenu = "";

  listeParticipants.forEach((p, index) => {
    contenu += `${index + 1}. ${p.prenom} ${p.nom} – ${p.billets.join(" + ")} = ${p.prix} €<br>`;// Affichage des participants avec leurs billets et prix
  });

  panier.innerHTML = `${contenu}<strong>Total : ${total} €</strong>`;// Affichage du total du panier
}
