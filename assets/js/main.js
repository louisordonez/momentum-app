import { addBackgroundTransition, addAnimation } from './fade.js'

// Clock
const clockElement = document.querySelector('[data-clock]')
const greetingElement = document.querySelector('[data-greeting]')
const body = document.querySelector('body')

const getTime = () => {
  let date = new Date()
  let currentRegularTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  let currentHours = date.getHours()
  let currentMinutes = `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
  let currentMilitaryTime = `${currentHours}${currentMinutes}`

  return { currentRegularTime, currentMilitaryTime }
}

const setClock = (time) => {
  time = time.replace('AM', '').replace('PM', '')
  clockElement.textContent = time
}

const setGreeting = (time) => {
  const checkGreetingTime = (time) => {
    if (time < '1200') {
      // Until 11:59 AM
      return 'Good morning, '
    } else if (time > '1159' && time < '1800') {
      // 12:00 PM - 05:59 PM
      return 'Good afternoon, '
    } else if (time > '1759' && time < '2400') {
      // 06:00 PM - 11:59 PM
      return 'Good evening, '
    }
  }

  greetingElement.textContent = checkGreetingTime(time)
}

const setBackground = (time) => {
  const checkBackgroundTime = (time) => {
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

  addBackgroundTransition(body)

  body.style.backgroundImage = checkBackgroundTime(time)
}

const setTimeInterval = setInterval(() => {
  let times = getTime()

  getTime()
  setClock(times.currentRegularTime)
  setGreeting(times.currentMilitaryTime)
  setBackground(times.currentMilitaryTime)
}, 1000)

// Focus
const focusQuestion = document.querySelector('div.focus span')
const focusToday = document.querySelector('[data-focus-today-header]')
const focusInput = document.querySelector('div.focus-input input[type=text')
const focusText = document.querySelector('div.focus-input span')
const focusRemoveButton = document.querySelector('div.focus-input button')
const focusLocalStorageKey = 'focus'

focusInput.addEventListener('keypress', (e) => {
  let focusInputValue = focusInput.value

  if (e.key === 'Enter') {
    localStorage.setItem(focusLocalStorageKey, focusInputValue)
    getFocus(focusLocalStorageKey)
  }
})

focusRemoveButton.addEventListener('click', () => {
  localStorage.removeItem(focusLocalStorageKey)
  focusElementsToggle()
  focusInput.value = ''
})

const getFocus = (itemKey) => {
  let focusItem = localStorage.getItem(itemKey)

  if (focusItem !== null) {
    focusElementsToggle()
    focusText.textContent = focusItem
  }
}

const focusElementsToggle = () => {
  focusQuestion.classList.toggle('hide')
  focusInput.classList.toggle('hide')
  focusToday.classList.toggle('hide')
  focusText.classList.toggle('hide')
  focusRemoveButton.classList.toggle('hide')
}

getFocus(focusLocalStorageKey)

// Menus
const settingsMenu = document.querySelector('[data-settings-menu]')
const settingsButton = document.querySelector('div.settings button')
const todoMenu = document.querySelector('[data-todo-menu]')
const todoButton = document.querySelector('div.todo button')

settingsButton.addEventListener('click', () => showMenu(settingsMenu, settingsButton))

todoButton.addEventListener('click', () => showMenu(todoMenu, todoButton))

const showMenu = (menu, button) => {
  menu.classList.toggle('show')
  button.classList.toggle('active-btn')

  const disableButton = (button) => {
    button === todoButton ? settingsButton.toggleAttribute('disabled') : todoButton.toggleAttribute('disabled')
  }

  addAnimation(menu)
  disableButton(button)
}

// Settings
const nameInput = document.querySelector('[data-settings-menu-name-input]')
const settingsSubmitButton = document.querySelector('[data-settings-menu-submit]')
const nameText = document.querySelector('[data-name]')
const nameLocalStorageKey = 'name'

settingsSubmitButton.addEventListener('click', () => {
  let nameInputValue = nameInput.value

  nameInputValue === ''
    ? alert(`Name cannot be empty.`)
    : (localStorage.setItem(nameLocalStorageKey, nameInputValue), getName(nameInputValue))
})

const getName = (item) => {
  let nameItem = localStorage.getItem(nameLocalStorageKey, item)
  nameInput.value = nameItem

  nameItem !== null ? (nameText.textContent = nameItem) : (nameText.textContent = 'User')
}

getName(nameLocalStorageKey)

const quoteUl = document.querySelector('[data-quote-ul]')
const quoteLi = document.querySelector('[data-quote-li]')
const quoteInput = document.querySelector('[data-settings-menu-quote-input]')
const quoteAddButton = document.querySelector('[data-settings-menu-quote-add-button]')

quoteAddButton.addEventListener('click', () => newQuote())

// const quoteRemoveButton = document.querySelector('[data-settings-menu-quote-remove-button]')
// quoteRemoveButton.addEventListener('click', () => removeQuote(quoteLi))

const newQuote = () => {
  const liQuote = document.createElement('li')
  const divQuote = document.createElement('div')
  const spanQuote = document.createElement('span')
  const buttonQuote = document.createElement('button')
  const iQuote = document.createElement('i')
  let spanValue = document.createTextNode('Tesasdasdasdasdasdasdasdasdasdt')

  buttonQuote.classList.add('quote-remove')
  iQuote.classList.add('fa-solid', 'fa-circle-minus', 'i-menu-style')

  quoteUl.appendChild(liQuote)
  liQuote.appendChild(divQuote)
  divQuote.appendChild(spanQuote)
  spanQuote.append(buttonQuote)
  buttonQuote.append(iQuote)

  spanQuote.appendChild(spanValue)
}

const removeQuote = (element) => {
  element.remove()
}
