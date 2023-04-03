// global variables
const gameMode = localStorage.getItem('game-mode');

const backgroundImageUrls = [
  '../../assets/img/backgroundForest.png',
  '../../assets/img/backgroundCastles.png',
  '../../assets/img/backgroundColorDesert.png',
  '../../assets/img/backgroundDesert.png',
  '../../assets/img/backgroundEmpty.png',
];
const handUrls = [
  'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/270a.svg',
  'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/270b.svg',
  'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/270c.svg',
];

const playerOneScoreDisplay = document.querySelectorAll('.score')[0];
const playerTwoScoreDisplay = document.querySelectorAll('.score')[1];

const secondsDisplay = document.getElementById('seconds');

const choices = ['rock', 'paper', 'scissors'];

let playerOneChoice = 'rock';
let playerTwoChoice = 'rock';

const p1Hand = document.getElementById('hand-one');
const p2Hand = document.getElementById('hand-two');

// set random background
let randomBackgroundIdx = Math.floor(
  Math.random() * backgroundImageUrls.length
);
let randomBackgroundUrl = backgroundImageUrls[randomBackgroundIdx];

document.body.style.backgroundImage = `url(${randomBackgroundUrl})`;

// remove player two keys if player vs computer was chosen
if (gameMode === 'pvc') {
  document.getElementById('player-two-keys').remove();
}

// set hero images to selected characters
let heroImage1 = document.getElementById('hero-img1');
let heroImage2 = document.getElementById('hero-img2');

let heroScore1 = parseInt(localStorage.getItem('player-one-score'));
let heroScore2 = parseInt(localStorage.getItem('player-two-score'));

let image1Url = localStorage.getItem('player-one-image-url');
let image2Url = localStorage.getItem('player-two-image-url');

heroImage1.style.backgroundImage = `url(${image1Url})`;
heroImage2.style.backgroundImage = `url(${image2Url})`;

playerOneScoreDisplay.innerText = heroScore1;
playerTwoScoreDisplay.innerText = heroScore2;

// countdown timer
function startTimer() {
  secondsDisplay.innerText = '';

  playerOneChoice = 'rock';
  playerTwoChoice = 'rock';

  updateHand(p1Hand, playerOneChoice);
  updateHand(p2Hand, playerTwoChoice);

  p1Hand.classList.toggle('animate-hand-one');
  p2Hand.classList.toggle('animate-hand-two');

  let timeLeft = 3;
  let timer = setInterval(function () {
    if (timeLeft === 0) {
      secondsDisplay.innerText = '';
      p1Hand.classList.toggle('animate-hand-one');
      p2Hand.classList.toggle('animate-hand-two');
      endGame(playerOneChoice, playerTwoChoice);
      clearInterval(timer);
      return;
    }
    if (gameMode === 'pvc') {
      let randomChoiceIdx = Math.floor(Math.random() * choices.length);
      playerTwoChoice = choices[randomChoiceIdx];
    }
    secondsDisplay.innerText = timeLeft;
    timeLeft--;
  }, 1000);
}

// event listener for starting game
function startGame(e) {
  if (e.key === ' ') {
    document.removeEventListener('keydown', startGame);
    document.addEventListener('keydown', changePlayerOption);
    startTimer();
  }
}

// redraw hand 1

function updateHand(hand, choice) {
  if (choice === 'rock') {
    let rockUrl = handUrls[0];
    hand.style.backgroundImage = `url(${rockUrl})`;
    hand.style.backgroundSize = '80%';
  }

  if (choice === 'scissors') {
    let scissorsUrl = handUrls[2];
    hand.style.backgroundImage = `url(${scissorsUrl})`;
    hand.style.backgroundSize = '100%';
  }

  if (choice === 'paper') {
    let paperUrl = handUrls[1];
    hand.style.backgroundImage = `url(${paperUrl})`;
    hand.style.backgroundSize = '100%';
  }
}

function endGame(playerOneChoice, playerTwoChoice) {
  updateHand(p1Hand, playerOneChoice);
  updateHand(p2Hand, playerTwoChoice);

  let winnerIsPlayerOne = false;

  if (playerOneChoice === playerTwoChoice) {
    secondsDisplay.innerText = 'Draw';
  } else {

    if (playerOneChoice === 'rock' && playerTwoChoice === 'scissors')
      winnerIsPlayerOne = true;

    if (playerOneChoice === 'paper' && playerTwoChoice === 'rock')
      winnerIsPlayerOne = true;

    if (playerOneChoice === 'scissors' && playerTwoChoice === 'paper')
      winnerIsPlayerOne = true;

    let playerOneScore = parseInt(playerOneScoreDisplay.innerText);
    let playerTwoScore = parseInt(playerTwoScoreDisplay.innerText);

    if (winnerIsPlayerOne) {
      secondsDisplay.innerText = 'Player 1 Wins';
      playerOneScore++;
      playerOneScoreDisplay.innerText = playerOneScore;
      localStorage.setItem('player-one-score', playerOneScore);
    } else  {
      secondsDisplay.innerText = 'Player 2 Wins';
      playerTwoScore++;
      playerTwoScoreDisplay.innerText = playerTwoScore;
      localStorage.setItem('player-two-score', playerTwoScore);
    }
  }
  document.addEventListener('keydown', startGame);
}
// event listener for player choices

function changePlayerOption(e) {
  if (gameMode === 'pvp') {
    switch (e.key) {
      case 'a':
        playerOneChoice = 'rock';
        break;

      case 's':
        playerOneChoice = 'paper';
        break;

      case 'd':
        playerOneChoice = 'scissors';
        break;

      case 'j':
        playerTwoChoice = 'rock';
        break;

      case 'k':
        playerTwoChoice = 'paper';
        break;

      case 'l':
        playerTwoChoice = 'scissors';
        break;

      default:
        break;
    }
  }

  if (gameMode === 'pvc') {
    switch (e.key) {
      case 'a':
        playerOneChoice = 'rock';
        break;

      case 's':
        playerOneChoice = 'paper';
        break;

      case 'd':
        playerOneChoice = 'scissors';
        break;

      default:
        break;
    }
  }
}

document.addEventListener('keydown', startGame);
