function updateWeather (response) {
  tempEl = document.querySelector('#temperature')
  let cityEl = document.querySelector('#city')
  let descriptionEl = document.querySelector('#description')
  let humidityEl = document.querySelector('#humidity')
  let windEl = document.querySelector('#wind')
  let timeEl = document.querySelector('#time')
  let date = new Date(response.data.time * 1000)

  console.log(response.data)

  tempEl.innerHTML = Math.round(response.data.temperature.current)
  cityEl.innerHTML = response.data.city
  descriptionEl.innerHTML = response.data.condition.description
  humidityEl.innerHTML = `${response.data.temperature.humidity} %`
  windEl.innerHTML = `${response.data.wind.speed} km/h`
  timeEl.innerHTML = formatDate(date)
}

function formatDate (date) {
  let minutes = date.getMinutes()
  let hours = date.getHours()
  let days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]
  let day = days[date.getDay()]

  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (hours < 10) {
    hours = `0${hours}`
  }

  return `${day} ${hours}:${minutes}`
}

function searchCity (city) {
  let apiKey = 'f155ba5d1ot40a88800e7016d3b9ad61'
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`

  axios.get(apiUrl).then(updateWeather)
}

function handleSearchSubmit (e) {
  e.preventDefault()
  let searchInput = document.querySelector('#search-input')
  searchCity(searchInput.value)
}

let searchFormEl = document.querySelector('#search-form')
searchFormEl.addEventListener('submit', handleSearchSubmit)

searchCity('Paris')
