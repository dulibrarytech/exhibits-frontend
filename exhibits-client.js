require('dotenv').config();
const compress = require('compression');
const axios = require('axios');
const Logger = require('./log4.js');

var express = require('express');
var app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(compress());
}

app.use(express.static('public'));

app.use(function(req, res, next) {
    try {
        decodeURIComponent(req.path)
        next();
    }
    catch(e) {
        Logger.module().error(`Error: ${e} Client url: ${req.url}`);
        Logger.module().info(`Request host: ${req.headers.host}`);
        
        res.sendStatus(404);
    }
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

// test image server
axios.get(process.env.EXHIBITS_IIIF_IMAGE_SERVER_URL, {rejectUnauthorized: false})
  .then(function (response) {
    Logger.module().info(`Image server is online at '${process.env.EXHIBITS_IIIF_IMAGE_SERVER_URL}'`);
  })
  .catch(function (error) {
    Logger.module().error(`Image server is unavailable at '${process.env.EXHIBITS_IIIF_IMAGE_SERVER_URL}' ${error}`);
  });

// test exhibits server
axios.get(process.env.EXHIBITS_API_DOMAIN, {rejectUnauthorized: false})
  .then(function (response) {
    Logger.module().info(`Exhibits server is online at '${process.env.EXHIBITS_API_DOMAIN}'`);
  })
  .catch(function (error) {
    Logger.module().error(`Exhibits server is unavailable at '${process.env.EXHIBITS_API_DOMAIN}' ${error}`);
  });

app.listen(process.env.NODE_PORT || 5000, () => {
  Logger.module().info(`Exhibits frontend is running on port ${process.env.NODE_PORT} in ${process.env.NODE_ENV} mode`);
})
