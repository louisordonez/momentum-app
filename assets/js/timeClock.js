const clockElement = document.querySelector('[data-clock]')
const greetingElement = document.querySelector('[data-greeting]')
const backgroundImg = document.querySelector('body')

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
  if (time >= '0000' && time <= '1159') {
    greetingElement.textContent = `Good morning, `
  } else if (time >= '1200' && time <= '1759') {
    greetingElement.textContent = `Good afternoon, `
  } else if (time >= '1800' && time <= '2359') {
    greetingElement.textContent = `Good evening, `
  }

  setBackground(time)
}

function setBackground(time) {
  time = '1454'
  addFadeClass()
  if (time >= '0000' && time <= '0459') {
    backgroundImg.style.backgroundImage = `url('./assets/img/bg-1900-0459.png')`
  } else if (time >= '0500' && time <= '0659') {
    backgroundImg.style.backgroundImage = `url('./assets/img/bg-0500-0659.png')`
  } else if (time >= '0700' && time <= '1059') {
    backgroundImg.style.backgroundImage = `url('./assets/img/bg-0700-1059.png')`
  } else if (time >= '1100' && time <= '1659') {
    backgroundImg.style.backgroundImage = `url('./assets/img/bg-1100-1659.png')`
  } else if (time >= '1700' && time <= '1859') {
    backgroundImg.style.backgroundImage = `url('./assets/img/bg-1700-1859.png')`
  } else if (time >= '1900' && time <= '2359') {
    backgroundImg.style.backgroundImage = `url('./assets/img/bg-1900-0459.png')`
  }
}

function addFadeClass() {
  backgroundImg.classList.add('fade')
}

setInterval(showTime, 1000)
