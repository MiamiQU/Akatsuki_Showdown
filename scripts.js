const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


// Card flip logic
function flipCard() {
if (lockBoard) return;
if (this === firstCard) return;


this.classList.add('flip');
if (!hasFlippedCard) {
hasFlippedCard = true;
firstCard = this;


return;
}


secondCard = this;
// Check if the two clicked cards match
checkForMatch();
}


// Checking for match
function checkForMatch() {
let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;


isMatch ? disableCards() : unflipCards();
}


function disableCards() {
firstCard.removeEventListener('click', flipCard);
secondCard.removeEventListener('click', flipCard);


// Reset the board
resetBoard();
}


function unflipCards() {
lockBoard = true;


setTimeout(() => {
firstCard.classList.remove('flip');
secondCard.classList.remove('flip');


// Reset the board
resetBoard();
}, 1500);
}


// Resetting the board
function resetBoard() {
[hasFlippedCard, lockBoard] = [false, false];
[firstCard, secondCard] = [null, null];
}


// Shuffling card order
(function shuffle() {
cards.forEach(card => {
let randomPos = Math.floor(Math.random() * 12);
card.style.order = randomPos;
});
})();


// Attach click handler
cards.forEach(card => card.addEventListener('click', flipCard));
