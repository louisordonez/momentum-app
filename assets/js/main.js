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

  if (time >= '0000' && time <= '1159') {
    greetingElement.textContent = goodMorningGreeting
  } else if (time >= '1200' && time <= '1759') {
    greetingElement.textContent = goodAfternoonGreeting
  } else if (time >= '1800' && time <= '2359') {
    greetingElement.textContent = goodEveningGreeting
  }

  setBackground(time)
}

function setBackground(time) {
  const bgEvening = `url('./assets/img/bg-evening.png')`
  const bgEarlyMorning = `url('./assets/img/bg-early-morning.png')`
  const bgLateMorning = `url('./assets/img/bg-late-morning.png')`
  const bgEarlyAfternoon = `url('./assets/img/bg-early-afternoon.png')`
  const bgLateAfternoon = `url('./assets/img/bg-late-afternoon.png')`

  addBackgroundTransition(backgroundImg)

  if (time >= '0000' && time <= '0459') {
    backgroundImg.style.backgroundImage = bgEvening
  } else if (time >= '0500' && time <= '0659') {
    backgroundImg.style.backgroundImage = bgEarlyMorning
  } else if (time >= '0700' && time <= '1059') {
    backgroundImg.style.backgroundImage = bgLateMorning
  } else if (time >= '1100' && time <= '1659') {
    backgroundImg.style.backgroundImage = bgEarlyAfternoon
  } else if (time >= '1700' && time <= '1859') {
    backgroundImg.style.backgroundImage = bgLateAfternoon
  } else if (time >= '1900' && time <= '2359') {
    backgroundImg.style.backgroundImage = bgEvening
  }
}

setInterval(showTime, 1000)

// Show menu
const settingsButton = document.querySelector('div.settings a')
const settingsMenu = document.querySelector('[data-settings-menu]')
const todoButton = document.querySelector('div.todo a')
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
