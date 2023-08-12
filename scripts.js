// Select all cards
const cards = document.querySelectorAll('.memory-card'); 

// Player scores
let score1 = 0;
let score2 = 0;

// First clicked card 
let isFirstCard = false;
let first, second;

// Prevent further clicks
let isBoardClosed = false; 

// Track current player turn
let player1Turn = true;

// Card flip state
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Handle card click 
// Add flip class, track selected card
function flipCard() {

  // Prevent clicks if board locked
  if (lockBoard) return;
  
  // Prevent selecting same first card twice
  if (this === firstCard) return;

  // Flip card visibility  
  this.classList.add('flip');
  
  // First clicked card
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    // Exit function
    return; 
  }

  // Assign second clicked card
  secondCard = this;
  
  // Check if cards match  
  checkForMatch();
}

// Compare cards data attribute 
// Trigger match or no match functions
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  // If match found
  isMatch ? disableCards() : unflipCards(); 
}

// Disable matched cards
// Increment score
// Reset board
function disableCards() {

  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Unflip mismatched cards 
// Lock board temporarily
function unflipCards() {

  // Lock board
  lockBoard = true; 
  
  // Timer to unflip  
  setTimeout(() => {
    
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    // Reset variables  
    resetBoard();

  }, 1500);
}

// Reset state 
function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;

  firstCard = null;
  secondCard = null;
}

// Shuffle card order randomly
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// Attach flip handler to each card
cards.forEach(card => card.addEventListener('click', flipCard));