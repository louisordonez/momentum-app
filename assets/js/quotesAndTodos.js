import { addBackgroundTransition, addAnimation } from './main.js'

const todoAddButton = document.querySelector('[data-todo-add]')
const todoList = document.querySelector('[data-todo-ul]')
const todoItems = document.querySelectorAll('[data-todo-item]')
const todoInput = document.querySelector('[data-todo-input]')
const todoRemove = document.getElementsByClassName('fa-circle-check')
const quoteAddButton = document.querySelector('[data-quote-add]')
const quoteList = document.querySelector('[data-quote-ul]')
const quoteItems = document.querySelectorAll('[data-quote-item]')
const quoteInput = document.querySelector('[data-quote-input]')
const quoteRemove = document.getElementsByClassName('fa-circle-minus')
const quoteText = document.querySelector('[data-quote]')

const addListItem = (ul, button, input) => {
  button.addEventListener('click', () => {
    if (ul === quoteList) {
      newItem(ul, input, parseArray(ul))
      showRandomQuote(parseArray(ul))
    } else {
      newItem(ul, input, parseArray(ul))
    }
  })
}

const addRemoveButton = (element) => {
  for (let i = 0; i < element.length; i++) {
    const removeButton = document.createElement('i')
    let itemValue = element[i].textContent
    let itemStoredTextContent = document.createTextNode(itemValue)

    removeButton.classList.add('fa-solid')
    ul === todoList ? removeButton.classList.add('fa-circle-check') : removeButton.classList.add('fa-circle-minus')
    removeButton.classList.add('remove')

    element[i].textContent = ''
    element[i].appendChild(removeButton)
    element[i].appendChild(itemStoredTextContent)
  }
}

function removeItem(element) {
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
  ul === todoList ? removeButton.classList.add('fa-circle-check') : removeButton.classList.add('fa-circle-minus')
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

  ul === todoList ? removeItem(todoRemove) : removeItem(quoteRemove)
}

const removeFromList = (arr, i) => {
  let index = array.indexOf(i)
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
      ul === todoList ? removeButton.classList.add('fa-circle-check') : removeButton.classList.add('fa-circle-minus')
      removeButton.classList.add('remove')
      ul === todoList ? liCreate.setAttribute('data-todo-item', '') : liCreate.setAttribute('data-quote-item', '')
      liCreate.appendChild(removeButton)
      liCreate.appendChild(inputTextNode)
      ul.appendChild(liCreate)
    }
  }
}

const showRandomQuote = (array) => {
  if (array.length !== 0) {
    let arrayIndex = Math.floor(Math.random() * array.length)
    quoteText.classList.toggle('quote-fade-animation')
    quoteText.textContent = array[arrayIndex]
  } else {
    quoteText.textContent = ''
  }
}

window.addEventListener('load', function () {
  addRemoveButton(quoteItems)
  addRemoveButton(todoItems)
  showListItems(todoList, parseArray(todoList))
  showListItems(quoteList, parseArray(quoteList))
  showRandomQuote(parseArray(quoteList))
  removeItem(quoteRemove)
  removeItem(todoRemove)
})

addListItem(quoteList, quoteAddButton, quoteInput)
addListItem(todoList, todoAddButton, todoInput)
