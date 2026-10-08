import { closeBanner } from './closeBanner.js';
import { initBurger } from './burger.js';
import { initCart } from './cart.js';
import { initShowMore } from './more--clothes.js';

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    closeBanner();
    initBurger();
    initCart();
    initShowMore();
});