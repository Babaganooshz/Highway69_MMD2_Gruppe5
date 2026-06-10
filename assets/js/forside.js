/* Forside */
// Hero slideshow
const heroImages = [
    './assets/img/baren.webp',
    './assets/img/cheeseburger.webp',
    './assets/img/restaurant69.webp',
    './assets/img/pynt.webp',
    './assets/img/steak.webp',
    './assets/img/terrasse.webp'
];

const heroImg = document.getElementById('hero-slide-img');
let heroIndex = 0;

setInterval(() => {
    heroImg.style.opacity = '0';

    setTimeout(() => {
        heroIndex = (heroIndex + 1) % heroImages.length;
        heroImg.src = heroImages[heroIndex];
        heroImg.style.opacity = '1';
    }, 800);
}, 5000);


//Pilen fader ud idet man scroller ned på siden
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


// Finder alle "læs mere" knapper og skjult tekst
document.querySelectorAll(".read-more-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        if (window.innerWidth >= 769) return;

        // Finder den nærmeste skjulte tekst i samme artikel
        const moreText = this.closest("p, article").querySelector(".more-text");

        moreText.classList.toggle("visible");

        if (moreText.classList.contains("visible")) {
            this.textContent = "[Luk]";
        } else {
            this.textContent = "[...]";
        }
    });
});


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
