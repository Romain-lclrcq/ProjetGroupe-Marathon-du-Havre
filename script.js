// Scroll to top on resize
const anchor = document.querySelector ("#header")
window.addEventListener("resize",() => { anchor.scrollIntoView()})

/*------------------------------------Déclaration des variables------------------*/
// Constantes pour récupérer les données du formulaire et le reset après chaque inscription
const nom = document.getElementById("Lastname");
const prenom = document.getElementById("Firstname");
const phone = document.getElementById("Phone");
const email = document.getElementById("Email");
const age = document.getElementById("Age");
const semi = document.getElementById("typeSemi");
const classique = document.getElementById("typeClassique");
const inscription = document.querySelector("#solo")
const formulaire = document.querySelector("form")
let compteurInscription = 0;                                          // Compteur pour le nombre de clics sur le bouton d'inscription

// Constante pour gérer les participants dans le panier
let participants = document.querySelector(".nomDesParticipants")
const panier = document.querySelector("#lePanier p");
panier.textContent = "Aucune sélection pour le moment";
let total = 0;                                                         // variable pour le total du panier
let sousTotal = 0;                                                    // variable pour le sous-total du participant
let billets = [];                                                     // tableau pour stocker les types de billets sélectionnés
let listeParticipants = [];                                           // tableau pour stocker les participants

// Constantes pour gerer les boutons Valider et Annuler du panier
const validerBtn = document.getElementById("valider");
const annulerBtn = document.getElementById("annuler");

// Constantes pour la boite de dialogue 
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
evt.preventDefault();                                     // Empêche le rechargement de la page
  
  modifierTexteBouton();                                // Appel de la fonction pour modifier le texte du bouton

  if (semi.checked) {                                   // Vérification SI le billet semi-marathon est sélectionné
    billets.push("Semi-marathon");                      // Ajout du type de billet au tableau
    sousTotal += 90;                                    // Alors on additionne le prix du billet au sous-total
  }

  if (classique.checked) {                             // Vérification SI le billet marathon classique est sélectionné
    billets.push("Marathon classique");                // Ajout du type de billet au tableau
    sousTotal += 130;                                  // Alors on additionne le prix du billet au sous-total
  }

  if (billets.length === 0) {                           // Vérification SI aucun billet n'est sélectionné
    alert("Veuillez sélectionner au moins un billet");  // Affichage d'une alerte
    return;                                             // Arrêt de l'exécution de la fonction
  }

  // Ajouter un participant
  listeParticipants.push({                              // Ajout d'un objet participant dans le tableau
    nom: nom.value,
    prenom: prenom.value,
    billets: billets,
    prix: sousTotal,
    email : email.value,
    tel : phone.value,
    age : age.value
  });

   // Mettre à jour le total
  total += sousTotal;                                 // Additionner le sous-total au total

  // Mise à jour affichage
  afficherPanier();                                 // Appel de la fonction pour afficher le panier

  // Réinitialisation des variables pour le prochain participant
  sousTotal = 0;
  billets = [];

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
  let contenu = "";// Initialisation du contenu du panier

  listeParticipants.forEach((p, index) => {         // ForEach pour parcourir de la liste des participants

  // Ajout pour chaque participant d'un balise p avec contenu son index, nom, prénom, types de billets et prix
  contenu += `<p data-index = ${index} class="participant">${index + 1}. ${p.prenom} ${p.nom} – ${p.billets.join(" + ")} = ${p.prix} €</p>`; 
  });

  panier.innerHTML = `${contenu}<strong>Total : ${total} €</strong>`;// Affichage du total du panier
}

// Fonction pour modifier le texte du bouton s'inscrire au clic
function modifierTexteBouton(event) {
  compteurInscription++;                                                        // Incrémentation du compteur à chaque clic
  if (compteurInscription === 1) {                                              // SI premier clic
    inscription.value = "Créer une équipe et ajouter un 2e participant";        // Alors changement du texte du bouton pour inviter à ajouter un 2e participant
  } else if (compteurInscription >= 2) {                                        // SINON pour les clics suivants
    inscription.value = "Ajouter un participant";                               // Changement du texte du bouton pour inviter à ajouter un participant
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
  compteurInscription = 0;                                                            // Réinitialiser le compteur de clics
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
  if (e.target.classList.contains("participant")){                    // Vérification si l'élément cliqué est un participant
    currentIndex = e.target.dataset.index                             // Récupération de l'index du participant cliqué        
    
    // Remplissage des champs avec les données du participant
    firstnameModal.value = listeParticipants[currentIndex].prenom
    lastnameModal.value = listeParticipants[currentIndex].nom
    ageModal.value = listeParticipants[currentIndex].age
    emailModal.value = listeParticipants[currentIndex].email
    telModal.value = listeParticipants[currentIndex].tel
    if(listeParticipants[currentIndex].prix === 90){                 // SI seul le semi-marathon est sélectionné
      checkboxModalSemi.checked =true                                // Cocher la case semi-marathon
      checkboxModalClassique.checked=false                           // Décocher la case marathon classique
    } else if (listeParticipants[currentIndex].prix === 130){       // SI seul le marathon classique est sélectionné
      checkboxModalClassique.checked=true                           // Cocher la case marathon classique
      checkboxModalSemi.checked=false                               // Décocher la case semi-marathon
    } else {                                                        // SINON les deux billets sont sélectionnés         
            checkboxModalSemi.checked =true                         // Cocher la case semi-marathon
            checkboxModalClassique.checked=true                     // Cocher la case marathon classique
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
  if (checkboxModalSemi.checked) {                                          // Vérification SI le billet semi-marathon est sélectionné
    nouveauPrix += 90;                                                      // Alors on additionne le prix du billet au nouveauTotal
    listeParticipants[currentIndex].billets.push("Semi-marathon");          // Ajout du type de billet au tableau
  }
  if (checkboxModalClassique.checked) {                                     // Vérification SI le billet marathon classique est sélectionné
    listeParticipants[currentIndex].billets.push("Marathon classique");     // Ajout du type de billet au tableau
    nouveauPrix += 130;                                                     // Alors on additionne le prix du billet au nouveauTotal
  }

  listeParticipants[currentIndex].prix = nouveauPrix;                       // Mise à jour du prix du participant 
  // Mise à jour du total
  total -= ancienPrix;                                                      // on soustrait l'ancien prix, peut s'écrire total = total - ancienPrix
  total += nouveauPrix;                                                     // pour pouvoir ensuite ajouter le nouveau prix, peut s'écrire total = total + nouveauPrix
  afficherPanier();                                                         // Mise à jour de l'affichage du panier
  dialog.close();                                                           // Fermeture de la boîte de dialogue

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