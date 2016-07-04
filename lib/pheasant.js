// Create heat map data visualization

// Creates the visualization
function visualize(data, domElementId, opts) {
  
  console.log('visualizing...')

  let options = {
    minColor: 0xf0f0f0,
    maxColor: 0x050505,
    numSteps: 5    
  }

  const element = document.getElementById(domElementId);
  const canvas = createCanvas(500, 200);
  element.appendChild(canvas);
  const context = canvas.getContext('2d');

  const steps = calculateColorSteps(options.minColor, options.maxColor, options.numSteps);

  context.fillRect(20, 20, 100, 100);
}

function calculateColorSteps(min, max, stepCount) {
  let
    minRed = min & 0xff0000,
    minGreen = min & 0x00ff00,
    minBlue = min & 0x0000ff,

    maxRed = max & 0xff0000,
    maxGreen = max & 0x00ff00,
    maxBlue = max & 0x0000ff,

    setps = []
  ;

  const 
    redStepSize = Math.floor((maxRed - minRed) / stepCount),
    greenStepSize = Math.floor((maxGreen - minGreen) / stepCount),
    blueStepSize = Math.floor((maxBlue - minBlue) / stepCount)
  ;

  for (; i < stepCount; i++) {
    let 
      r = minRed + (redStepSize * i+1),
      g = minGreen + (greenStepSize * i+1),
      b = minBlue + (blueStepSize * i+1)
    steps.push(r | g | b);
  }

  return steps;
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
