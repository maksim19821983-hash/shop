export function initBurger() {
    
    const burgerBtn = document.querySelector('.header__burger');
    const headerNav = document.getElementById('header__nav');
    const body = document.body;

    function toggleScroll(isOpen) {
        const val = isOpen ? 'hidden' : '';
        body.style.overflow = val;
        document.documentElement.style.overflow = val; 
    }

    burgerBtn.addEventListener('click', () => {
        headerNav.classList.toggle('header__nav--open');
        burgerBtn.classList.toggle('burger--open');
        toggleScroll(headerNav.classList.contains('header__nav--open'));
    });

    const navLinks = headerNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('burger--open');
            headerNav.classList.remove('header__nav--open');
            toggleScroll(false);
        });
    });

    document.addEventListener('click', (e) => {
        if (
            headerNav.classList.contains('header__nav--open') &&
            !headerNav.contains(e.target) &&
            !burgerBtn.contains(e.target)
        ) {
            burgerBtn.classList.remove('burger--open');
            headerNav.classList.remove('header__nav--open');
            toggleScroll(false);
        }
    });
}