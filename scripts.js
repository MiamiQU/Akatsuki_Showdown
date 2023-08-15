// Select all cards
const cards = document.querySelectorAll('.memory-card');

//Variables
const player1 = {
  score: 0,
  name: 'Player 1'
}

const player2 = {
  score: 0,
  name: 'Player 2'
}

//default player turn on game start
let currentPlayer = player1

//Dom references for score and prompt
const player1ScoreElement = document.getElementById('player1-score')
const player2ScoreElement = document.getElementById('player2-score')
const currentPlayerPrompt = document.getElementById('player-prompt')


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
  // Flip card
  this.flipped = true;


// Prevent clicks if board locked
if (lockBoard) return;
// Prevent selecting same first card twice
if (this === firstCard) return;

// Match Logic

// Flip card visibility
this.classList.add('flip');

// Add animation class
this.classList.add('flip-animation'); 

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

// Card object
const card = {
  name: 'card1',
  flipped: false
};

// Flip card
card.flipped = true; 

// Unflip
card.flipped = false;


// Compare cards data attribute
// Trigger match or no match functions
function checkForMatch() {
let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

 //match found
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
      console.log('matched')


// If match found
isMatch ? disableCards() : unflipCards();
}
firstCard.flipped = false;
secondCard.flipped = false; 



// Disable matched cards
// Increment score
if (currentPlayer === player1) {
  player1.score++;
} else {
  player2.score++; 
}

// Update DOM
player1ScoreElement.textContent = player1.score;
player2ScoreElement.textContent = player2.score;

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

//Game logic

//switch player logic
function switchPlayer(){
  currentPlayer = (currentPlayer === player1) ? player2: player1
  const saying = getRandomPrompt(currentPlayer.name);
  currentPlayerPrompt.textContent = saying; 
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
}

// Restart Game
function restartGame() {
  initCards();
}
