export function initShowMore() {
const buttons = document.querySelectorAll('.article__button');
const blocks = document.querySelectorAll('.more--clothes');

buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
    const block = blocks[index];
    if (!block) return;
    block.classList.toggle('more--clothes--open');
    const textElement = btn.querySelector('.article__button-text');
    if (textElement) {
        if (block.classList.contains('more--clothes--open')) {
            textElement.textContent = 'Свернуть';
        } else {
            textElement.textContent = 'Посмотреть всё';
        }
        }

});
});
}