import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval;  // Variable to store the interval

// Loading Function
function loader(element) {
  element.textContent = '' // empty at start
  
  loadInterval = setInterval(() => {
    element.textContent += '.'

    if (element.textContent === '....') {
      element.textContent = ''
    }
  }, 300);
}

// Typing Function
function typeText(element, text) {
  let index = 0

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.chartAt(index) // will get character at specific index
      index++
    }
    else {
      clearInterval(interval) // will stop the setInterval function
    }
  }, 20);
}

// Unique ID Funtion
function generateUniqueId() {
  const timestamp = Date.now()
  const randomNumber = Math.random()
  const hexadecimalString = randomNumber.toString(16)

  return `id-${timestamp}-${hexadecimalString}`
}