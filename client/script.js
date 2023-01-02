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
      element.innerHTML += text.charAt(index) // will get character at specific index
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

// Function for displayig stripes
function chatStripe(isAi, value, uniqueId) {
  return (
    `
      <div class="wrapper ${isAi && 'ai'}">
        <div class="chat">
          <div class="profile">
            <img
              src=${isAi ? bot : user}
            />
          </div>
          <div class="message" id=${uniqueId}>${value}</div>
        </div>
      </div>
    `
  )
}


// Function to handle submit action

const handleSubmit = async (e) => {
  try {
    e.preventDefault() //to prevent reloading 
    const uniqueId = generateUniqueId()
    const data = new FormData(form)
  
    // user input
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'))
    form.reset()
  
    // bot response
    
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId)
  
    chatContainer.scrollTop = chatContainer.scrollHeight
  
    const messageDiv = document.getElementById(uniqueId)
  
    loader(messageDiv)

    const response = await fetch('https://acmgpt-nm4f.onrender.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: data.get('prompt')
      })
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = " "

    if(response.ok){
      const data = await response.json()
      const parseData = data.bot.trim()

      typeText(messageDiv, parseData)
    }
    else {
      const err = await response.text()
      messageDiv.innerHTML = "Something went wrong"
      alert(err)
    }
  } catch (error) {
    console.log(error)
  }

}

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e)
  }
})