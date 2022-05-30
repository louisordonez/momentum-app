const clockElement = document.querySelector('[data-clock]')
const greetingElement = document.querySelector('[data-greeting]')

function showTime() {
  let currentDate = new Date()
  let currentTime = currentDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  let currentHours = currentDate.getHours()
  let currentMinutes = currentDate.getMinutes()
  let currentMilitaryTime = `${currentHours}${currentMinutes}`
  currentTime = currentTime.replace('AM', '').replace('PM', '')
  clockElement.textContent = currentTime

  setGreeting(currentMilitaryTime)
}

function setGreeting(time) {
  if (time >= 0000 && time <= 1159) {
    greetingElement.textContent = `Good morning, `
  } else if (time >= 1200 && time <= 1759) {
    greetingElement.textContent = `Good afternoon, `
  } else if (time >= 1800 && time <= 2359) {
    greetingElement.textContent = `Good evening, `
  }
}

setInterval(showTime, 1000)
