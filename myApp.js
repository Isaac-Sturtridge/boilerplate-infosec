const express = require('express');
const helmet = require('helmet');
const app = express();
app.use(helmet({
   frameguard: {         
    action: 'deny'
  },
  contentSecurityPolicy: {   
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false
}))
const ninetyDaysinSeconds = 90*24*60*60;
app.use(
  helmet.hsts({
    maxAge: ninetyDaysinSeconds,
    force: true,
  })
);
app.use(helmet.noCache());








































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
