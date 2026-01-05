const semi = document.getElementById("typeSemi");
const classique = document.getElementById("typeClassique");
const panier = document.getElementById("lePanier");

  function updatePanier() {
    let total = 0;
    let contenu = "";

    if (semi.checked) {
      contenu += "Semi-marathon : 90 €<br>";
      total += 90;
    }

    if (classique.checked) {
      contenu += "Marathon classique : 130 €<br>";
      total += 130;
    }

    if (total === 0) {
      panier.textContent = "Aucune sélection pour le moment";
    } else {
      panier.innerHTML = `
        ${contenu}
        <strong>Total : ${total} €</strong>
      `;
    }
  }

  semi.addEventListener("change", updatePanier);
  classique.addEventListener("change", updatePanier);