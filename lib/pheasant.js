// Create heat map data visualization

// Creates the visualization
function visualize(data, domElementId, opts) {
  
  let options = {
    minColor: 0xfbfbfb,
    maxColor: 0x606060,
    numSteps: 10,
    cellWidth: 6,
    cellHeight: 6,
    cellSpacing: 2
  }

  const element = document.getElementById(domElementId);
  const canvas = createCanvas(365 * options.cellWidth, 1000);
  element.appendChild(canvas);
  const context = canvas.getContext('2d');

  const stepColors = calculateColorSteps(options.minColor, options.maxColor, options.numSteps);
  const valueSteps = calculateValueSteps(data, options.numSteps);

  console.log(valueSteps)

  // Ensure the data is keyed by Epoch time values - easier to work with
  data = ensureEpochKeys(data);

  // Find start and end keys
  let {start, end} = findStartAndEndTimes(data);

  let x = 0, y = 0, yearOffset = 0;
  const w = options.cellWidth, h = options.cellHeight; // TODO dynamically calculate these from the time dimensions

  for (let year of eachYear(parseInt(start), parseInt(end))) {
    // Set x back to 0, and move y down if needed
    x = 0;

    for (let day of eachDay(year)) {
      // Set x over one and move y back up to the year offset
      y = yearOffset;

      for (let hour of eachHour(day)) {
        // Draw the block onto the canvas
        let value = data[hour];
        let color = getColor(value, valueSteps, stepColors);

        context.fillStyle = color;
        context.fillRect(x, y, w, h);
        y += h + options.cellSpacing;
      }

      x += w + options.cellSpacing;
    }

    yearOffset += (h + options.cellSpacing) * 24;
  }

}

function getColor(value, valueSteps, stepColors) {
  let 
    index = 0,
    color = '#ffffff'; // White is default

  // TODO Handle negative numebers, or at least 0, a little better
  if (value) {
    do {
      color = stepColors[index];
    } while (index < valueSteps.length && value > valueSteps[index++]);
  }

  return color;
}

// Yields Jan 1 at Midnight in Epoch milliseconds starting at start year, ending with end year
function* eachYear(start, end) {
  let 
    current = new Date((new Date(start)).getUTCFullYear(), 0),
    endDate = new Date((new Date(end)).getUTCFullYear(), 12),
    endYear = endDate.getUTCFullYear()
  ;

  while (current.getUTCFullYear() < endYear) {
    yield current.getTime();
    current.setUTCFullYear(current.getUTCFullYear() + 1);
  }
}

// Yields midnight in milliseconds for each day in the year (handles leap year)
function* eachDay(year) {
  let
    date = 1,
    month = 0,
    current = new Date((new Date(year)).getUTCFullYear(), 0),
    end = new Date((new Date(year)).getUTCFullYear(), 12)
  ;

  while (current.getTime() < end.getTime()) {
    
    yield current.getTime();

    current.setUTCDate(++date);

    let currentMonth = current.getUTCMonth();
    if (currentMonth > month) {
      current.setUTCMonth(++month);
      current.setUTCDate(date = 1);
      month = currentMonth;
    }
  }
}

// Yields start of hour in milliseconds for each hour in the day
function* eachHour(day) {
  let
    hours = 0,
    hourMilliseconds = 60 * 60 * 1000,
    dayDate = new Date(day),
    current = (new Date(dayDate.getUTCFullYear(), dayDate.getUTCMonth(), dayDate.getUTCDate())).getTime(),
    end = current + 24 * hourMilliseconds
  ;

  while (current <= end) {
    yield current;
    current += hourMilliseconds;
  }
}

// function eachHour*(start, end, step = 60 * 60 * 1000) {
//   let current = start;
//   while (current <= end) {
//     yield current;
//     current += step;
//   }
// }

function findStartAndEndTimes(data) {
  let 
    start = new Date(),
    end = new Date()
  ;

  end.setYear(1000) // Maybe there's a better way?

  for (let k in data) {
    if (k < start) start = k;
    if (k > end) end = k;
  }

  return { start: start, end: end }
}

function ensureEpochKeys(data) {
  let r = {}
  Object.keys(data).forEach(k => {
    let d = new Date(k),
      offset = d.getTimezoneOffset() * 60 * 1000;
    
    r[d.getTime() + offset] = data[k]
  });
  return r;
}

function calculateValueSteps(data, stepCount) {
  const 
    values = getValues(data).sort((a, b) => a === b ? 0 : a < b ? -1 : 1),
    stepSize = Math.round(values.length / stepCount)
  ;

  let steps = [];

  for (let i = 0; i < stepCount; i++) {
    let index = stepSize * (i + 1);
    if (index >= values.length) break;
    steps.push(values[index]);
  }

  console.log('foo')
  console.log(values[values.length - 50]);

  return steps;
}

function getValues(obj) {
  return Object.keys(obj).map(k => obj[k]);
}

function calculateColorSteps(min, max, stepCount) {
  // TODO Put this in its own module.
  const
    minRed = min & 0xff0000,
    minGreen = min & 0x00ff00,
    minBlue = min & 0x0000ff,

    maxRed = max & 0xff0000,
    maxGreen = max & 0x00ff00,
    maxBlue = max & 0x0000ff,
  
    redStepSize = ((minRed - maxRed) / stepCount) & 0xff0000,
    greenStepSize = ((minGreen - maxGreen) / stepCount) & 0x00ff00,
    blueStepSize = ((minBlue - maxBlue) / stepCount) & 0x0000ff
  ;

  let steps = [];

  for (let i = 0; i < stepCount; i++) {
    let 
      r = maxRed + (redStepSize * i),
      g = maxGreen + (greenStepSize * i),
      b = maxBlue + (blueStepSize * i)
    ;

    steps.push(r | g | b);
  }

  return steps.map((n) => `#${n.toString(16)}`).reverse();
}

function createCanvas(width, height) {
  const canvas = document.createElement('canvas');
  // TODO Maybe do some checks for viability here
  canvas.width = width;
  canvas.height = height;
  return canvas;
}


module.exports = {
  visualize: visualize
}
