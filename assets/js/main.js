// Time Clock
const clockElement = document.querySelector('[data-clock]')
const greetingElement = document.querySelector('[data-greeting]')
const backgroundImg = document.querySelector('body')

function showTime() {
  let currentDate = new Date()
  let currentTime = currentDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  let currentHours = currentDate.getHours()
  let currentMinutes = currentDate.getMinutes()
  let currentMilitaryTime = `${currentHours}${currentMinutes}`

  currentTime = currentTime.replace('AM', '').replace('PM', '')
  clockElement.textContent = currentTime

  setGreeting(currentMilitaryTime)
}

function setGreeting(time) {
  const goodMorningGreeting = `Good morning, `
  const goodAfternoonGreeting = `Good afternoon, `
  const goodEveningGreeting = `Good evening, `

  if (time < '1200') {
    // Until 11:59 AM
    greetingElement.textContent = goodMorningGreeting
  } else if (time > '1159' && time < '1800') {
    // 12:00 PM - 05:59 PM
    greetingElement.textContent = goodAfternoonGreeting
  } else if (time > '1759' && time < '2400') {
    // 06:00 PM - 11:59 PM
    greetingElement.textContent = goodEveningGreeting
  }

  setBackground(time)
}

function setBackground(time) {
  const bgEarlyMorning = `url('./assets/img/bg-early-morning.png')`
  const bgLateMorning = `url('./assets/img/bg-late-morning.png')`
  const bgEarlyAfternoon = `url('./assets/img/bg-early-afternoon.png')`
  const bgLateAfternoon = `url('./assets/img/bg-late-afternoon.png')`
  const bgEvening = `url('./assets/img/bg-evening.png')`

  addBackgroundTransition(backgroundImg)

  if (time < '0530') {
    // Until 05:29 AM
    backgroundImg.style.backgroundImage = bgEvening
  } else if (time > '0529' && time < '0630') {
    // 05:30 AM - 06:29 AM
    backgroundImg.style.backgroundImage = bgEarlyMorning
  } else if (time > '0629' && time < '1000') {
    // 6:30 AM - 09:59 AM
    backgroundImg.style.backgroundImage = bgLateMorning
  } else if (time > '0959' && time < '1700') {
    // 10:00 AM - 04:59 PM
    backgroundImg.style.backgroundImage = bgEarlyAfternoon
  } else if (time > '1659' && time < '1830') {
    // 05:00 PM - 06:29 PM
    backgroundImg.style.backgroundImage = bgLateAfternoon
  } else if (time > '1829' && time < '2400') {
    // 06:30 PM - 11:59 PM
    backgroundImg.style.backgroundImage = bgEvening
  }
}

setInterval(showTime, 1000)

// Show Menus
const settingsButton = document.querySelector('div.settings button')
const settingsMenu = document.querySelector('[data-settings-menu]')
const todoButton = document.querySelector('div.todo button')
const todoMenu = document.querySelector('[data-todo-menu]')

settingsButton.addEventListener('click', showSettingsMenu)
todoButton.addEventListener('click', showTodoMenu)

function showSettingsMenu() {
  addAnimation(settingsMenu)
  settingsMenu.classList.toggle('show')
  settingsButton.classList.toggle('active-btn')
}

function showTodoMenu() {
  addAnimation(todoMenu)
  todoMenu.classList.toggle('show')
  todoButton.classList.toggle('active-btn')
}

// Add Background Transition
function addBackgroundTransition(element) {
  element.classList.add('fade-bg')
}

// Add Animation
function addAnimation(element) {
  element.classList.add('fade-animation')
}
