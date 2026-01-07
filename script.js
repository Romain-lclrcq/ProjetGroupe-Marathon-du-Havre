// Scroll to top on resize
const anchor = document.querySelector ("#header")
window.addEventListener("resize",() => { anchor.scrollIntoView()})

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


const dialog = document.querySelector("dialog")


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
    contenu += `<p>${index + 1}. ${p.prenom} ${p.nom} – ${p.billets.join(" + ")} = ${p.prix} €<br></p>`;// Affichage des participants avec leurs billets et prix
  });

  panier.innerHTML = `${contenu}<strong>Total : ${total} €</strong>`;// Affichage du total du panier
}

// Gestion des boutons Valider et Annuler
const validerBtn = document.getElementById("valider");
const annulerBtn = document.getElementById("annuler");

validerBtn.addEventListener("click", validerPanier);
annulerBtn.addEventListener("click", annulerPanier);

function validerPanier() {
  if (listeParticipants.length === 0) {                                                 // Vérifier si le panier est vide
    alert("Le panier est vide. Veuillez ajouter des participants avant de valider.");  // Si oui afficher une alerte
    return;                                                                            // Arrêter l'exécution de la fonction
  }
  alert(`Merci pour votre inscription ! Le montant total est de ${total} €.`);         // Sinon afficher message + le montant total dans le dialog
  listeParticipants = [];                                                             // Vider la liste des participants
  total = 0;                                                                        // Réinitialiser le total
  afficherPanier();                                                          // Mettre à jour l'affichage du panier
  return;
}

function annulerPanier() {
  listeParticipants = [];                                                           // Vider la liste des participants
  total = 0;                                                                        // Réinitialiser le total
  afficherPanier();                                                                 // Mettre à jour l'affichage du panier
  alert ("Votre inscription a été annulée.");
  return;
}

