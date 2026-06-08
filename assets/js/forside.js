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