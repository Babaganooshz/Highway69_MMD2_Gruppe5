// Dropdown menu - mobil

// Slår dropdown menuen til/fra når burger-ikonet klikkes
function toggleMenu() {
    let getMenu = document.querySelector('#navDropdown');
    let getIcon = document.querySelector('#burgerMenuIcon');

    getMenu.classList.toggle('show');

    if (getMenu.classList.contains('show')) {
        getIcon.classList.remove('fa-bars');
        getIcon.classList.add('fa-xmark');
    } else {
        getIcon.classList.remove('fa-xmark');
        getIcon.classList.add('fa-bars');
    }
}

// Lukker dropdown menuen og nulstiller ikonet til hamburger
function closeMenu() {
    let getMenu = document.querySelector('#navDropdown');
    let getIcon = document.querySelector('#burgerMenuIcon');

    getMenu.classList.remove('show');
    getIcon.classList.remove('fa-xmark');
    getIcon.classList.add('fa-bars');
}

let burger = document.querySelector(".burgerMenuIcon");

// Åbner eller lukker menuen når burger-ikonet klikkes
burger.addEventListener("click", function () {
    toggleMenu();
});

// Lukker menuen hvis der klikkes uden for nav-baren
document.addEventListener("click", function (event) {
    let navMobile = document.querySelector('.nav-mobile');

    // Tjekker om klikket er uden for den mobile nav
    if (!navMobile.contains(event.target)) {
        closeMenu();
    }
});

/* FREJA start her */

/* FREYA Start her */

/* NICKLAS start her */

/* ANTON start her */