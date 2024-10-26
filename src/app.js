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
  getForecast(response.data.city)
}

function formatDate (date) {
  let minutes = date.getMinutes()
  let hours = date.getHours()
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
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

function formatDay (timestamp) {
  let date = new Date(timestamp * 1000)
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days[date.getDay()]
}

function getForecast (city) {
  let apiKey = 'f155ba5d1ot40a88800e7016d3b9ad61'
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast)
}

function displayForecast (response) {
  let forecastHtml = ''

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="forecast-day">
        <div class="day-of-week">${formatDay(day.time)}</div>
        <img class="forecast-icon" src="${
          day.condition.icon_url
        }" alt="weather icon">
        <div class="forecast-temp"><strong>${Math.round(
          day.temperature.maximum
        )}º </strong>${Math.round(day.temperature.minimum)}º</div>
        </div>`
    }
  })
  let forecastEl = document.querySelector('#forecast')
  forecastEl.innerHTML = forecastHtml
}

let searchFormEl = document.querySelector('#search-form')

searchFormEl.addEventListener('submit', handleSearchSubmit)

searchCity('Paris')
