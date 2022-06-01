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

const getLocalStorageItem = (itemKey) => {
  let focusInputTextItem = localStorage.getItem(itemKey)

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
