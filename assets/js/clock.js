import { addBackgroundTransition, addAnimation } from './main.js'

const clockElement = document.querySelector('[data-clock]')
const greetingElement = document.querySelector('[data-greeting]')
const body = document.querySelector('body')

const getTime = () => {
  let date = new Date()
  let currentRegularTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  let currentHours = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}`
  let currentMinutes = `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
  let currentMilitaryTime = `${currentHours}${currentMinutes}`

  return { currentRegularTime, currentMilitaryTime }
}

const setClock = (time) => {
  time = time.replace('AM', '').replace('PM', '')
  clockElement.textContent = time
}

const setGreeting = (time) => {
  const checkGreetingTime = (time) => {
    if (time >= '0000' && time < '1200') {
      // Until 11:59 AM
      return 'Good morning, '
    } else if (time > '1159' && time < '1800') {
      // 12:00 PM - 05:59 PM
      return 'Good afternoon, '
    } else if (time > '1759' && time < '2400') {
      // 06:00 PM - 11:59 PM
      return 'Good evening, '
    }
  }

  greetingElement.textContent = checkGreetingTime(time)
}

const setBackground = (time) => {
  const checkBackgroundTime = (time) => {
    if (time >= '0000' && time < '0530') {
      // Until 05:29 AM
      return `url('./assets/img/bg-evening.png')`
    } else if (time > '0529' && time < '0630') {
      // 05:30 AM - 06:29 AM
      return `url('./assets/img/bg-early-morning.png')`
    } else if (time > '0629' && time < '1000') {
      // 6:30 AM - 09:59 AM
      return `url('./assets/img/bg-late-morning.png')`
    } else if (time > '0959' && time < '1700') {
      // 10:00 AM - 04:59 PM
      return `url('./assets/img/bg-early-afternoon.png')`
    } else if (time > '1659' && time < '1800') {
      // 05:00 PM - 05:59 PM
      return `url('./assets/img/bg-late-afternoon.png')`
    } else if (time > '1759' && time < '2400') {
      // 06:00 PM - 11:59 PM
      return `url('./assets/img/bg-evening.png')`
    }
  }
  addBackgroundTransition(body)
  body.style.backgroundImage = checkBackgroundTime(time)
}

const setTimeInterval = setInterval(() => {
  let times = getTime()

  getTime()
  setClock(times.currentRegularTime)
  setGreeting(times.currentMilitaryTime)
  setBackground(times.currentMilitaryTime)
}, 1000)
