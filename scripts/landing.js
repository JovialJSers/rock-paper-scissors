// Globals Variables
const buttonContainer = document.getElementById('button-container');
buttonContainer.addEventListener('click', function (event) {
  let gameMode = event.target.id;
  localStorage.setItem('game-mode', gameMode);
  location.href = 'pages/characters.html';
});
