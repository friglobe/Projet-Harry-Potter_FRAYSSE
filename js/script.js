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
        <a href="details.html">
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
    personnages = data.slice(0, 20);
    afficherPersonnages(personnages);
  })
  .catch((error) => {
    console.error(error);
    charactersDiv.innerHTML = "<p>Impossible de charger les personnages.</p>";
  });
