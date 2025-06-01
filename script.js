// Données des produits
const products = [
    {
        id: 1,
        name: "T-shirt Blanc",
        price: 19.99,
        image: "https://via.placeholder.com/300x200?text=T-shirt+Blanc"
    },
    {
        id: 2,
        name: "Jean Slim Noir",
        price: 49.99,
        image: "https://via.placeholder.com/300x200?text=Jean+Slim+Noir"
    },
    {
        id: 3,
        name: "Chaussures de Sport",
        price: 79.99,
        image: "https://via.placeholder.com/300x200?text=Chaussures+Sport"
    },
    {
        id: 4,
        name: "Veste en Cuir",
        price: 129.99,
        image: "https://via.placeholder.com/300x200?text=Veste+Cuir"
    },
    {
        id: 5,
        name: "Montre Classique",
        price: 89.99,
        image: "https://via.placeholder.com/300x200?text=Montre+Classique"
    },
    {
        id: 6,
        name: "Sac à Dos",
        price: 39.99,
        image: "https://via.placeholder.com/300x200?text=Sac+à+Dos"
    }
];

// Panier
let cart = [];

// Éléments DOM
const productGrid = document.getElementById('product-grid');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');

// Afficher les produits
function displayProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toFixed(2)} €</p>
                <button class="add-to-cart" data-id="${product.id}">Ajouter au panier</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Ajouter les événements aux boutons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Ajouter au panier
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Vérifier si le produit est déjà dans le panier
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    updateCart();
}

// Mettre à jour le panier
function updateCart() {
    // Mettre à jour le compteur
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Mettre à jour la sidebar du panier
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">${item.name}</div>
                <div class="cart-item-quantity">${item.quantity}</div>
                <div class="cart-item-price">${(item.price * item.quantity).toFixed(2)} €</div>
                <span class="cart-item-remove" data-id="${item.id}">×</span>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Ajouter les événements aux boutons de suppression
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }
    
    // Mettre à jour le total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Supprimer du panier
function removeFromCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Événements
cartIcon.addEventListener('click', () => {
    cartSidebar.style.display = 'block';
});

closeCart.addEventListener('click', () => {
    cartSidebar.style.display = 'none';
});

// Initialisation
displayProducts();
updateCart();