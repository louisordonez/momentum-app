import { addAnimation } from './fade.js'

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
