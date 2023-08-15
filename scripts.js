// Select all cards
const cards = document.querySelectorAll('.memory-card');
console.log("Selecting all cards");

//Variables for players
const player1 = {
  score: 0,
  name: 'Player 1'
}

const player2 = {
  score: 0, 
  name: 'Player 2'
}
console.log("Created player objects");

// Default starting player 
let currentPlayer = player1;
console.log("Starting player is Player 1");

let playerTurn = 1; // start with player 1

// After each turn, switch players
function switchPlayer() {
  playerTurn = playerTurn === 1 ? 2 : 1; 
}


// DOM elements for score and prompt
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');
const currentPlayerPrompt = document.getElementById('player-prompt');
console.log("Got DOM elements");

// Track first clicked card
let firstCard;

// Prevent further clicks if board locked
let lockBoard = false; 

// Track if card flipped  
let hasFlippedCard = false;

// Handle card click
function flipCard() {
  // Pseudocode
  // - Check current player
  // - Update UI

  // Get current player
  const currentPlayer = getCurrentPlayer();

  // Log player
  console.log("Current player: ", currentPlayer);

  // Update UI
  updatePlayerUI(currentPlayer);
  
  // Flip card
  this.flipped = true;
  console.log("Flipped card");
  
  // Check for lock
  if (lockBoard) return;

  // Check first card
  if (this === firstCard) return;  

  // Add flip class
  this.classList.add('flip');
  console.log("Added flip class");

  // Set first card
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Check match
  checkForMatch(this);

}

// Check match
function checkForMatch(secondCard) {

  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();
  } else {  
    unflipCards();
  }

}

// Handle match
function disableCards() {

  // Increment score  
  if (currentPlayer === player1) {
    player1.score++;
  } else {
    player2.score++;
    switchPlayer();
  }

  // Update DOM
  player1ScoreElement.textContent = player1.score;
  player2ScoreElement.textContent = player2.score;
  
  // Reset board
  resetBoard();

}

// Unflip cards
function unflipCards() {

  // Lock board
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    
    resetBoard();

  }, 1500);
  switchPlayer();
}

// Reset board
function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
}

// Attach event listener
cards.forEach(card => card.addEventListener('click', flipCard));

// Restart game
function restartGame() {
  // Reset logic
}
