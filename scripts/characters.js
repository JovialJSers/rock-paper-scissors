// global variables
const gameMode = localStorage.getItem('game-mode');
const characterContainer = document.getElementById('character-container');
let charactersSelected = 0;

characterContainer.addEventListener('click', function (event) {
  let characterDiv = event.target;
  let characterDivClassArray = Array.from(characterDiv.classList);

  if (characterDivClassArray.includes('character')) {
    let characterDivStyles = getComputedStyle(characterDiv);
    let characterImgUrl = characterDivStyles.backgroundImage.slice(4, -1);

    if (charactersSelected === 1) {
      localStorage.setItem('player-two-image-url', characterImgUrl);
      location.href = './game.html';
      return;
    }

    localStorage.setItem('player-one-image-url', characterImgUrl);
    charactersSelected++

    if (gameMode === 'pvc') {
      let characters = document.querySelectorAll('.character');
      let characterCount = characters.length;

      let randomCharacterIdx = Math.floor(Math.random() * characterCount);
      let randomCharacterDiv = characters[randomCharacterIdx];

      let randomCharacterDivStyles = getComputedStyle(randomCharacterDiv);
      let randomCharacterImgUrl =
        randomCharacterDivStyles.backgroundImage.slice(4, -1);

      localStorage.setItem('player-two-image-url', randomCharacterImgUrl);
      location.href = './game.html';
      return;
    }
    let heading = document.querySelector('h1');
    heading.innerText = "Player Two Select Your Hero";
  }
});

localStorage.setItem('player-one-score', 0);
localStorage.setItem('player-two-score', 0);