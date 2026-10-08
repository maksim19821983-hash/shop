export function initCart() {
    
    let cart = [];
    try {
        const stored = localStorage.getItem('cart');
        if (stored) {
        cart = JSON.parse(stored).map(item => ({
            ...item,
            
        }));
        }
    } catch (e) {
        console.warn('⚠️ Ошибка чтения корзины:', e);
    }

    const cartBtn = document.getElementById('cart-btn');
    const dropdown = document.getElementById('cart-dropdown');
    const closeBtn = document.getElementById('close-cart');
    const cartItemsEl = document.getElementById('cart-items');
    const cartCountEl = document.getElementById('cart-count');
    const cartTotalEl = document.getElementById('cart-total');
    const addButtons = document.querySelectorAll('.add-to-cart');




    function save() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }


    function render() {
        cartItemsEl.innerHTML = '';
        let total = 0;
        let count = 0;

        if (cart.length === 0) {
        cartItemsEl.innerHTML = '<li class="cart-empty">Корзина пуста</li>';
        } else {
        cart.forEach(item => {
            total += item.price * item.qty;
            count += item.qty;

            const li = document.createElement('li');
            

            li.innerHTML = `
            <img src="${item.img || ''}" alt="${item.name}" class="cart-item-img" onerror="this.style.display='none'">
            <div class="cart-item-info">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">${item.price} ₽ × ${item.qty}</span>
            </div>
            <button type="button" class="cart-remove" data-id="${item.id}" title="Удалить">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            `;
            cartItemsEl.appendChild(li);
        });
        }

        cartCountEl.textContent = count;

        cartTotalEl.textContent = total.toLocaleString('ru-RU');
    }


    cartItemsEl.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.cart-remove');
        if (removeBtn) {
        e.stopPropagation();
        
        const id = removeBtn.dataset.id;
        cart = cart.filter(i => i.id !== id);
        save();
        render();
        }
    });


    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
        e.preventDefault();
        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: Number(btn.dataset.price),
            img: btn.dataset.img || ''
        };


        const existing = cart.find(i => i.id === product.id);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ ...product, qty: 1 });
        }

        save();
        render();

        const originalText = btn.textContent;
        btn.textContent = '✓ Добавлено';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1000);
        });
    });

    cartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    closeBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !cartBtn.contains(e.target)) {
        dropdown.classList.remove('active');
        }
    });

    render();
    }