'use strict';

// selecting elements
const score1El = document.getElementById('score--0');
const score2El = document.getElementById('score--1');
const image = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const namePl0 = document.querySelector('#name--0');
const namePl1 = document.querySelector('#name--1');
let saveScore = 0;
let activePlayer = 0;
const arraySavePoint = [0, 0];
let chekcExistWinner = false;
//setting the element
score1El.textContent = 0;
score2El.textContent = 0;
image.classList.add('hidden');

const changePlayer = function () {
  saveScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};

const setCurrScoreTo0 = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
};

const resetAll = function () {
  score1El.textContent = 0;
  score2El.textContent = 0;
  chekcExistWinner = false;
  arraySavePoint[0] = 0;
  arraySavePoint[1] = 0;
  saveScore = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  namePl0.textContent = 'PLAYER 1';
  namePl1.textContent = 'PLAYER 2';
  image.classList.add('hidden');
  document.querySelector(`.player--${activePlayer}`).style.backgroundColor =
    '#17d3dd';
  activePlayer = 0;
};

//rolling function
roll.addEventListener('click', function () {
  // random num
  const randomNum = Math.trunc(Math.random() * 6) + 1;
  // remove hidden of dice
  // display it correct with random

  image.src = `dice-${randomNum}.png`;
  if (arraySavePoint[activePlayer] >= 20 || chekcExistWinner === true) {
    chekcExistWinner = true;
  } else if (randomNum !== 1) {
    image.classList.remove('hidden');
    saveScore += randomNum;
    document.getElementById(`current--${activePlayer}`).textContent = saveScore;
  } else {
    image.classList.remove('hidden');

    // change player when they dice  = 1
    setCurrScoreTo0();

    changePlayer();
  }
});

//hold button
// how to take current score to global score
// when we stop do it
// when we press hold button how we change player
// we also need to chekcExistWinner whether is there any player reah over 100 point
hold.addEventListener('click', function () {
  // take current score and plus it with score
  if (chekcExistWinner === false) {
    // add score
    arraySavePoint[activePlayer] += saveScore;
    // change the text
    document.getElementById(`score--${activePlayer}`).textContent =
      arraySavePoint[activePlayer];
    // update score to real score
    setCurrScoreTo0();
    // chekcExistWinner is there any one won
    if (arraySavePoint[activePlayer] >= 20) {
      image.classList.add('hidden');
      chekcExistWinner = true;
      document.querySelector(`.player--${activePlayer}`).style.backgroundColor =
        '#fb0000';

      document.querySelector(`#name--${activePlayer}`).textContent =
        'Winner winner chicken dinner';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      return;
    }
    // change active winner
    if (chekcExistWinner === false) {
      changePlayer();
    }
  }
});

newGame.addEventListener('click', resetAll);
