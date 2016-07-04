(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var pheasant = require('./lib/pheasant.js');

var req = new XMLHttpRequest();

req.overrideMimeType('application/json');
req.open('GET', 'data/daily-crime-2010-2015.json', true);

req.onreadystatechange = function () {
  if (req.readyState === 4 && req.status === 200) {
    pheasant.visualize(JSON.parse(req.responseText), 'canvas_goes_here');
  }
};

// Fetch the data
window.onload = function () {
  return req.send(null);
};

},{"./lib/pheasant.js":2}],2:[function(require,module,exports){
'use strict';

// Create heat map data visualization

// Creates the visualization
function visualize(data, domElementId, opts) {

  console.log('visualizing...');

  var options = {
    minColor: 0xf0f0f0,
    maxColor: 0x050505,
    numSteps: 5
  };

  var element = document.getElementById(domElementId);
  var canvas = createCanvas(500, 200);
  element.appendChild(canvas);
  var context = canvas.getContext('2d');

  var steps = calculateColorSteps(options.minColor, options.maxColor, options.numSteps);

  context.fillRect(20, 20, 100, 100);
}

function calculateColorSteps(min, max, stepCount) {
  var minRed = min & 0xff0000,
      minGreen = min & 0x00ff00,
      minBlue = min & 0x0000ff,
      maxRed = max & 0xff0000,
      maxGreen = max & 0x00ff00,
      maxBlue = max & 0x0000ff,
      setps = [];

  var redStepSize = Math.floor((maxRed - minRed) / stepCount),
      greenStepSize = Math.floor((maxGreen - minGreen) / stepCount),
      blueStepSize = Math.floor((maxBlue - minBlue) / stepCount);

  for (; i < stepCount; i++) {
    var r = minRed + (redStepSize * i + 1),
        g = minGreen + (greenStepSize * i + 1),
        b = minBlue + (blueStepSize * i + 1);
    steps.push(r | g | b);
  }

  return steps;
}

function createCanvas(width, height) {
  var canvas = document.createElement('canvas');
  // TODO Maybe do some checks for viability here
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

module.exports = {
  visualize: visualize
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdmVyc2lvbnMvbm9kZS92Ni4yLjIvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiaW5kZXguanMiLCJsaWIvcGhlYXNhbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sV0FBVyxRQUFRLG1CQUFSLENBQWpCOztBQUVBLElBQU0sTUFBTSxJQUFJLGNBQUosRUFBWjs7QUFFQSxJQUFJLGdCQUFKLENBQXFCLGtCQUFyQjtBQUNBLElBQUksSUFBSixDQUFTLEtBQVQsRUFBZ0IsaUNBQWhCLEVBQW1ELElBQW5EOztBQUVBLElBQUksa0JBQUosR0FBeUIsWUFBTTtBQUM3QixNQUFJLElBQUksVUFBSixLQUFtQixDQUFuQixJQUF3QixJQUFJLE1BQUosS0FBZSxHQUEzQyxFQUFnRDtBQUM5QyxhQUFTLFNBQVQsQ0FBbUIsS0FBSyxLQUFMLENBQVcsSUFBSSxZQUFmLENBQW5CLEVBQWlELGtCQUFqRDtBQUNEO0FBQ0YsQ0FKRDs7O0FBT0EsT0FBTyxNQUFQLEdBQWdCO0FBQUEsU0FBTSxJQUFJLElBQUosQ0FBUyxJQUFULENBQU47QUFBQSxDQUFoQjs7Ozs7Ozs7QUNYQSxTQUFTLFNBQVQsQ0FBbUIsSUFBbkIsRUFBeUIsWUFBekIsRUFBdUMsSUFBdkMsRUFBNkM7O0FBRTNDLFVBQVEsR0FBUixDQUFZLGdCQUFaOztBQUVBLE1BQUksVUFBVTtBQUNaLGNBQVUsUUFERTtBQUVaLGNBQVUsUUFGRTtBQUdaLGNBQVU7QUFIRSxHQUFkOztBQU1BLE1BQU0sVUFBVSxTQUFTLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBaEI7QUFDQSxNQUFNLFNBQVMsYUFBYSxHQUFiLEVBQWtCLEdBQWxCLENBQWY7QUFDQSxVQUFRLFdBQVIsQ0FBb0IsTUFBcEI7QUFDQSxNQUFNLFVBQVUsT0FBTyxVQUFQLENBQWtCLElBQWxCLENBQWhCOztBQUVBLE1BQU0sUUFBUSxvQkFBb0IsUUFBUSxRQUE1QixFQUFzQyxRQUFRLFFBQTlDLEVBQXdELFFBQVEsUUFBaEUsQ0FBZDs7QUFFQSxVQUFRLFFBQVIsQ0FBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBeUIsR0FBekIsRUFBOEIsR0FBOUI7QUFDRDs7QUFFRCxTQUFTLG1CQUFULENBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLEVBQXVDLFNBQXZDLEVBQWtEO0FBQ2hELE1BQ0UsU0FBUyxNQUFNLFFBRGpCO0FBQUEsTUFFRSxXQUFXLE1BQU0sUUFGbkI7QUFBQSxNQUdFLFVBQVUsTUFBTSxRQUhsQjtBQUFBLE1BS0UsU0FBUyxNQUFNLFFBTGpCO0FBQUEsTUFNRSxXQUFXLE1BQU0sUUFObkI7QUFBQSxNQU9FLFVBQVUsTUFBTSxRQVBsQjtBQUFBLE1BU0UsUUFBUSxFQVRWOztBQVlBLE1BQ0UsY0FBYyxLQUFLLEtBQUwsQ0FBVyxDQUFDLFNBQVMsTUFBVixJQUFvQixTQUEvQixDQURoQjtBQUFBLE1BRUUsZ0JBQWdCLEtBQUssS0FBTCxDQUFXLENBQUMsV0FBVyxRQUFaLElBQXdCLFNBQW5DLENBRmxCO0FBQUEsTUFHRSxlQUFlLEtBQUssS0FBTCxDQUFXLENBQUMsVUFBVSxPQUFYLElBQXNCLFNBQWpDLENBSGpCOztBQU1BLFNBQU8sSUFBSSxTQUFYLEVBQXNCLEdBQXRCLEVBQTJCO0FBQ3pCLFFBQ0UsSUFBSSxVQUFVLGNBQWMsQ0FBZCxHQUFnQixDQUExQixDQUROO0FBQUEsUUFFRSxJQUFJLFlBQVksZ0JBQWdCLENBQWhCLEdBQWtCLENBQTlCLENBRk47QUFBQSxRQUdFLElBQUksV0FBVyxlQUFlLENBQWYsR0FBaUIsQ0FBNUIsQ0FITjtBQUlBLFVBQU0sSUFBTixDQUFXLElBQUksQ0FBSixHQUFRLENBQW5CO0FBQ0Q7O0FBRUQsU0FBTyxLQUFQO0FBQ0Q7O0FBRUQsU0FBUyxZQUFULENBQXNCLEtBQXRCLEVBQTZCLE1BQTdCLEVBQXFDO0FBQ25DLE1BQU0sU0FBUyxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBZjs7QUFFQSxTQUFPLEtBQVAsR0FBZSxLQUFmO0FBQ0EsU0FBTyxNQUFQLEdBQWdCLE1BQWhCO0FBQ0EsU0FBTyxNQUFQO0FBQ0Q7O0FBR0QsT0FBTyxPQUFQLEdBQWlCO0FBQ2YsYUFBVztBQURJLENBQWpCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0IHBoZWFzYW50ID0gcmVxdWlyZSgnLi9saWIvcGhlYXNhbnQuanMnKTtcblxuY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbnJlcS5vdmVycmlkZU1pbWVUeXBlKCdhcHBsaWNhdGlvbi9qc29uJyk7XG5yZXEub3BlbignR0VUJywgJ2RhdGEvZGFpbHktY3JpbWUtMjAxMC0yMDE1Lmpzb24nLCB0cnVlKTtcblxucmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgaWYgKHJlcS5yZWFkeVN0YXRlID09PSA0ICYmIHJlcS5zdGF0dXMgPT09IDIwMCkge1xuICAgIHBoZWFzYW50LnZpc3VhbGl6ZShKU09OLnBhcnNlKHJlcS5yZXNwb25zZVRleHQpLCAnY2FudmFzX2dvZXNfaGVyZScpO1xuICB9XG59XG5cbi8vIEZldGNoIHRoZSBkYXRhXG53aW5kb3cub25sb2FkID0gKCkgPT4gcmVxLnNlbmQobnVsbCk7XG5cbiIsIi8vIENyZWF0ZSBoZWF0IG1hcCBkYXRhIHZpc3VhbGl6YXRpb25cblxuLy8gQ3JlYXRlcyB0aGUgdmlzdWFsaXphdGlvblxuZnVuY3Rpb24gdmlzdWFsaXplKGRhdGEsIGRvbUVsZW1lbnRJZCwgb3B0cykge1xuICBcbiAgY29uc29sZS5sb2coJ3Zpc3VhbGl6aW5nLi4uJylcblxuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBtaW5Db2xvcjogMHhmMGYwZjAsXG4gICAgbWF4Q29sb3I6IDB4MDUwNTA1LFxuICAgIG51bVN0ZXBzOiA1ICAgIFxuICB9XG5cbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRvbUVsZW1lbnRJZCk7XG4gIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcyg1MDAsIDIwMCk7XG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gIGNvbnN0IHN0ZXBzID0gY2FsY3VsYXRlQ29sb3JTdGVwcyhvcHRpb25zLm1pbkNvbG9yLCBvcHRpb25zLm1heENvbG9yLCBvcHRpb25zLm51bVN0ZXBzKTtcblxuICBjb250ZXh0LmZpbGxSZWN0KDIwLCAyMCwgMTAwLCAxMDApO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVDb2xvclN0ZXBzKG1pbiwgbWF4LCBzdGVwQ291bnQpIHtcbiAgbGV0XG4gICAgbWluUmVkID0gbWluICYgMHhmZjAwMDAsXG4gICAgbWluR3JlZW4gPSBtaW4gJiAweDAwZmYwMCxcbiAgICBtaW5CbHVlID0gbWluICYgMHgwMDAwZmYsXG5cbiAgICBtYXhSZWQgPSBtYXggJiAweGZmMDAwMCxcbiAgICBtYXhHcmVlbiA9IG1heCAmIDB4MDBmZjAwLFxuICAgIG1heEJsdWUgPSBtYXggJiAweDAwMDBmZixcblxuICAgIHNldHBzID0gW11cbiAgO1xuXG4gIGNvbnN0IFxuICAgIHJlZFN0ZXBTaXplID0gTWF0aC5mbG9vcigobWF4UmVkIC0gbWluUmVkKSAvIHN0ZXBDb3VudCksXG4gICAgZ3JlZW5TdGVwU2l6ZSA9IE1hdGguZmxvb3IoKG1heEdyZWVuIC0gbWluR3JlZW4pIC8gc3RlcENvdW50KSxcbiAgICBibHVlU3RlcFNpemUgPSBNYXRoLmZsb29yKChtYXhCbHVlIC0gbWluQmx1ZSkgLyBzdGVwQ291bnQpXG4gIDtcblxuICBmb3IgKDsgaSA8IHN0ZXBDb3VudDsgaSsrKSB7XG4gICAgbGV0IFxuICAgICAgciA9IG1pblJlZCArIChyZWRTdGVwU2l6ZSAqIGkrMSksXG4gICAgICBnID0gbWluR3JlZW4gKyAoZ3JlZW5TdGVwU2l6ZSAqIGkrMSksXG4gICAgICBiID0gbWluQmx1ZSArIChibHVlU3RlcFNpemUgKiBpKzEpXG4gICAgc3RlcHMucHVzaChyIHwgZyB8IGIpO1xuICB9XG5cbiAgcmV0dXJuIHN0ZXBzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCkge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgLy8gVE9ETyBNYXliZSBkbyBzb21lIGNoZWNrcyBmb3IgdmlhYmlsaXR5IGhlcmVcbiAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIHJldHVybiBjYW52YXM7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHZpc3VhbGl6ZTogdmlzdWFsaXplXG59XG4iXX0=
