// Données des produits étendues
const products = [
    {
        id: 1,
        name: "T-shirt Blanc",
        price: 19.99,
        image: "https://via.placeholder.com/300x200?text=T-shirt+Blanc",
        category: "vetements",
        description: "T-shirt en coton 100% de haute qualité, confortable et respirant."
    },
    {
        id: 2,
        name: "Jean Slim Noir",
        price: 49.99,
        image: "https://via.placeholder.com/300x200?text=Jean+Slim+Noir",
        category: "vetements",
        description: "Jean slim noir élégant avec une coupe moderne et stretch pour plus de confort."
    },
    {
        id: 3,
        name: "Chaussures de Sport",
        price: 79.99,
        image: "https://via.placeholder.com/300x200?text=Chaussures+Sport",
        category: "chaussures",
        description: "Chaussures de sport légères avec amorti pour un maximum de performance."
    },
    {
        id: 4,
        name: "Veste en Cuir",
        price: 129.99,
        image: "https://via.placeholder.com/300x200?text=Veste+Cuir",
        category: "vetements",
        description: "Veste en cuir véritable, style motard intemporel."
    },
    {
        id: 5,
        name: "Montre Classique",
        price: 89.99,
        image: "https://via.placeholder.com/300x200?text=Montre+Classique",
        category: "accessoires",
        description: "Montre élégante avec bracelet en cuir et mouvement quartz précis."
    },
    {
        id: 6,
        name: "Sac à Dos",
        price: 39.99,
        image: "https://via.placeholder.com/300x200?text=Sac+à+Dos",
        category: "accessoires",
        description: "Sac à dos spacieux avec compartiment pour ordinateur portable."
    }
];

// Panier et état utilisateur
let cart = [];
let currentUser = null;

// Éléments DOM
const productGrid = document.getElementById('product-grid');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const authButtons = document.getElementById('auth-buttons');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const authModal = document.getElementById('auth-modal');
const registerModal = document.getElementById('register-modal');
const showRegister = document.getElementById('show-register');
const closeModals = document.querySelectorAll('.close-modal');
const categoryFilter = document.getElementById('category-filter');
const priceFilter = document.getElementById('price-filter');
const priceValue = document.getElementById('price-value');

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
    setupEventListeners();
    
    // Vérifier si on est sur la page de détail
    if (window.location.pathname.includes('product-detail.html')) {
        displayProductDetail();
    }
});

function setupEventListeners() {
    // Panier
    cartIcon.addEventListener('click', () => cartSidebar.style.display = 'block');
    closeCart.addEventListener('click', () => cartSidebar.style.display = 'none');
    
    // Authentification
    loginBtn.addEventListener('click', () => authModal.style.display = 'block');
    registerBtn.addEventListener('click', () => registerModal.style.display = 'block');
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        authModal.style.display = 'none';
        registerModal.style.display = 'block';
    });
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            authModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });
    
    // Filtres
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('input', () => {
        priceValue.textContent = `Jusqu'à ${priceFilter.value}€`;
        filterProducts();
    });
}

// Afficher les produits avec lien vers page de détail
function displayProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </a>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toFixed(2)} €</p>
                <button class="add-to-cart" data-id="${product.id}">Ajouter au panier</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// Filtrer les produits
function filterProducts() {
    const category = categoryFilter.value;
    const maxPrice = parseInt(priceFilter.value);
    
    const filtered = products.filter(product => {
        return (category === 'all' || product.category === category) && 
               product.price <= maxPrice;
    });
    
    productGrid.innerHTML = '';
    filtered.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </a>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toFixed(2)} €</p>
                <button class="add-to-cart" data-id="${product.id}">Ajouter au panier</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
    
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// Afficher le détail d'un produit (pour product-detail.html)
function displayProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.body.innerHTML = '<h2>Produit non trouvé</h2>';
        return;
    }
    
    document.body.innerHTML = `
        <header>
            <div class="logo">Ma Boutique</div>
            <nav>
                <ul>
                    <li><a href="index.html">Accueil</a></li>
                    <li><a href="index.html#products">Produits</a></li>
                </ul>
            </nav>
            <div class="cart-icon" id="cart-icon">🛒 <span id="cart-count">0</span></div>
        </header>
        
        <main class="product-detail-container">
            <a href="index.html" class="back-to-products">← Retour aux produits</a>
            <div class="product-detail">
                <div class="product-detail-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-detail-info">
                    <h1>${product.name}</h1>
                    <p class="product-detail-price">${product.price.toFixed(2)} €</p>
                    <p class="product-detail-description">${product.description}</p>
                    <button class="add-to-cart" data-id="${product.id}">Ajouter au panier</button>
                </div>
            </div>
        </main>
        
        <footer>
            <p>&copy; 2023 Ma Boutique en Ligne. Tous droits réservés.</p>
        </footer>
        
        <script src="script.js"></script>
    `;
    
    // Réattacher les événements
    document.querySelector('.add-to-cart')?.addEventListener('click', addToCart);
    document.getElementById('cart-icon')?.addEventListener('click', () => {
        // Implémentez un panier modal pour la page de détail si besoin
    });
}

// ... (conservez les autres fonctions: addToCart, updateCart, removeFromCart) ...