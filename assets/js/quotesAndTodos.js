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
    if (ul === todoList) {
      newItem(ul, input, parseArray(ul))
    } else {
      newItem(ul, input, parseArray(ul))
      showRandomQuote(parseArray(ul))
    }
  })
}

const newItem = (ul, input, array) => {
  let inputValue = input.value
  const inputTextNode = document.createTextNode(inputValue)
  const liCreate = document.createElement('li')
  const removeButton = document.createElement('i')

  if (inputValue === '') {
    alert('Field cannot be empty.')
  } else {
    if (ul === todoList) {
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
    ul.appendChild(liCreate)
    array.push(inputValue)
    ul === todoList
      ? localStorage.setItem('todos', JSON.stringify(array))
      : localStorage.setItem('quotes', JSON.stringify(array))
  }
  input.value = ''
  ul === todoList ? removeItem(todoRemove) : removeItem(quoteRemove)
}

function removeItem(element) {
  let key

  element === todoRemove ? (key = 'todos') : (key = 'quotes')
  for (let i = 0; i < element.length; i++) {
    element[i].onclick = function () {
      let div = this.parentElement
      let text = div.textContent

      const removeFromList = (key, value) => {
        let listArray = JSON.parse(localStorage.getItem(key))
        let itemIndex = listArray.indexOf(value)

        listArray.splice(itemIndex, 1)
        key === 'todos'
          ? localStorage.setItem('todos', JSON.stringify(listArray))
          : localStorage.setItem('quotes', JSON.stringify(listArray))
      }
      removeFromList(key, text)
      div.remove()
      key === 'quotes' ? showRandomQuote(parseArray(quoteList)) : false
    }
  }
}

const showListItems = (ul, array) => {
  if (array.length !== 0) {
    for (let i = 0; i < array.length; i++) {
      let inputValue = array[i]
      const inputTextNode = document.createTextNode(inputValue)
      const liCreate = document.createElement('li')
      const removeButton = document.createElement('i')

      if (ul === todoList) {
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
      ul.appendChild(liCreate)
    }
  }
}

const parseArray = (ul) => {
  let itemsArray

  ul === todoList ? (itemsArray = localStorage.getItem('todos')) : (itemsArray = localStorage.getItem('quotes'))
  itemsArray = JSON.parse(itemsArray)
  if (itemsArray !== null) {
    return itemsArray
  } else {
    let emptyArr = []

    return emptyArr
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
  showListItems(todoList, parseArray(todoList))
  showListItems(quoteList, parseArray(quoteList))
  removeItem(quoteRemove)
  removeItem(todoRemove)
  showRandomQuote(parseArray(quoteList))
})

addListItem(quoteList, quoteAddButton, quoteInput)
addListItem(todoList, todoAddButton, todoInput)
