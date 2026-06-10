/* Forside */
// Hero slideshow
// Array med stier til alle hero-billeder der skal vises i slideshowet
const heroImages = [
    './assets/img/baren.webp',
    './assets/img/cheeseburger.webp',
    './assets/img/restaurant69.webp',
    './assets/img/pynt.webp',
    './assets/img/steak.webp',
    './assets/img/terrasse.webp'
];

// Finder hero-billedet i DOM'en og sætter startindekset til det første billede
const heroImg = document.getElementById('hero-slide-img');
let heroIndex = 0;

// Skifter automatisk billede hvert 4. sekund
setInterval(() => {
    // Fader billedet ud
    heroImg.style.opacity = '0';

    // Venter 300ms på at fade-animationen er gennemført, hvorefter der skiftes til det næste billede
    setTimeout(() => {
        // Går til næste billede - starter forfra når vi når slutningen af arrayet
        heroIndex = (heroIndex + 1) % heroImages.length;
        heroImg.src = heroImages[heroIndex];
        // Fader det nye billede ind
        heroImg.style.opacity = '1';
    }, 300); // Antal milisekunder billedet bruger på at udføre sin animation
}, 4000); // Antal milisekunder mellem hvert billede


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
        // Funktionen gør ingenting på skærme bredere end 768px eftersom den skjulte tekst altid er synlig på desktop
        if (window.innerWidth >= 769) return;

        // Finder den nærmeste skjulte tekst i samme artikel
        const moreText = this.closest("p, article").querySelector(".more-text");

        // Skifter mellem at vise og skjule teksten
        moreText.classList.toggle("visible");

        // Opdaterer knappens tekst afhængigt af om teksten er synlig eller ej
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
