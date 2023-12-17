// JavaScript para mostrar/ocultar el menú desplegable --Fran
const menuBtn = document.querySelector(".menu-btn");
const navList = document.querySelector(".nav-list");

menuBtn.addEventListener("click", () => {
    navList.classList.toggle("active");
    menuBtn.classList.toggle("open");
});

// Cierra el menú cuando se hace clic fuera de él
document.addEventListener("click", (event) => {
    if (!navList.contains(event.target) && !menuBtn.contains(event.target)) {
        navList.classList.remove("active");
        menuBtn.classList.remove("open");
    }
});
