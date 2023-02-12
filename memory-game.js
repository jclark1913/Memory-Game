// Generate cards for game board

let cardsContainer = document.querySelector(".cards-container")

// -- Generate divs according to difficulty parameters
const normalWidth = 900 + 'px';
const normalHeight = 725 + 'px';

function initializeCardGrid(gridSizeRows, gridSizeCols) {
  for (let i = 0; i < gridSizeRows * gridSizeCols; i++) {
    let memoryCard = document.createElement('div');
    memoryCard.classList.add('memory-card');
    cardsContainer.appendChild(memoryCard);
    cardsContainer.style.maxWidth = normalWidth;
    cardsContainer.style.maxHeight = normalHeight;
  }
}

initializeCardGrid(4, 5);

// Game initialization

// -- Start button: this should populate each card with the pairs

