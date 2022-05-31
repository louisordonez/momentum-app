// Clock
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
  let currentMinutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  let currentMilitaryTime = `${currentHours}${currentMinutes}`

  currentTime = currentTime.replace('AM', '').replace('PM', '')
  clockElement.textContent = currentTime

  return currentMilitaryTime
}

const setGreeting = (time) => {
  const checkTimeGreeting = (time) => {
    if (time < '1200') {
      // Until 11:59 AM
      return 'Good morning,'
    } else if (time > '1159' && time < '1800') {
      // 12:00 PM - 05:59 PM
      return 'Good afternoon, '
    } else if (time > '1759' && time < '2400') {
      // 06:00 PM - 11:59 PM
      return 'Good evening, '
    }
  }

  greetingElement.textContent = checkTimeGreeting(time)
}

const setBackground = (time) => {
  const checkTimeBackground = (time) => {
    if (time < '0530') {
      // Until 05:29 AM
      return `url('./assets/img/bg-evening.png')`
    } else if (time > '0529' && time < '0630') {
      // 05:30 AM - 06:29 AM
      return `url('./assets/img/bg-early-morning.png')`
    } else if (time > '0629' && time < '1000') {
      // 6:30 AM - 09:59 AM
      return `url('./assets/img/bg-late-morning.png')`
    } else if (time > '0959' && time < '1700') {
      // 10:00 AM - 04:59 PM
      return `url('./assets/img/bg-early-afternoon.png')`
    } else if (time > '1659' && time < '1800') {
      // 05:00 PM - 05:59 PM
      return `url('./assets/img/bg-late-afternoon.png')`
    } else if (time > '1759' && time < '2400') {
      // 06:00 PM - 11:59 PM
      return `url('./assets/img/bg-evening.png')`
    }
  }

  addBackgroundTransition(backgroundImg)

  backgroundImg.style.backgroundImage = checkTimeBackground(time)
}

const getTime = setInterval(() => {
  showTime()
  setGreeting(showTime())
  setBackground(showTime())
}, 1000)

// Focus
const focusQuestion = document.querySelector('div.focus span')
const focusTodayHeader = document.querySelector('[data-focus-today-header]')
const focusInput = document.querySelector('div.focus-input input[type=text')
const focusInputText = document.querySelector('div.focus-input span')
const focusRemoveButton = document.querySelector('div.focus-input button')
const focusLocalStorageKey = 'focusInputText'

focusInput.addEventListener('keypress', (e) => {
  let focusInputValue = focusInput.value

  if (e.key === 'Enter') {
    localStorage.setItem(focusLocalStorageKey, focusInputValue)
    getLocalStorageItem(focusLocalStorageKey)
  }
})

focusRemoveButton.addEventListener('click', () => {
  localStorage.removeItem(focusLocalStorageKey)
  focusElementsToggle()
  focusInput.value = ''
})

const getLocalStorageItem = (key) => {
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

getLocalStorageItem(focusLocalStorageKey)

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
  menu.classList.toggle('show')
  button.classList.toggle('active-btn')

  const disableButton = (button) => {
    button === todoButton
      ? settingsButton.toggleAttribute('disabled')
      : todoButton.toggleAttribute('disabled')
  }

  addAnimation(menu)
  disableButton(button)
}

// Transitions and Animations
const addBackgroundTransition = (element) => {
  element.classList.add('fade-bg')
}

const addAnimation = (element) => {
  element.classList.add('fade-animation')
}
