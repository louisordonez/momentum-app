import { addBackgroundTransition, addAnimation } from './main.js'

const settingsMenu = document.querySelector('[data-settings-menu]')
const settingsButton = document.querySelector('div.settings button')
const todoMenu = document.querySelector('[data-todo-menu]')
const todoButton = document.querySelector('div.todo button')

settingsButton.addEventListener('click', () => showMenu(settingsMenu, settingsButton))

todoButton.addEventListener('click', () => showMenu(todoMenu, todoButton))

const showMenu = (menu, button) => {
  menu.classList.add('show')
  button.classList.add('active-btn')

  document.addEventListener('mouseup', function (e) {
    if (menu.classList.contains('show')) {
      if (!menu.contains(e.target)) {
        button.classList.toggle('active-btn')
        menu.classList.toggle('show')
      }
    }
  })

  addAnimation(menu)
}
