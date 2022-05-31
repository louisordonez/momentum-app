// Time Clock
const clockElement = document.querySelector('[data-clock]')
const greetingElement = document.querySelector('[data-greeting]')
const backgroundImg = document.querySelector('body')

const showTime = () => {
  let date = new Date()
  let currentTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  let currentHours = date.getHours()
  let currentMinutes = date.getMinutes()
  let currentMilitaryTime = `${currentHours}${currentMinutes}`

  currentTime = currentTime.replace('AM', '').replace('PM', '')
  clockElement.textContent = currentTime

  setGreeting(currentMilitaryTime)
}

const goodMorningGreeting = 'Good morning,'
const goodAfternoonGreeting = 'Good afternoon, '
const goodEveningGreeting = 'Good evening, '

const setGreeting = (time) => {
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

const bgEarlyMorning = `url('./assets/img/bg-early-morning.png')`
const bgLateMorning = `url('./assets/img/bg-late-morning.png')`
const bgEarlyAfternoon = `url('./assets/img/bg-early-afternoon.png')`
const bgLateAfternoon = `url('./assets/img/bg-late-afternoon.png')`
const bgEvening = `url('./assets/img/bg-evening.png')`

const setBackground = (time) => {
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
  } else if (time > '1659' && time < '1800') {
    // 05:00 PM - 05:59 PM
    backgroundImg.style.backgroundImage = bgLateAfternoon
  } else if (time > '1759' && time < '2400') {
    // 06:00 PM - 11:59 PM
    backgroundImg.style.backgroundImage = bgEvening
  }
}

setInterval(showTime, 1000)

// Focus
const focusQuestion = document.querySelector('div.focus span')
const focusTodayHeader = document.querySelector('[data-focus-today-header]')
const focusInput = document.querySelector('div.focus-input input[type=text')
const focusInputText = document.querySelector('div.focus-input span')
const focusRemoveButton = document.querySelector('div.focus-input button')
const focusLocalStorageKey = 'focusInputText'

getLocalStorageItem(focusLocalStorageKey)

focusInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    let focusInputValue = focusInput.value
    localStorage.setItem(focusLocalStorageKey, focusInputValue)
    getLocalStorageItem(focusLocalStorageKey)
  }
})

focusRemoveButton.addEventListener('click', () => {
  localStorage.removeItem(focusLocalStorageKey)
  focusElementsToggle()
  focusInput.value = ''
})

function getLocalStorageItem(key) {
  let focusInputTextItem = localStorage.getItem(key)
  if (focusInputTextItem !== null) {
    focusElementsToggle()
    focusInputText.textContent = focusInputTextItem
  }
}

const focusElementsToggle = () => {
  focusQuestion.classList.toggle('hide')
  focusInput.classList.toggle('hide')
  focusTodayHeader.classList.toggle('hide')
  focusInputText.classList.toggle('hide')
  focusRemoveButton.classList.toggle('hide')
}

// Show Menus
const settingsMenu = document.querySelector('[data-settings-menu]')
const settingsButton = document.querySelector('div.settings button')
const todoMenu = document.querySelector('[data-todo-menu]')
const todoButton = document.querySelector('div.todo button')

settingsButton.addEventListener('click', () =>
  showMenu(settingsMenu, settingsButton)
)

todoButton.addEventListener('click', () => showMenu(todoMenu, todoButton))

const showMenu = (menu, button) => {
  addAnimation(menu)
  menu.classList.toggle('show')
  button.classList.toggle('active-btn')

  disableButton(button)
}

const disableButton = (button) => {
  button === todoButton
    ? settingsButton.toggleAttribute('disabled')
    : todoButton.toggleAttribute('disabled')
}

// Transitions and Animations
const addBackgroundTransition = (element) => {
  element.classList.add('fade-bg')
}

const addAnimation = (element) => {
  element.classList.add('fade-animation')
}
