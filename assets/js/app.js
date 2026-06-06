// Dropdown menu - mobil
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

function closeMenu() {
    let getMenu = document.querySelector('#navDropdown');
    let getIcon = document.querySelector('#burgerMenuIcon');

    getMenu.classList.remove('show');
    getIcon.classList.remove('fa-xmark');
    getIcon.classList.add('fa-bars');
}

let burger = document.querySelector(".burgerMenuIcon");

burger.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleMenu();
});


document.addEventListener("click", function (event) {
    let getMenu = document.querySelector('#navDropdown');
    let burger = document.querySelector(".burgerMenuIcon");

    if (!getMenu.contains(event.target) && !burger.contains(event.target)) {
        closeMenu();
    }
});
