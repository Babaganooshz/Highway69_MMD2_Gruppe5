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
/* Forside */
// Tilføjer en eventlistener, der lytter efter et scroll
// Hero-pilen fader ud når man scroller væk fra hero sektionen

// Finder hero sektionen og pil-elementet i DOM'en
const hero = document.querySelector(".hero");
const heroArrow = document.getElementById("hero-arrow");

// Opretter en IntersectionObserver der overvåger hero sektionen
// Threshold 0.5 betyder at observeren reagerer når 50% af hero er synlig
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Hvis hero sektionen er synlig, vises pilen
        if (entry.isIntersecting) {
            heroArrow.style.opacity = "1";
        } else {
            // Hvis hero sektionen ikke er synlig, skjules pilen
            heroArrow.style.opacity = "0";
        }
    });
}, { threshold: 0.5 });

// Starter observationen af hero sektionen
heroObserver.observe(hero);


// Finder og viser/skjuler den ekstra tekst, når brugeren klikker
function toggleText() {
    const moreText = document.getElementById("moreText");
    const btn = document.getElementById("readMoreBtn");

    // Tilføjer eller fjerner klassen "visible" på tekst-elementet
    moreText.classList.toggle("visible");

    // Opdaterer knapteksten afhængigt af om teksten er synlig
    if (moreText.classList.contains("visible")) {
        btn.textContent = "[Luk]";
    } else {
        btn.textContent = "[...]";
    }
}

// Lytter efter klik på "læs mere" knappen
document.getElementById("readMoreBtn").addEventListener("click", toggleText);

// Anmeldelse sektion - forside
// Finder alle anmeldelseskort og sætter tælleren til det første kort
const cards = document.querySelectorAll(".review-card");
let current = 0;

// Skjuler alle kort undtagen det første ved at løbe alle kort igennem
cards.forEach((card, index) => {
    if (index !== 0) {
        card.style.display = "none";
    }
});

// Næste kort
// Lytter efter klik på "næste" knappe
document.getElementById("nextBtn").addEventListener("click", () => {
    // Skjuler det nuværende kort
    cards[current].style.display = "none";
    // Går et kort frem
    current = current + 1;
    // Hvis vi er nået til det sidste kort, starter vi forfra
    if (current >= cards.length) {
        current = 0;
    }
    //Viser det nye kort
    cards[current].style.display = "block";
});

// Forrige kort
document.getElementById("prevBtn").addEventListener("click", () => {
    cards[current].style.display = "none";
    // Går et kort tilbage
    current = current - 1;
    if (current < 0) {
        current = cards.length - 1;
    }
    cards[current].style.display = "block";
});

/* FREYA Start her */

/* NICKLAS start her */

/* ANTON start her */