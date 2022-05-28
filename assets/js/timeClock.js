let currentDate = new Date()
let currentTime = currentDate.toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
})
const clockElement = document.querySelector('[data-clock]')

clockElement.textContent = currentTime
