// Globals Variables
const buttonContainer = document.getElementById('button-container');
buttonContainer.addEventListener('click', function (event) {
  if (event.target.id === 'pvp') {
    localStorage.setItem('game-mode', 'pvp');
    location.href = '../pages/characters.html';
    return;
  }
  if (event.target.id === 'pvc') {
    localStorage.setItem('game-mode', 'pvc');
    location.href = '../pages/characters.html';
    return;
  }
});
