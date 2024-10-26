function updateWeather (response) {
  tempEl = document.querySelector('#temperature')
  let cityEl = document.querySelector('#city')
  let descriptionEl = document.querySelector('#description')
  let humidityEl = document.querySelector('#humidity')
  let windEl = document.querySelector('#wind')
  let timeEl = document.querySelector('#time')
  let date = new Date(response.data.time * 1000)
  let iconEl = document.querySelector('#icon-image')

  tempEl.innerHTML = Math.round(response.data.temperature.current)
  cityEl.innerHTML = response.data.city
  descriptionEl.innerHTML = response.data.condition.description
  humidityEl.innerHTML = `${response.data.temperature.humidity} %`
  windEl.innerHTML = `${response.data.wind.speed} km/h`
  timeEl.innerHTML = formatDate(date)
  iconEl.innerHTML = `<img class="current-temperature-icon" src="${response.data.condition.icon_url}" alt="weather icon">`
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
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${API_KEY}&units=metric`

  axios.get(apiUrl).then(updateWeather)
}

function handleSearchSubmit (e) {
  e.preventDefault()
  let searchInput = document.querySelector('#search-input')
  searchCity(searchInput.value)
}

function displayForecast () {
  let days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  let forecastHtml = ''

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="forecast-day">
        <div class="day-of-week">${day}</div>
        <img class="forecast-icon" src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/mist-night.png" alt="weather icon">
        <div class="forecast-temp"><strong>29º </strong>13º</div>
        </div>`
  })
  let forecastEl = document.querySelector('#forecast')
  forecastEl.innerHTML = forecastHtml
}

let searchFormEl = document.querySelector('#search-form')

searchFormEl.addEventListener('submit', handleSearchSubmit)

searchCity('Paris')
displayForecast()
