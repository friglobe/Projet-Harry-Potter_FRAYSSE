const API_URL = "https://hp-api.onrender.com/api/character/";
const IMAGE_PAR_DEFAUT = "./images/troll.jpg";

const nomTitre = document.querySelector("#perso-nom");
const image = document.querySelector("#perso-image");
const acteur = document.querySelector("#perso-acteur");
const infos = document.querySelector("#perso-infos");
const maisonSection = document.querySelector("#perso-maison");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

function valeur(v) {
  return v || "Inconnu";
}

function ligne(libelle, texte) {
  return `
    <div>
      <p class="attr">${libelle}</p>
      <p>${valeur(texte)}</p>
    </div>
  `;
}

function afficherIntrouvable() {
  nomTitre.textContent = "Personnage introuvable";
  document.querySelector(".perso").remove();
  maisonSection.remove();
}

function afficherPersonnage(perso) {
  document.title = `${perso.name} - Partiel Harry Potter`;
  nomTitre.textContent = perso.name;

  image.src = perso.image || IMAGE_PAR_DEFAUT;
  image.alt = perso.name;
  acteur.textContent = valeur(perso.actor);

  if (!perso.alive) {
    image.classList.add("mort");
  }

  const baguette = [
    perso.wand.wood,
    perso.wand.core,
    perso.wand.length ? `${perso.wand.length} pouces` : "",
  ]
    .filter((info) => info)
    .join(", ");

  infos.innerHTML =
    ligne("Maison", perso.house) +
    ligne("Date de naissance", perso.dateOfBirth) +
    ligne("Ascendance", perso.ancestry) +
    ligne("Patronus", perso.patronus) +
    ligne("Baguette", baguette) +
    ligne("Surnoms", perso.alternate_names.join(", ") || "Aucun");

  if (perso.house) {
    const blason = maisonSection.querySelector("img");
    blason.src = `./images/logo/${perso.house}.png`;
    blason.alt = perso.house;
  } else {
    maisonSection.remove();
  }
}

if (!id) {
  afficherIntrouvable();
} else {
  fetch(API_URL + id)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        afficherIntrouvable();
      } else {
        afficherPersonnage(data[0]);
      }
    })
    .catch((error) => {
      console.error(error);
      nomTitre.textContent = "Impossible de charger le personnage.";
    });
}
