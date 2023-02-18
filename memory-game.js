// Generate cards for game board

let gameBoard = document.querySelector(".cards-container");

// Possible pairs
let cards = [
  [
    { name: 'elephant', content: "<h2>فيل (فيلة)</h2>" },
    { name: 'elephant', image: "./images/elephant.jpg" }
  ],
  [
    { name: 'giraffe', content: "<h2>زرافة (-ات)</h2>" },
    { name: 'giraffe', image: "./images/giraffe.jpg" }
  ],
  [
    { name: 'monkey', content: "<h2>قرد (قرود)</h2>" },
    { name: 'monkey', image: './images/monkey.jpg' }
  ],
  [
    { name: 'cat', content: '<h2>قطة (قطط)</h2>' },
    { name: 'cat', image: './images/cat.jpg' }
  ],
  [
    { name: 'dog', content: '<h2>كلب (كلاب)</h2>' },
    { name: 'dog', image: './images/dog.jpg' }
  ],
  [
    { name: 'bird', content: '<h2>عصفور (عصافير)</h2>' },
    { name: 'bird', image: './images/bird.jpg' }
  ],
  [
    { name: 'ant', content: '<h2>نملة (نمل)</h2>' },
    { name: 'ant', image: './images/ant.jpg' }
  ],
  [
    { name: 'turtle', content: '<h2>سلحفاة (سلاحف)</h2>' },
    { name: 'turtle', image: './images/turtle.jpg' }
  ],
  [
    { name: 'lizard', content: '<h2>سحلية (سحالي)</h2>' },
    { name: 'lizard', image: './images/lizard.jpg' }
  ],
  [
    { name: 'horse', content: '<h2>خيل (خيول)</h2>' },
    { name: 'horse', image: './images/horse.jpg' }
  ]
];

// Select 10 pairs and shuffle them

function selectPairs(pairArray) {
  let resultArray = [];
  for (let i = 0; i < 10; i++) {
    for (let x = 0; x < pairArray[i].length; x++) {
      resultArray.push(pairArray[i][x]);
    }
  }
  return resultArray;
}

let currentDeck = selectPairs(cards);

// Shuffle function

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

let currentDeckShuffled = shuffle(currentDeck);

// -- Generate divs according to difficulty parameters
const normalWidth = 900 + 'px';
const normalHeight = 725 + 'px';

function initializeCardGrid(gridSizeRows, gridSizeCols) {
  for (let i = 0; i < gridSizeRows * gridSizeCols; i++) {
    let memoryCardContainer = document.createElement('div');
    let cardWrapper = document.createElement('div');
    let cardFront = document.createElement('div');
    let cardBack = document.createElement('div');
    memoryCardContainer.classList.add('memory-card-container');
    cardWrapper.classList.add('card-wrapper');
    cardBack.classList.add('card-back');
    cardFront.classList.add('card-front');
    cardWrapper.appendChild(cardFront);
    cardWrapper.appendChild(cardBack);
    memoryCardContainer.appendChild(cardWrapper);
    cardWrapper.dataset.animal = currentDeckShuffled[i].name;
    gameBoard.appendChild(memoryCardContainer);
    if (i < currentDeckShuffled.length) {
      if (currentDeckShuffled[i].content) {
        cardBack.innerHTML = currentDeckShuffled[i].content;
      } else {
        let image = document.createElement("img");
        image.src = currentDeckShuffled[i].image;
        image.classList.add('image-card');
        cardBack.appendChild(image);
      }
    }
  }
}

// Flip and check functions

let firstCard, secondCard;
let hasFlippedCard = false;
let score = 0;
let lockBoard = false;


function flipCard() {
  if (lockBoard) {
    return;
  };
  if (this === firstCard) {
    return;
  };
  this.classList.add('flipped');
  if (!hasFlippedCard) {
    firstCard = this;
    hasFlippedCard = true;
    return;
  }

  secondCard = this;
  checkForMatch();
  hasFlippedCard = false;
}

// Checking for match

function checkForMatch() {
  lockBoard = true;
  if (firstCard.dataset.animal === secondCard.dataset.animal) {
    score++;
    disableMatches();
    updateScore();
  } else {
    resetCards();
  }
}

// Disabling matched cards

function disableMatches() {
  setTimeout(() => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
  }, 1200);
}

// Reset Cards

function resetCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1200);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  hasFlippedCard = false;
}

// Scoring + timer
currentScore = document.querySelector('#current-score');

function updateScore() {
  currentScore.textContent = `Score: ${score}/10`
}

function resetScore() {
  score = 0;
  updateScore();
}

// Initialize Game

let gameStarted = false;

function startGame() {
  if (!gameStarted) {
    placeholderText.style.display = 'none';
    gameStarted = true;
    initializeCardGrid(4, 5);
    let allCards = document.querySelectorAll('.card-wrapper');
    allCards.forEach(card => card.addEventListener('click', flipCard));
    createStopButton();
    return;
  }
}

function createStopButton() {
  buttonTitle.textContent = 'Stop Game';
  startButton.style.backgroundColor = '#FC4A24';
  startButton.removeEventListener('click', startGame);
  startButton.addEventListener('click', stopGame);
}

function createStartButton() {
  buttonTitle.textContent = 'Start Game';
  startButton.style.backgroundColor = '#40CE0B';
  startButton.removeEventListener('click', stopGame);
  startButton.addEventListener('click', startGame)
}

function stopGame() {
  let allBoardElements = document.querySelectorAll('.memory-card-container');
  for (let card of allBoardElements) {
    card.parentNode.removeChild(card);
  }
  reShuffleCards();
  createStartButton();
  resetScore();
  placeholderText.style.display = ''
  gameStarted = false;
}

function reShuffleCards() {
  currentDeck = selectPairs(cards);
  currentDeckShuffled = shuffle(currentDeck);
}

// Placeholder text on start

let placeholderText = document.querySelector('#placeholder-text');

// -- Start button: this should populate each card with the pairs
startButton = document.querySelector('.start-button');
startButton.addEventListener('click', startGame);
buttonTitle = document.querySelector('.button-title')



