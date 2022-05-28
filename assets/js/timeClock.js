const clockElement = document.querySelector('[data-clock]')

function showTime() {
  let currentDate = new Date()
  //   let currentTime = currentDate.toLocaleTimeString([], {
  //   hour: '2-digit',
  //   minute: '2-digit',
  // })
  let currentTime = currentDate.toLocaleTimeString()
  clockElement.textContent = currentTime
}

setInterval(showTime, 1000)
