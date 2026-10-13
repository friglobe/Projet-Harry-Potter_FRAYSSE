// Menu responsive : le burger ouvre et ferme le menu sur mobile
const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header ul");

burger.addEventListener("click", () => {
  menu.classList.toggle("open");
});
