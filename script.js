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
const checkboxModalSemi = document.querySelector("#semiModal")
const checkboxModalClassique = document.querySelector("#classiqueModal")
const btnCancel = document.querySelector(".btnCancel")
const btnChange = document.querySelector(".btnChange")
const btnDelete = document.querySelector(".btnDelete")
const btnRegister = document.querySelector(".btnRegister")
let currentIndex = null

/*-----------------------------------Déclaration des événements------------------*/
formulaire.addEventListener("submit", afficherParticipant);
validerBtn.addEventListener("click", validerPanier);
annulerBtn.addEventListener("click", annulerPanier);
participants.addEventListener("click", changeUser)
btnCancel.addEventListener("click", () => {dialog.close()})
btnChange.addEventListener("click", modifierParticipant)
btnDelete.addEventListener("click", supprimerParticipant)
btnRegister.addEventListener("click", sauvegarderModifications)

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

//Fonction pour modifier un participant au clic sur son nom dans la modal
function changeUser (e){
  if (e.target.classList.contains("participant")){
    currentIndex = e.target.dataset.index                             // Récupération de l'index du participant cliqué        
    
    // Remplissage des champs avec les données du participant
    firstnameModal.value = listeParticipants[currentIndex].prenom
    lastnameModal.value = listeParticipants[currentIndex].nom
    ageModal.value = listeParticipants[currentIndex].age
    emailModal.value = listeParticipants[currentIndex].email
    telModal.value = listeParticipants[currentIndex].tel
    if(listeParticipants[currentIndex].prix === 90){
      checkboxModalSemi.checked =true
      checkboxModalClassique.checked=false
    } else if (listeParticipants[currentIndex].prix === 130){
      checkboxModalClassique.checked=true
      checkboxModalSemi.checked=false
    } else {
            checkboxModalSemi.checked =true
            checkboxModalClassique.checked=true
    }
    
    // Désactivation des champs pour les rendre non modifiables
    firstnameModal.disabled = true;
    lastnameModal.disabled = true;
    ageModal.disabled = true;
    emailModal.disabled = true;
    telModal.disabled = true;
    checkboxModalSemi.disabled = true;
    checkboxModalClassique.disabled = true;

    btnRegister.style.visibility = "hidden";                      // Cacher le bouton valider pendant la modification
    dialog.show()                                                 // Affichage de la boîte de dialogue
  }
}

// Fonction pour modifier des participants dans la modal
function modifierParticipant(e){
  btnRegister.style.visibility = "visible";                     // Rendre le bouton valider visible pendant la modification
  btnChange.style.visibility = "hidden";                        // Cacher le bouton modifier pendant la modification
  btnDelete.style.visibility = "hidden";                        // Cacher le bouton supprimer pendant la modification

  // Activation des champs pour les rendre modifiables
  firstnameModal.disabled = false;
  lastnameModal.disabled = false;
  ageModal.disabled = false;
  emailModal.disabled = false;
  telModal.disabled = false;
  checkboxModalSemi.disabled = false;
  checkboxModalClassique.disabled = false;
}

// Fonction pour sauvegarder les modifications du participant
function sauvegarderModifications(e){
  // Sauvegarder l'ancien prix pour la mise à jour du total
  let ancienPrix = listeParticipants[currentIndex].prix; 

  // Mise à jour des données du participant avec les nouvelles valeurs des champs
  listeParticipants[currentIndex].prenom = firstnameModal.value;
  listeParticipants[currentIndex].nom = lastnameModal.value;
  listeParticipants[currentIndex].age = ageModal.value;
  listeParticipants[currentIndex].email = emailModal.value;
  listeParticipants[currentIndex].tel = telModal.value;
  listeParticipants[currentIndex].billets = [];

  // Calcul du nouveau prix en fonction des cases cochées avec un IF
  let nouveauPrix = 0;
  if (checkboxModalSemi.checked) {
    listeParticipants[currentIndex].billets.push("Semi-marathon");
    nouveauPrix += 90;
  }
  if (checkboxModalClassique.checked) {
    listeParticipants[currentIndex].billets.push("Marathon classique");
    nouveauPrix += 130;
  }

  listeParticipants[currentIndex].prix = nouveauPrix;         // Mise à jour du prix du participant 
  // Mise à jour du total
  total -= ancienPrix;                                        // on soustrait l'ancien prix, peut s'écrire total = total - ancienPrix
  total += nouveauPrix;                                       // pour pouvoir ensuite ajouter le nouveau prix, peut s'écrire total = total + nouveauPrix
  afficherPanier();                                           // Mise à jour de l'affichage du panier
  dialog.close();                                             // Fermeture de la boîte de dialogue

  // Réinitialisation de l'événement des boutons pour permettre une nouvelle modification
  btnChange.removeEventListener("click", modifierParticipant);
  btnRegister.removeEventListener("click", sauvegarderModifications);
  btnChange.addEventListener("click", modifierParticipant);
  btnRegister.addEventListener("click", sauvegarderModifications);
  btnChange.style.visibility = "visible";                     // Rendre le bouton modifier visible après la modification
  btnDelete.style.visibility = "visible";                     // Rendre le bouton supprimer visible après la modification
  btnRegister.style.visibility = "hidden";                    // Cacher le bouton valider après la modification
}

// Fonction pour supprimer le participant de la liste
function supprimerParticipant(e){
  let prixASupprimer = listeParticipants[currentIndex].prix;       // Récupérer le prix du participant à supprimer
  listeParticipants.splice(currentIndex, 1);                       // Supprimer le participant de la liste                                       
  total -= prixASupprimer;                                        // Mise à jour du total, en soustrayant le prix du participant supprimé
  afficherPanier();                                               // Mise à jour de l'affichage du panier
  dialog.close();                                                 // Fermeture de la boîte de dialogue    
  currentIndex = null;                                            // Réinitialiser currentIndex pour éviter de garder une référence obsolète
}