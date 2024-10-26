function updateWeather (response) {
  tempEl = document.querySelector('#temperature')
  tempEl.innerHTML = Math.round(response.data.temperature.current)
  let cityEl = document.querySelector('#city')
  cityEl.innerHTML = response.data.city
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
