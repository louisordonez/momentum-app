import { addBackgroundTransition } from './main.js'

const settingsMenu = document.querySelector('[data-settings-menu]')
const settingsButton = document.querySelector('div.settings button')
const todoMenu = document.querySelector('[data-todo-menu]')
const todoButton = document.querySelector('div.todo button')

settingsButton.addEventListener('click', () => showMenu(settingsMenu, settingsButton))

todoButton.addEventListener('click', () => showMenu(todoMenu, todoButton))

const showMenu = (menu, button) => {
  menu.classList.toggle('show')
  button.classList.toggle('active-btn')
  document.addEventListener('mouseup', function (e) {
    if (menu.classList.contains('show')) {
      if (!menu.contains(e.target)) {
        menu.classList.toggle('show')
        button.classList.toggle('active-btn')
      }
    }
  })
}
