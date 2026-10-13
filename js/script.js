const API_URL = "https://hp-api.onrender.com/api/characters";
const IMAGE_PAR_DEFAUT = "./images/troll.jpg";

const charactersDiv = document.querySelector(".characters");

let personnages = [];

function afficherPersonnages(liste) {
  charactersDiv.innerHTML = "";

  liste.forEach((perso) => {
    const image = perso.image || IMAGE_PAR_DEFAUT;
    const maison = perso.house ? perso.house.toLowerCase() : "";

    charactersDiv.innerHTML += `
      <div class="${maison}">
        <a href="details.html?id=${perso.id}">
          <img src="${image}" alt="${perso.name}">
          <p>${perso.name}</p>
        </a>
      </div>
    `;
  });
}

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    personnages = data;
    afficherPersonnages(personnages);
  })
  .catch((error) => {
    console.error(error);
    charactersDiv.innerHTML = "<p>Impossible de charger les personnages.</p>";
  });

const maisons = document.querySelectorAll(".houses > div");

maisons.forEach((maisonDiv) => {
  maisonDiv.addEventListener("click", () => {
    const maison = maisonDiv.dataset.house;

    const personnagesTries = personnages
      .filter((perso) => perso.house === maison)
      .sort((a, b) => a.name.localeCompare(b.name));

    afficherPersonnages(personnagesTries);
  });
});