if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY
const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/weather',(req,res) => {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${OPEN_WEATHER_API_KEY}`
    axios({
        url: url,
        responseType:'json'
    }).then(data => {
        res.json(data.data)
    })
})

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});