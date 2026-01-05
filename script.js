const semi = document.getElementById("typeSemi");
  const classique = document.getElementById("typeClassique");
  const panier = document.getElementById("lePanier");

  function updatePanier() {
    if (semi.checked) {
      classique.checked = false;
      panier.textContent = "Semi-marathon : 90 €";
    } else if (classique.checked) {
      semi.checked = false;
      panier.textContent = "Marathon classique : 130 €";
    } else {
      panier.textContent = "Aucune sélection pour le moment";
    }
  }

  semi.addEventListener("change", updatePanier);
  classique.addEventListener("change", updatePanier);