import { addBackgroundTransition, addAnimation } from './main.js'

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
