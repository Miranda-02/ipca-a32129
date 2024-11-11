document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.closest('.item');
            const productName = productItem.querySelector('.product-name').textContent;
            const productPrice = parseFloat(productItem.querySelector('.product-price').textContent.replace('€', ''));

            addItemToCart(productName, productPrice);
        });
    });

    function addItemToCart(name, price) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push({ name, price });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert(`${name} foi adicionado ao carrinho!`);
        loadCartItems();
    }

    function removeItemFromCart(index) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        loadCartItems();
    }

    function loadCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartItemsList = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');
        let totalPrice = 0;

        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('li');
            //"Se eu quiser posso fazer deste maneira tbm para o cliente ver o preço" ${item.name} - ${item.price.toFixed(2)}€
            cartItem.innerHTML = `
                ${item.name}
                <button class="remove-button" data-index="${index}">Remover</button>
            `;
            cartItemsList.appendChild(cartItem);
            totalPrice += item.price;
        });

        totalPriceElement.textContent = `${totalPrice.toFixed(2)}€`;

        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                removeItemFromCart(index);
            });
        });
    }

    loadCartItems();

    const finalizePurchaseButton = document.getElementById('finalize-purchase');
    if (finalizePurchaseButton) {
        finalizePurchaseButton.addEventListener('click', () => {
            alert('Compra finalizada!');
            localStorage.removeItem('cartItems');
            loadCartItems();
        });
    }
});
