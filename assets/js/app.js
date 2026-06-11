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

/* MENUKORT - SIDE */
/* Menukort filter */
const apiUrl = "https://test.fischerdesign.dk/wp-json/wp/v2/posts?acf_format=standard&per_page=100";
const kategoriUrl = "https://test.fischerdesign.dk/wp-json/wp/v2/categories?per_page=100";

const madListe = document.querySelector("#madListe");
const madTitel = document.querySelector("#madTitel");
const madIkon = document.querySelector("#madIkon");
const madKnapper = document.querySelectorAll("#madKnapper .menuKnap");

const drikkeListe = document.querySelector("#drikkeListe");
const drikkeKnapper = document.querySelectorAll("#drikkeKnapper .menuKnap");

let allePosts = [];
let alleKategorier = [];

const kategoriIkoner = {
    35: "fa-burger",
    36: "fa-pizza-slice",
    37: "fa-utensils",
    38: "fa-bacon",
    39: "fa-leaf",
    40: "fa-child",
    41: "fa-ice-cream",
    42: "fa-tag",

    44: "fa-mug-hot",
    45: "fa-glass-water",
    46: "fa-beer-mug-empty",
    47: "fa-wine-glass",
    48: "fa-beer-mug-empty",
    49: "fa-bottle-water",
    50: "fa-ban",
    51: "fa-wine-bottle",
    52: "fa-wine-glass",
    53: "fa-wine-glass",
    56: "fa-glass-water",
    64: "fa-glass-water",
    65: "fa-droplet"
};

if (madListe && drikkeListe) {
    hentMenuData();
    aktiverMadKnapper();
    aktiverDrikkeKnapper();
}

function hentMenuData() {
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (posts) {
            allePosts = posts;

            return fetch(kategoriUrl);
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (kategorier) {
            alleKategorier = kategorier;

            /* Burger og sodavand vælges automatisk */
            visMad(35, "Burgere", "fa-burger");
            visDrikkevarer(45);
        });
}


/* MAD KNAPPER */

function aktiverMadKnapper() {
    madKnapper.forEach(function (knap) {
        knap.addEventListener("click", function () {
            madKnapper.forEach(function (andenKnap) {
                andenKnap.classList.remove("active");
            });

            knap.classList.add("active");

            const kategoriId = Number(knap.dataset.id);
            const titel = knap.dataset.title;
            const ikon = knap.dataset.icon;

            visMad(kategoriId, titel, ikon);
        });
    });
}


function visMad(kategoriId, titel, ikon) {
    madListe.innerHTML = "";

    madTitel.textContent = titel;
    madIkon.className = "fa-solid " + ikon;

    const filtreredeRetter = allePosts.filter(function (post) {
        return post.categories.includes(kategoriId);
    });

    if (filtreredeRetter.length === 0) {
        madListe.innerHTML = `<p class="tomBesked">Der er ingen retter i denne kategori endnu.</p>`;
        return;
    }

    filtreredeRetter.forEach(function (post) {
        const acf = post.acf;

        const navn = acf.navn_pa_ret || post.title.rendered;
        const beskrivelse = acf.beskrivelse || "";
        const vaegt = acf.vaegt || "";
        const pris = acf.pris || "";
        const tilbehor = acf.valg_af_tilbehor || "";

        let vaegtHtml = "";
        let prisHtml = "";
        let tilbehorHtml = "";

        if (vaegt !== "") {
            vaegtHtml = `
                <span class="menuInfo">
                    <i class="fa-solid fa-scale-balanced"></i>
                    ${vaegt}g.
                </span>
            `;
        }

        if (pris !== "") {
            prisHtml = `
                <span class="menuInfo menuPris">
                    <i class="fa-solid fa-coins"></i>
                    ${pris},-
                </span>
            `;
        }

        if (tilbehor !== "") {
            tilbehorHtml = `<p class="tilbehor">Tilbehør: ${tilbehor}</p>`;
        }

        madListe.innerHTML += `
            <article class="menuRet">
                <div class="menuRetTop">
                    <h3>${navn}</h3>
                    ${vaegtHtml}
                    ${prisHtml}
                </div>

                <p>${beskrivelse}</p>
                ${tilbehorHtml}
            </article>
        `;
    });
}


/* DRIKKE KNAPPER */

function aktiverDrikkeKnapper() {
    drikkeKnapper.forEach(function (knap) {
        knap.addEventListener("click", function () {
            drikkeKnapper.forEach(function (andenKnap) {
                andenKnap.classList.remove("active");
            });

            knap.classList.add("active");

            const kategoriId = Number(knap.dataset.id);

            visDrikkevarer(kategoriId);
        });
    });
}


function visDrikkevarer(parentId) {
    drikkeListe.innerHTML = "";

    const underKategorier = alleKategorier.filter(function (kategori) {
        return kategori.parent === parentId;
    });

    const kategorierDerSkalVises = underKategorier.length > 0
        ? underKategorier
        : alleKategorier.filter(function (kategori) {
            return kategori.id === parentId;
        });

    kategorierDerSkalVises.forEach(function (kategori) {
        const produkter = allePosts.filter(function (post) {
            return post.categories.includes(kategori.id);
        });

        if (produkter.length === 0 && kategori.id !== 50) {
            return;
        }

        const ikon = kategoriIkoner[kategori.id] || "fa-circle";

        let produktHtml = "";

        if (kategori.id === 50 && produkter.length === 0) {
            produktHtml = `
                <article class="drikkeProdukt">
                    <p class="drikkeBeskrivelse">Spørg vores tjenere om vores aktuelle udvalg af alkoholfrie øl.</p>
                </article>
            `;
        } else {
            produkter.forEach(function (post) {
                produktHtml += lavDrikkeProdukt(post);
            });
        }

        drikkeListe.innerHTML += `
            <article class="drikkeKategori">
                <div class="drikkeKategoriTitel">
                    <i class="fa-solid ${ikon}"></i>
                    <h3>${kategori.name}</h3>
                </div>

                ${produktHtml}
            </article>
        `;
    });

    if (drikkeListe.innerHTML === "") {
        drikkeListe.innerHTML = `<p class="tomBesked">Der er ingen drikkevarer i denne kategori endnu.</p>`;
    }
}


function lavDrikkeProdukt(post) {
    const acf = post.acf;

    const navn = acf.navn_pa_drikkevare || acf.navn_pa_ret || post.title.rendered;
    const beskrivelse = acf.beskrivelse_af_drikkevare || acf.beskrivelse || "";

    const prisLille = acf.pris_lille || "";
    const prisMellem = acf.pris_mellem || "";
    const prisStor = acf.pris_stor || "";
    const pris = acf.pris_ || acf.pris || "";

    const strLille = acf.storrelse_lille || "";
    const strMellem = acf.storrelse_mellem || "";
    const strStor = acf.storrelse_stor || "";
    const storrelse = acf.storrelse || "";

    let linjer = "";

    if (prisLille !== "") {
        linjer += lavDrikkeLinje("Lille:", strLille, prisLille);
    }

    if (prisMellem !== "") {
        linjer += lavDrikkeLinje("Mellem:", strMellem, prisMellem);
    }

    if (prisStor !== "") {
        linjer += lavDrikkeLinje("Stor:", strStor, prisStor);
    }

    if (pris !== "") {
        linjer += lavDrikkeLinje("", storrelse, pris);
    }

    let beskrivelseHtml = "";

    if (beskrivelse !== "") {
        beskrivelseHtml = `<p class="drikkeBeskrivelse">${beskrivelse}</p>`;
    }

    return `
        <article class="drikkeProdukt">
            <h4>${navn}</h4>
            ${linjer}
            ${beskrivelseHtml}
        </article>
    `;
}


function lavDrikkeLinje(label, storrelse, pris) {
    let storrelseHtml = "";

    if (storrelse !== "") {
        storrelseHtml = `
            <span class="menuInfo">
                <i class="fa-solid fa-glass-water"></i>
                ${storrelse}
            </span>
        `;
    }

    return `
        <div class="drikkeLinje">
            <span>${label}</span>
            ${storrelseHtml}
            <span class="menuInfo menuPris">
                <i class="fa-solid fa-coins"></i>
                ${pris},-
            </span>
        </div>
    `;
}

/* Menukort filter */

/* ANTON start her */