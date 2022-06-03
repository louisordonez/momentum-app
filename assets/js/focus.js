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
