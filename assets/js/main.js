import { addBackgroundTransition, addAnimation } from './fade.js'

// Clock
const clockElement = document.querySelector('[data-clock]')
const greetingElement = document.querySelector('[data-greeting]')
const body = document.querySelector('body')

const getTime = () => {
  let date = new Date()
  let currentRegularTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  let currentHours = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}`
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
    if (time >= '0000' && time < '1200') {
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
    if (time >= '0000' && time < '0530') {
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
const focusToday = document.querySelector('[data-focus-today-header]')
const focusInput = document.querySelector('div.focus-input-container input[type=text')
const focusText = document.querySelector('[data-focus-text]')
const focusRemoveButton = document.querySelector('div.focus-input-container button')
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
  focusToday.textContent = 'What is your main focus for today?'
  focusToday.style.fontWeight = 'normal'
  focusInput.value = ''
})

const getFocus = (itemKey) => {
  let focusItem = localStorage.getItem(itemKey)

  if (focusItem !== null) {
    focusElementsToggle()
    focusText.textContent = focusItem
    focusToday.textContent = 'TODAY'
    focusToday.style.fontWeight = 'bold'
  }
}

const focusElementsToggle = () => {
  focusInput.classList.toggle('hide')
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

// Name
const nameInput = document.querySelector('[data-settings-menu-name-input]')
const nameSubmit = document.querySelector('[data-settings-menu-name-submit]')
const nameText = document.querySelector('[data-name]')
const nameLocalStorageKey = 'name'

nameSubmit.addEventListener('click', () => {
  let nameInputValue = nameInput.value

  nameInputValue === ''
    ? alert('Field cannot be empty.')
    : (localStorage.setItem(nameLocalStorageKey, nameInputValue),
      getName(nameInputValue),
      alert('Submitted successfully.'))
})

const getName = (item) => {
  let nameItem = localStorage.getItem(nameLocalStorageKey, item)
  nameInput.value = nameItem

  nameItem !== null ? (nameText.textContent = `${nameItem}.`) : (nameText.textContent = 'User.')
}

getName(nameLocalStorageKey)

// Quotes & Todo
const todoAddButton = document.querySelector('[data-todo-add]')
const todoList = document.querySelector('[data-todo-ul]')
const todoItems = document.querySelectorAll('[data-todo-item]')
const todoInput = document.querySelector('[data-todo-input]')
const quoteAddButton = document.querySelector('[data-quote-add]')
const quoteList = document.querySelector('[data-quote-ul]')
const quoteItems = document.querySelectorAll('[data-quote-item]')
const quoteInput = document.querySelector('[data-quote-input]')
const removeButtons = document.getElementsByClassName('remove')
const quoteText = document.querySelector('[data-quote]')

const addListItem = (ul, button, input) => {
  button.addEventListener('click', () => newItem(ul, input, parseArray(ul)))
}

const addRemoveButton = (element) => {
  for (let i = 0; i < element.length; i++) {
    const removeButton = document.createElement('i')
    let itemValue = element[i].textContent
    let itemStoredTextContent = document.createTextNode(itemValue)

    removeButton.classList.add('fa-solid')
    removeButton.classList.add('fa-circle-minus')
    removeButton.classList.add('remove')

    element[i].textContent = ''
    element[i].appendChild(removeButton)
    element[i].appendChild(itemStoredTextContent)
  }
}

function removeItems(element) {
  for (let i = 0; i < element.length; i++) {
    element[i].onclick = function () {
      let div = this.parentElement
      div.style.display = 'none'
    }
  }
}

const newItem = (ul, input, array) => {
  let inputValue = input.value
  const inputTextNode = document.createTextNode(inputValue)
  const liCreate = document.createElement('li')
  const removeButton = document.createElement('i')

  removeButton.classList.add('fa-solid')
  removeButton.classList.add('fa-circle-minus')
  removeButton.classList.add('remove')

  ul === todoList ? liCreate.setAttribute('data-todo-item', '') : liCreate.setAttribute('data-quote-item', '')

  liCreate.appendChild(removeButton)
  liCreate.appendChild(inputTextNode)

  if (inputValue === '') {
    alert('Field cannot be empty.')
  } else {
    ul.appendChild(liCreate)
    array.push(inputValue)

    ul === todoList
      ? localStorage.setItem('items', JSON.stringify(array))
      : localStorage.setItem('quotes', JSON.stringify(array))
  }

  input.value = ''
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].onclick = function () {
      let div = this.parentElement
      div.style.display = 'none'
      // ul === todoList ? removeFromList(itemsArr, i) : removeFromList(quotesArr, i)
    }
  }
}

const removeFromList = (arr, i) => {
  let index = quotesArr.indexOf(i)
  arr.splice(index, 1)
  console.log(arr)
}

const parseArray = (ul) => {
  let itemsArray

  ul === todoList ? (itemsArray = localStorage.getItem('items')) : (itemsArray = localStorage.getItem('quotes'))

  itemsArray = JSON.parse(itemsArray)

  if (itemsArray !== null) {
    return itemsArray
  } else {
    let emptyArr = []
    return emptyArr
  }
}

const showListItems = (ul, array) => {
  if (array.length !== 0) {
    for (let i = 0; i < array.length; i++) {
      let inputValue = array[i]
      const inputTextNode = document.createTextNode(inputValue)
      const liCreate = document.createElement('li')
      const removeButton = document.createElement('i')

      removeButton.classList.add('fa-solid')
      removeButton.classList.add('fa-circle-minus')
      removeButton.classList.add('remove')

      ul === todoList ? liCreate.setAttribute('data-todo-item', '') : liCreate.setAttribute('data-quote-item', '')

      liCreate.appendChild(removeButton)
      liCreate.appendChild(inputTextNode)
      ul.appendChild(liCreate)
    }
  }
}

const randomQuote = (array) => {
  if (array.length !== 0) {
    let arrayIndex = Math.floor(Math.random() * array.length)
    quoteText.classList.toggle('quote-fade-animation')
    quoteText.textContent = array[arrayIndex]
  } else {
    quoteText.textContent = ''
  }
}

addListItem(quoteList, quoteAddButton, quoteInput)
addListItem(todoList, todoAddButton, todoInput)
addRemoveButton(quoteItems)
addRemoveButton(todoItems)
removeItems(removeButtons)
showListItems(todoList, parseArray(todoList))
showListItems(quoteList, parseArray(quoteList))
randomQuote(parseArray(quoteList))
