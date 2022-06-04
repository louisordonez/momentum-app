const nameInput = document.querySelector('[data-settings-menu-name-input]')
const nameSubmit = document.querySelector('[data-settings-menu-name-submit]')
const nameText = document.querySelector('[data-name]')

const NAME_KEY = 'name'

nameSubmit.addEventListener('click', () => {
  let nameInputValue = nameInput.value

  if (nameInputValue === '') {
    alert('Field cannot be empty.')
  } else {
    localStorage.setItem(NAME_KEY, nameInputValue)
    getName(nameInputValue)
    alert('Submitted successfully.')
  }
})

const getName = (item) => {
  let nameItem = localStorage.getItem(NAME_KEY, item)
  nameInput.value = nameItem
  nameItem !== null ? (nameText.textContent = `${nameItem}.`) : (nameText.textContent = 'User.')
}

getName(NAME_KEY)
