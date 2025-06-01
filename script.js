// Dans la fonction displayProductDetail()
function displayProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.body.innerHTML = '<h2>Produit non trouvé</h2>';
        return;
    }
    
    // Remplir les informations du produit
    document.getElementById('product-detail-img').src = product.image;
    document.getElementById('product-detail-title').textContent = product.name;
    document.getElementById('product-detail-price').textContent = product.price.toFixed(2) + ' €';
    document.getElementById('product-detail-description').textContent = product.description;
    document.getElementById('product-full-description').textContent = product.description + ' Ce produit est fabriqué avec des matériaux de haute qualité pour une durabilité optimale.';
    document.getElementById('product-category').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('product-id').textContent = 'PROD-' + product.id.toString().padStart(3, '0');
    
    // Gestion des onglets
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab + '-tab').classList.add('active');
        });
    });
    
    // Ajout au panier
    document.getElementById('add-to-cart-detail').addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('product-quantity').value);
        const size = document.getElementById('product-size').value;
        const color = document.getElementById('product-color').value;
        
        const existingItem = cart.find(item => item.id === product.id && item.size === size && item.color === color);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity,
                size: size,
                color: color
            });
        }
        
        updateCart();
        alert('Produit ajouté au panier !');
    });
    
    // Initialiser le panier
    updateCart();
    
    // Gestion du panier latéral
    document.getElementById('cart-icon').addEventListener('click', () => {
        document.getElementById('cart-sidebar').classList.add('active');
    });
    
    document.getElementById('close-cart').addEventListener('click', () => {
        document.getElementById('cart-sidebar').classList.remove('active');
    });
}