// Select all cards
const cards = document.querySelectorAll('.memory-card');

// Player objects
const player1 = {
  name: 'Player 1',
  score: 0 
};

const player2 = {
  name: 'Player 2',
  score: 0
};

// Starting player
let currentPlayer = player1;

// DOM elements
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');

// Track card state
let firstCard;
let secondCard;
let hasFlippedCard = false;
let lockBoard = false; 

// Handle card click
function flipCard() {

  // Add flip class
  this.classList.add('flip');
  console.log('Card flipped!');

  // First card logic  
  if(!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Set second card
  secondCard = this;
  
  // Check match
  checkForMatch(secondCard);

}

// Check for match
function checkForMatch(secondCard) {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  console.log('Checking for match...');

  isMatch ? disableCards() : unflipCards();
}

// Handle match
function disableCards() {

  // Increment score
  currentPlayer.score++;
  console.log(currentPlayer.name, 'score increased!');

  // Update DOM
  player1ScoreElement.textContent = player1.score;
  player2ScoreElement.textContent = player2.score;
  
  // Reset board
  resetBoard();
}

// Handle no match
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

// Reset board 
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  console.log('Board reset!'); 
}

// Attach event listener
cards.forEach(card => card.addEventListener('click', flipCard));