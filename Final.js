const startBtn = document.querySelector('.start');
const character = document.querySelector('.character');
const game = document.querySelector('.game');


startBtn.addEventListener('click', runGame);

function runGame (){
game.addEventListener('mousemove', (e) => {
    startBtn.style.display = 'none';
    document.body.classList.add('hideCursor');
    const gameScreen = game.getBoundingClientRect();
    let mouseX = e.clientX - gameScreen.left;
    const charWidth = character.offsetWidth;
    mouseX = Math.max(0, Math.min(game.offsetWidth - charWidth, mouseX - charWidth / 2));
    character.style.left = `${mouseX}px`;
});
}
