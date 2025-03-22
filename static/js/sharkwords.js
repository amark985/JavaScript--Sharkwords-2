const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let correctGuesses = 0;

// For now, we'll hardcode the word that the user has to guess
const word = WORDS[Math.floor(Math.random() * WORDS.length)];

// Loop over the chars in `word` and create divs.
function createDivsForChars() {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
}

// Loop over each letter in `ALPHABET` and generate buttons.
function generateLetterButtons() {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
}

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
function disableLetterButton(buttonEl) {
  buttonEl.disabled = true;
}

// Return `true` if `letter` is in the word.
function isLetterInWord(letter) {
  return word.includes(letter);
}

/*
 **********  END CODE FROM PREVIOUS LAB  **************
 *************  NEW CODE STARTS HERE  *****************
 */

// Called when `letter` is in word. Update contents of divs with `letter`.
function handleCorrectGuess(letter) {

  correctGuesses += 1;

  const letterDivs = document.querySelectorAll(`.${letter}`);

  for (const div of letterDivs) {
    div.insertAdjacentHTML('beforeend', `${letter}`);
  }

  let isWon = isWinner();

  if (isWon) {
    let playAgainMessage = document.querySelector('#play-again');
    playAgainMessage.innerHTML = 'You won! Click here to play again'
    playAgainMessage.style.display = '';
  }
}
function isWinner() {
  let letterBoxes = document.querySelectorAll('.letter-box');
  let countEmpty = 0;
  for (const box of letterBoxes) {
    if (box.innerHTML === ''){
      countEmpty += 1;
      return false;
    }
  }
  return true;
}
//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.
function handleWrongGuess() {
  numWrong += 1;
  let sharkPhoto = document.querySelector('#shark-img');
  sharkPhoto.src = `/static/images/guess${numWrong}.png`;

  if (numWrong >= 5) {
    let playAgainMessage = document.querySelector('#play-again');
    playAgainMessage.style.display = '';
  }
}

// Reset game state. Called before restarting the game.
function resetGame() {
  window.location = '/sharkwords';
}

// Function that should be called when a letter button is clicked.
function handleButtonClick(evt) {
  // get the button that was clicked using the event target
  let clickedBtn = evt.target;

  // get the letter inside the button that was clicked
  let innerLetterValue = clickedBtn.innerHTML;
  // you should then check if the letter is in the word
  let letterInWordBoolean = isLetterInWord(innerLetterValue);

  // if it is, call `handleCorrectGuess`
  if(letterInWordBoolean) {
    handleCorrectGuess(innerLetterValue);
  } else {// if it is not, call `handleWrongGuess`
    handleWrongGuess();
  }
  
  // finally, disable the button so the letter can't be clicked again
  disableLetterButton(clickedBtn);
}

// This function is called to start the game.
function startGame() {
  createDivsForChars();
  generateLetterButtons();

  // This selects all buttons in the #letter-buttons section
  const buttons = document.querySelectorAll('#letter-buttons button');

  for (const button of buttons) {
    // add an event handler that calls the buttonClicked function when a button is clicked
    button.addEventListener('click', handleButtonClick)


  }

  // add an event handler to handle clicking on the Play Again button
  let playAgainLink = document.querySelector('#play-again');
  playAgainLink.addEventListener('click', resetGame);
}

startGame(); // Call startGame() when the page loads.
