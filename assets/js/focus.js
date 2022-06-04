const focusToday = document.querySelector('[data-focus-today-header]')
const focusInput = document.querySelector('div.focus-input-container input[type=text')
const focusText = document.querySelector('[data-focus-text]')
const focusRemoveButton = document.querySelector('div.focus-input-container button')

const HIDE_CLASS = 'hide'
const FOCUS_KEY = 'focus'

focusInput.addEventListener('keypress', (e) => {
  let focusInputValue = focusInput.value

  if (e.key === 'Enter') {
    localStorage.setItem(FOCUS_KEY, focusInputValue)
    getFocus(FOCUS_KEY)
  }
})

focusRemoveButton.addEventListener('click', () => {
  localStorage.removeItem(FOCUS_KEY)
  focusElementsToggle()
  focusToday.textContent = 'What is your main focus for today?'
  focusToday.style.fontWeight = 'normal'
  focusInput.value = ''
})

const getFocus = (key) => {
  let focusItem = localStorage.getItem(key)

  if (focusItem !== null) {
    focusElementsToggle()
    focusText.textContent = focusItem
    focusToday.textContent = 'TODAY'
    focusToday.style.fontWeight = 'bold'
  }
}

const focusElementsToggle = () => {
  focusInput.classList.toggle(HIDE_CLASS)
  focusText.classList.toggle(HIDE_CLASS)
  focusRemoveButton.classList.toggle(HIDE_CLASS)
}

getFocus(FOCUS_KEY)
