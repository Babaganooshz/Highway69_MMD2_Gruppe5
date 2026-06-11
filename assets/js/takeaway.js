/* Load alt - vis id 35, og derefter indlæs kurv */
window.addEventListener("load", async () => {
    console.log("alt er loaded");

    await showMenuItems(35);
    renderCart();
});


/* KURV */
const cart = {};
/* VALGT ANTAL RET */
const selectedQty = {};
/* TARGET - WordPress Custom Field data */
var MenuItems;

/* Søg efter alle classes der hedder ".cat-btn", og giv disse en EventListener. Ved klik, søg efter matchende data-category-id og gem dette som categoryId. Til sidst kaldes funktionen */
document.querySelectorAll('.cat-btn').forEach(button => {
    button.addEventListener('click', event => {
        console.log('Clicked:', event.currentTarget);
        const categoryId = event.currentTarget.getAttribute('data-category-id');
        console.log(categoryId);
        showMenuItems(categoryId);
    });
});
/* Kald "getMenuItems", afvent og gem data ved TARGET "MenuItems" */
async function showMenuItems(categoryId) {
    MenuItems = await getMenuItems(categoryId);
    console.log(MenuItems)

    /* Indlæs de hentede Items, og sæt deres Qty-værdi til 1 */
    renderMenu(MenuItems);
    MenuItems.forEach(item => { selectedQty[item.id] = 1; });
}

/* Indlæs menu, og derved showItems - find dernæst et element der har "menuList" som id*/
function renderMenu(showItems) {
    const list = document.getElementById('menuList');
    /* Erstat alt indhold heri, med dataen fra showItems. Skriv dette som et map, som serverer dataen i individuelle strings */
    list.innerHTML = showItems.map(item => {
        const qtyOptions = [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12]
            /* Lav først et array. Opret dernæst en variabel (`), og for hver værdi (n), opret et "option" tag hvori "$"-værdien kan justeres. 
            Svarer værdien til "n"?, hvis ja - udskriv ${selectedQty}, hvis ikke - gør intet */
            .map(n => `<option value="${n}" ${selectedQty[item.id] === n ? 'selected' : ''}>${n}</option>`)
            .join('');

        /* Retuner derefter den ønskede menuList i et sæt backticks (`) for kunne blande tekst og data. 
        id="item-row-${item.id}" giver elementet et unikt id. 
        - Søg efter classes med matchende navn, og indsæt indhentet data på angivne pladser. Tilføj Qty-dropdown med indsatte værdier, samt "+" som Tilføj-til-kurv knap, der læser hvilket id knappen hører til, og dermed hvilken ret der tilføjes til kurv
        ".join('') sørger for, at mine Items bliver listet efterfulgt af hinanden */
        return `
      <div class="menu-item" id="item-row-${item.id}">
        <span class="item-name">${item.name}</span>
        <span class="item-price">${item.price},-</span>
        <p class="item-desc">${item.desc}</p>
        <div class="item-controls">
          <div class="qty-wrapper">
            <select
              class="qty-select"
              id="qty-${item.id}"
              onchange="setQty(${item.id}, this.value)"
            >${qtyOptions}</select>
            <span class="qty-chevron">&#8964;</span>
          </div>
          <button
            class="add-btn"
            id="add-${item.id}"
            onclick="addToCart(${item.id})"
            aria-label="Tilføj ${item.name} til kurv"
          >+</button>
        </div>
      </div>
    `;
    }).join('');
}
/* Kald funktionen getMenuItems, og gør det ud fra categoryId. Indholdet skal være JSON, og GET betyder "hent, ej send"  */
function getMenuItems(categoryId) {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    /* Returner derefter data fra /posts?categories= + det ønskede id. ".json" formaterer svaret til Javascript - eksempelvis titel og pris. 
    Disse data bliver efterfølgende postet i næste return-command.  
    Skulle der opstå fejl, print fejl i consolelog */
    return fetch('https://test.fischerdesign.dk/wp-json/wp/v2/posts?categories=' + categoryId, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            var Menu = response.map((post) => {
                return {
                    id: post.id,
                    name: post.title.rendered,
                    price: post.acf.pris,
                    desc: post.acf.beskrivelse,
                    sides: post.acf.valg_af_tilbehor ? [post.acf.valg_af_tilbehor] : [],
                };
            });
            console.log(Menu);
            return Menu;
        })
        .catch(err => console.error(err));

}

/* QTY HELPERS */
function setQty(id, value) {
    selectedQty[id] = parseInt(value, 10);
}
/* Gennemgå MenuItems, og returner første element hvor item.id === id. 
Findes dette id allerede i kurven når det aktiveres, tilføjes mængde-værdien til den nuværende - hvis ikke, tilføjes den valgte Qty-værdi
til sidst indlæses kurven på ny */
function addToCart(id) {
    const item = MenuItems.find(item => item.id === id);
    const qty = selectedQty[id];

    if (cart[id]) {
        cart[id].qty += qty;
    } else {
        cart[id] = { ...item, qty };
    }

    renderCart();
    flashConfirm(id);
}
/* Fjern et valgt id fra kurven, og indlæs kurv på ny */
function removeFromCart(id) {
    delete cart[id];
    renderCart();
}

/* CART RENDERING */
function buildCartLinesHTML() {
    const ids = Object.keys(cart);
    if (!ids.length) return '<p class="cart-empty">Kurven er tom</p>';

    return ids.map(id => {
        const { name, sides, price, qty } = cart[id];
        const sidesHTML = sides ? sides.map(s => `- ${s}`).join('<br>')
            : '';

        return `
      <div class="cart-line">
        <span class="cart-x" onclick="removeFromCart(${id})" aria-label="Fjern ${name}">&#x2715;</span>
        <div class="cart-line-body">
          <div class="cart-line-name">${qty} STK. ${name}</div>
          <div class="cart-line-sides">${sidesHTML}</div>
        </div>
        <div class="cart-line-right">
          <span class="cart-line-price">${(price * qty).toLocaleString('da-DK')},-</span>
          <span class="cart-edit" aria-label="Rediger">&#9998;</span>
        </div>
      </div>
    `;
    }).join('');
}

function getTotal() {
    return Object.values(cart).reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCount() {
    return Object.values(cart).reduce((sum, i) => sum + i.qty, 0);
}

function renderCart() {
    const linesHTML = buildCartLinesHTML();
    const total = getTotal();
    const totalStr = total.toLocaleString('da-DK') + ',-';
    const count = getCount();

    document.getElementById('desktopCartLines').innerHTML = linesHTML;
    document.getElementById('desktopCartTotal').textContent = totalStr;

    document.getElementById('mobileCartLines').innerHTML = linesHTML;
    document.getElementById('sheetCartTotal').textContent = totalStr;

    document.getElementById('mobileCartTotal').textContent = totalStr;
    document.getElementById('mobileCartCount').textContent = count;
}

/* ADD BUTTON FEEDBACK */
function flashConfirm(id) {
    const btn = document.getElementById(`add-${id}`);
    if (!btn) return;

    btn.textContent = '✓';
    btn.classList.add('added');

    setTimeout(() => {
        btn.textContent = '+';
        btn.classList.remove('added');
    }, 700);
}

/* MOBILE CART OVERLAY */
function openCart() {
    document.getElementById('overlay').classList.add('open');
}

function closeCart() {
    document.getElementById('overlay').classList.remove('open');
}

function closeCartIfBg(event) {
    if (event.target === document.getElementById('overlay')) closeCart();
}

/* LOAD MORE */
function toggleItems() {
    const btn = document.getElementById('loadMore');
    btn.style.opacity = '0.4';
    setTimeout(() => { btn.style.opacity = ''; }, 300);
}

/* CATEGORY NAV — active tab switching */
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

/* CATEGORY ICONS — wire up mask-image from data-icon attribute */
document.querySelectorAll('.cat-btn .icon[data-icon]').forEach(el => {
    const path = el.getAttribute('data-icon');
    el.style.webkitMaskImage = `url(${path})`;
    el.style.maskImage = `url(${path})`;
});

// Ændre titel baseret på kategori valgt i menuen
const takeawayTitle = document.querySelector('#takeawayTitle');
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        takeawayTitle.textContent = btn.getAttribute('data-label');
    });
});
