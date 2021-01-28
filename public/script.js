const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () =>{
    const place = searchBox.getPlaces()[0]
    if(place == null) return
    const latitude = place.geometry.location.lat()
    const longitude= place.geometry.location.lng()
    fetch('/weather',{
        method : 'POST',
        headers :{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json()).then(data => {
       // console.log(data)
        setWeatherData(data, place.formatted_address)
    })
})

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const humidityElement = document.querySelector('[data-humidity]')
const windElement = document.querySelector('[data-wind]')
const iconElement = document.querySelector("[icon]");

function setWeatherData(data, place) {
  locationElement.textContent = place
  statusElement.textContent = data.weather[0].description.toUpperCase()
  temperatureElement.textContent = Math.floor(data.main.feels_like - 273.15)
  humidityElement.textContent = data.main.humidity
  windElement.textContent = data.wind.speed
  iconElement.src = `icons/${data.weather[0].icon}.png`;
  }