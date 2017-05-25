var soundSpots = [];
var makingTime = 0;
var makingSpot = false;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  smooth();
}

function draw() {
  background(0);
  let i = soundSpots.length;
  while (i--) {
    soundSpots[i].draw();
  }
  if (makingSpot) { drawNewSpot() }
}

function SoundSpot(xpos, ypos, intensity) {
  this.x = xpos;
  this.y = ypos;
  this.intensity = intensity;

  this.draw = function() {
    fill(255);
    ellipse(this.x, this.y, this.intensity);
  }
}

function drawNewSpot() {
  fill(255);
  ellipse(mouseX, mouseY, frameCount - makingTime);
}

function mousePressed() {
  var i = soundSpots.length;
  newSpot = true;
  while (i--) {
    if (dist(soundSpots[i].x, soundSpots[i].y, mouseX, mouseY) < soundSpots[i].intensity/2) {
      soundSpots.splice(i, 1);
      newSpot = false;
    }
  }
  if (newSpot) {
    makingSpot = true;
    makingTime = frameCount;
  }
}

function mouseReleased() {
  if (makingSpot) {
    makingSpot = false;
    soundSpots.push(new SoundSpot(mouseX, mouseY, frameCount - makingTime))
  }
}
