const btnRoll = document.querySelector('.btn--roll')
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')
const diceImg = document.querySelector('.dice')

diceImg.style.display = 'none'

let currentScore = 0
let activePlayer = 0
let score = [0, 0]
let gameOver = true

// Winner elementlar
const winnerBox = document.getElementById("winner")
const winnerText = document.getElementById("winnerText")
const closeWinner = document.getElementById("closeWinner")

// Player almashtirish
const switchPlayer = () => {
  currentScore = 0
  document.getElementById(`current--${activePlayer}`).textContent = currentScore

  activePlayer = activePlayer === 0 ? 1 : 0

  document.querySelector('.player--0').classList.toggle('player--active')
  document.querySelector('.player--1').classList.toggle('player--active')
}

// Dice roll
btnRoll.addEventListener('click', () => {
  if (gameOver) {
    diceImg.style.display = 'block'

    const random = Math.floor(Math.random() * 6) + 1
    diceImg.src = `./dice-${random}.png`

    if (random !== 1) {
      currentScore += random
      document.getElementById(`current--${activePlayer}`).textContent = currentScore
    } else {
      switchPlayer()
    }
  }
})

// Hold
btnHold.addEventListener('click', () => {
  if (gameOver) {
    score[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer]

    if (score[activePlayer] >= 23) {
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
      gameOver = false

      // 🎉 Winner chiqadi
      winnerText.textContent = `🎉 Player ${activePlayer + 1} yutdi!`
      winnerBox.classList.remove("hidden")
    } else {
      switchPlayer()
    }
  }
})

// Winner yopish (OK tugma)
closeWinner.addEventListener("click", () => {
  winnerBox.classList.add("hidden")
})

// New game
btnNew.addEventListener('click', () => {
  currentScore = 0
  activePlayer = 0
  score = [0, 0]
  gameOver = true

  document.getElementById(`current--0`).textContent = 0
  document.getElementById(`current--1`).textContent = 0
  document.getElementById(`score--0`).textContent = 0
  document.getElementById(`score--1`).textContent = 0

  document.querySelector('.player--0').classList.remove('player--winner')
  document.querySelector('.player--1').classList.remove('player--winner')

  document.querySelector('.player--1').classList.remove('player--active')
  document.querySelector('.player--0').classList.add('player--active')

  // Winner yopiladi
  winnerBox.classList.add("hidden")

  diceImg.style.display = 'none'
})