const semi = document.getElementById("typeSemi");
const classique = document.getElementById("typeClassique");
const panier = document.querySelector("#lePanier p");
panier.textContent = "Aucune sélection pour le moment";

  function updatePanier() {
    let total = 0;
    let contenu = "";

    if (semi.checked) {
      contenu += "Billet semi-marathon : 90 €<br>";
      total += 90;
    }

    if (classique.checked) {
      contenu += "Billet marathon classique : 130 €<br>";
      total += 130;
    }

    if (total === 0) {
      panier.textContent = "Aucune sélection pour le moment";
      console.log('coucou');
      
    
    } else {
      panier.innerHTML = `
        ${contenu}
        Total : ${total} €
      `;
    }
  }

  semi.addEventListener("change", updatePanier);
  classique.addEventListener("change", updatePanier);

  // créer une constante pour récupérer le nom + prénom du formulaire
let nom = document.getElementById("Lastname");
let prenom = document.getElementById("Firstname");
const inscription = document.querySelector("#solo")
const formulaire = document.querySelector("form")
let participants = document.querySelector(".nomDesParticipants")
console.log(participants);



formulaire.addEventListener("submit", afficherParticipant);

function afficherParticipant(evt) {
  evt.preventDefault(); // Empêche le rechargement de la page
  participants.append(`${nom.value} ${prenom.value} /`)
  nom.value = ""
  prenom.value = ""
  inscription.value="Ajouter un participant"

  



}
