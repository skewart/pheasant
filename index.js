const pheasant = require('./lib/pheasant.js');

const req = new XMLHttpRequest();

req.overrideMimeType('application/json');
req.open('GET', 'data/daily-crime-2010-2015.json', true);

req.onreadystatechange = () => {
  if (req.readyState === 4 && req.status === 200) {
    pheasant.visualize(JSON.parse(req.responseText), 'canvas_goes_here');
  }
}

// Fetch the data
window.onload = () => req.send(null);

