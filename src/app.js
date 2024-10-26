function handleSearchSubmit (e) {
  e.preventDefault()
  let searchInput = document.querySelector('#search-input')
  let cityEl = document.querySelector('#city')
  cityEl.innerHTML = searchInput.value
}

let searchFormEl = document.querySelector('#search-form')
searchFormEl.addEventListener('submit', handleSearchSubmit)
