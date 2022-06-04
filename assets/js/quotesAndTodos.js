const todoAddButton = document.querySelector('[data-todo-add]')
const todoUl = document.querySelector('[data-todo-ul]')
const todoItems = document.querySelectorAll('[data-todo-item]')
const todoInput = document.querySelector('[data-todo-input]')
const todoRemove = document.getElementsByClassName('fa-circle-check')
const quoteAddButton = document.querySelector('[data-quote-add]')
const quoteUl = document.querySelector('[data-quote-ul]')
const quoteItems = document.querySelectorAll('[data-quote-item]')
const quoteInput = document.querySelector('[data-quote-input]')
const quoteRemove = document.getElementsByClassName('fa-circle-minus')
const quoteText = document.querySelector('[data-quote]')

const TODO_LIST = 'todo'
const TODO_KEY = 'todos'
const QUOTE_LIST = 'quote'
const QUOTE_KEY = 'quotes'

const addListItem = (list, button, input) => {
  button.addEventListener('click', () => {
    if (list === TODO_LIST) {
      newItem(list, input, parseList(list))
    } else {
      newItem(list, input, parseList(list))
      showRandomQuote(parseList(list))
    }
  })
}

const newItem = (list, input, array) => {
  let inputValue = input.value
  const inputTextNode = document.createTextNode(inputValue)
  const liCreate = document.createElement('li')
  const removeButton = document.createElement('i')

  if (inputValue === '') {
    alert('Field cannot be empty.')
  } else {
    if (list === TODO_LIST) {
      removeButton.classList.add('fa-circle-check')
      liCreate.setAttribute('data-todo-item', '')
    } else {
      removeButton.classList.add('fa-circle-minus')
      liCreate.setAttribute('data-quote-item', '')
    }
    removeButton.classList.add('fa-solid')
    removeButton.classList.add('remove')
    liCreate.appendChild(removeButton)
    liCreate.appendChild(inputTextNode)
    list === TODO_LIST ? todoUl.appendChild(liCreate) : quoteUl.appendChild(liCreate)
    array.push(inputValue)
    list === TODO_LIST
      ? localStorage.setItem(TODO_KEY, JSON.stringify(array))
      : localStorage.setItem(QUOTE_KEY, JSON.stringify(array))
  }
  input.value = ''
  if (list === TODO_LIST) {
    removeItem(TODO_LIST)
  } else {
    removeItem(QUOTE_LIST)
  }
}

function removeItem(list) {
  let key
  let removeButton

  if (list === TODO_LIST) {
    key = TODO_KEY
    removeButton = todoRemove
  } else {
    key = QUOTE_KEY
    removeButton = quoteRemove
  }
  for (let i = 0; i < removeButton.length; i++) {
    removeButton[i].onclick = function () {
      let div = this.parentElement
      let text = div.textContent

      const removeFromList = (key, value) => {
        let list = JSON.parse(localStorage.getItem(key))
        let itemIndex = list.indexOf(value)

        list.splice(itemIndex, 1)
        key === TODO_KEY
          ? localStorage.setItem(TODO_KEY, JSON.stringify(list))
          : localStorage.setItem(QUOTE_KEY, JSON.stringify(list))
      }
      removeFromList(key, text)
      div.remove()
      if (key === QUOTE_KEY) {
        showRandomQuote(parseList(QUOTE_LIST))
      }
    }
  }
}

const showListItems = (list, array) => {
  if (array.length !== 0) {
    for (let i = 0; i < array.length; i++) {
      let inputValue = array[i]
      const inputTextNode = document.createTextNode(inputValue)
      const liCreate = document.createElement('li')
      const removeButton = document.createElement('i')

      if (list === TODO_LIST) {
        removeButton.classList.add('fa-circle-check')
        liCreate.setAttribute('data-todo-item', '')
      } else {
        removeButton.classList.add('fa-circle-minus')
        liCreate.setAttribute('data-quote-item', '')
      }
      removeButton.classList.add('fa-solid')
      removeButton.classList.add('remove')
      liCreate.appendChild(removeButton)
      liCreate.appendChild(inputTextNode)
      if (list === TODO_LIST) {
        todoUl.appendChild(liCreate)
        removeItem(todoRemove)
      } else {
        quoteUl.appendChild(liCreate)
        removeItem(quoteRemove)
      }
    }
  }
}

const parseList = (list) => {
  let items

  list === TODO_LIST ? (items = localStorage.getItem(TODO_KEY)) : (items = localStorage.getItem(QUOTE_KEY))
  items = JSON.parse(items)
  if (items !== null) {
    return items
  } else {
    let emptyArray = []

    return emptyArray
  }
}

const showRandomQuote = (array) => {
  if (array.length !== 0) {
    let i = Math.floor(Math.random() * array.length)

    quoteText.classList.toggle('quote-fade-animation')
    quoteText.textContent = `“${array[i]}”`
  } else {
    quoteText.textContent = ''
  }
}

window.addEventListener('load', function () {
  showListItems(TODO_LIST, parseList(TODO_LIST))
  showListItems(QUOTE_LIST, parseList(QUOTE_LIST))
  removeItem(quoteRemove)
  removeItem(todoRemove)
  showRandomQuote(parseList(QUOTE_LIST))
})

addListItem(QUOTE_LIST, quoteAddButton, quoteInput)
addListItem(TODO_LIST, todoAddButton, todoInput)
