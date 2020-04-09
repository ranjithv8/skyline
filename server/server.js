const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000



app.use('/',express.static('dist/skyline'));

app.get('/api/cities',(req, res) => {
    let url = 'https://api.skypicker.com/locations';
    return skylineRequestApi(url, req.query, res);
});

app.get('/api/location',(req, res) => {
    let url = 'https://dataservice.accuweather.com/locations/v1/poi/search';
    return skylineRequestApi(url, req.query, res);
});

app.get('/api/forecast',(req, res) => {
    let url = `https://dataservice.accuweather.com//forecasts/v1/daily/5day/${req.query.locationKey}`;
    return skylineRequestApi(url, req.query, res);
});

app.get('/api/search',(req, res) => {
    let url = 'https://api.skypicker.com/flights';
    return skylineRequestApi(url, req.query, res);
});




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


function skylineRequestApi (url, params, res) {
  return axios.get(url, { 
      params ,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
        console.log(response.data);
        res.send(response.data);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    });
}