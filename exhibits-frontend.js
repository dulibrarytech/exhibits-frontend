require('dotenv').config();
const compress = require('compression');

var express = require('express');
var app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(compress());
}

app.use(express.static('public'));

app.use(function(req, res, next) {
    var err = null;
    try {
        decodeURIComponent(req.path)
        next();
    }
    catch(e) {
        console.log("Access: " + e, req.url);
        console.log("Req host: " + req.headers.host);
        res.sendStatus(404);
    }
});

app.get('*', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

app.listen(process.env.NODE_PORT || 5000, () => {
  console.log(`Exhibits frontend is running on port ${process.env.NODE_PORT} in ${process.env.NODE_ENV} mode`);
})
