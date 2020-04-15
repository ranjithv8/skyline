const express = require('express');
const axios = require('axios');
const app = express();
let PORT = process.env.PORT || 3000;





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


app.use(express.static('dist/skyline'));
app.get('/*',function(req,res){
    console.log(__dirname);
    res.sendFile('/dist/skyline/index.html');
});



app.listen(PORT, () => console.log(` App listening to ${PORT}`));


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