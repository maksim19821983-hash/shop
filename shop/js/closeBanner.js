


const banner = document.getElementById('discountBanner');
  const closeButton = banner?.querySelector('.close-btn');
export function closeBanner() {
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      banner.classList.add("discount--close");
    });
  }
}


