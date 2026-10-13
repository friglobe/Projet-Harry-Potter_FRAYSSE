const burger = document.querySelector(".header__burger");
const menu = document.querySelector(".header ul");

burger.addEventListener("click", () => {
  menu.classList.toggle("open");
});
