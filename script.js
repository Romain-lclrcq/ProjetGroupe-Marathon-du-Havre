// Scroll to top on resize
const anchor = document.querySelector ("#header")
window.addEventListener("resize",() => { anchor.scrollIntoView()})

/*------------------------------------Déclaration des variables------------------*/
const semi = document.getElementById("typeSemi");
const classique = document.getElementById("typeClassique");
const panier = document.querySelector("#lePanier p");
panier.textContent = "Aucune sélection pour le moment";
let total = 0; // variable pour le total du panier
let listeParticipants = []; // tableau pour stocker les participants
let compteurInscription = 0; // Compteur pour le nombre de clics sur le bouton d'inscription

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

// Constantes pour gerer les boutons Valider et Annuler
const validerBtn = document.getElementById("valider");
const annulerBtn = document.getElementById("annuler");

// Constante pour la boite de dialogue 
const dialog = document.querySelector("dialog")
const firstnameModal = document.querySelector("#firstnameModal") 
const lastnameModal = document.querySelector("#lastnameModal") 
const ageModal = document.querySelector("#ageModal") 
const emailModal = document.querySelector("#emailModal") 
const telModal = document.querySelector("#telModal") 
const btnCancel = document.querySelector(".btnCancel")
let currentIndex = null

/*-----------------------------------Déclaration des événements------------------*/
formulaire.addEventListener("submit", afficherParticipant);
validerBtn.addEventListener("click", validerPanier);
annulerBtn.addEventListener("click", annulerPanier);
participants.addEventListener("click", changeUser)
btnCancel.addEventListener("click", () => {dialog.close()})


/*-----------------------------------Déclaration des fonctions------------------*/
// Fonction pour afficher le(s) participant(s) dans le panier
function afficherParticipant(evt) {
evt.preventDefault();                                   // Empêche le rechargement de la page
  
  modifierTexteBouton();                              // Appel de la fonction pour modifier le texte du bouton

  let billets = [];                                     // tableau pour stocker les types de billets sélectionnés
  let sousTotal = 0;                                    // variable pour le sous-total du participant

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
    prix: sousTotal,
    email : email.value,
    tel : phone.value,
    age : age.value
  });

   // Mettre à jour le total
  total += sousTotal;

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

// Fonction pour afficher le panier
function afficherPanier() {
  let contenu = "";

  listeParticipants.forEach((p, index) => {
  contenu += `<p data-index = ${index} class="participant">${index + 1}. ${p.prenom} ${p.nom} – ${p.billets.join(" + ")} = ${p.prix} €</p>`;
  });

  panier.innerHTML = `${contenu}<strong>Total : ${total} €</strong>`;// Affichage du total du panier
}

// Fonction pour modifier le texte du bouton s'inscrire au clic
function modifierTexteBouton(event) {
  compteurInscription++;
  if (compteurInscription === 1) {
    inscription.value = "Créer une équipe et ajouter un 2e participant";
  } else if (compteurInscription >= 2) {
    inscription.value = "Ajouter un participant";
  }
}

// Fonction pour gérer le bouton valider du panier
function validerPanier() {
  if (listeParticipants.length === 0) {                                                 // Vérifier si le panier est vide
    alert("Le panier est vide. Veuillez ajouter des participants avant de valider.");  // Si oui afficher une alerte
    return;                                                                            // Arrêter l'exécution de la fonction
  }
  alert(`Merci pour votre inscription ! Le montant total est de ${total} €.`);         // Sinon afficher message + le montant total dans le dialog
  listeParticipants = [];                                                              // Vider la liste des participants
  total = 0;                                                                          // Réinitialiser le total
  afficherPanier();                                                                   // Mettre à jour l'affichage du panier
  inscription.value = "S'inscrire";                                                   // Réinitialiser le texte du bouton d'inscription
  compteurInscription = 0;                                                         
  return;
}

// Fonction pour gérer le bouton annuler du panier
function annulerPanier() {
  alert ("Votre inscription a été annulée.");                                       // Afficher message d'annulation                
  listeParticipants = [];                                                           // Vider la liste des participants
  total = 0;                                                                        // Réinitialiser le total
  afficherPanier();                                                                 // Mettre à jour l'affichage du panier
  inscription.value = "S'inscrire";                                                 // Réinitialiser le texte du bouton d'inscription
  compteurInscription = 0;                                                         // Réinitialiser le compteur de clics
  return;
}

//Ouverture de la modal
function changeUser (e){
  if (e.target.classList.contains("participant")){
    currentIndex = e.target.dataset.index
    firstnameModal.value = listeParticipants[currentIndex].prenom
    lastnameModal.value = listeParticipants[currentIndex].nom
    ageModal.value = listeParticipants[currentIndex].age
    emailModal.value = listeParticipants[currentIndex].email
    telModal.value = listeParticipants[currentIndex].tel

    dialog.show()
  }
}
