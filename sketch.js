let ballX = 100;
let ballY = 100;

let ballSize = 50;

let speedX = 3;
let speedY = 2;

let isPaused = false;

let isHolding = false;
let holdStartTime = 0;
let lastSpeedIncrease = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);

  // Increase speed while holding
  if (isHolding && millis() - lastSpeedIncrease >= 300) {
    speedX = constrain(
      speedX * 1.1, -12, 12
    );

    speedY = constrain(
      speedY * 1.1, -12, 12
    );

    lastSpeedIncrease = millis();
  }

  // Update ball position
  if (!isPaused) {
    ballX += speedX;
    ballY += speedY;
  }

  // Check left and right edges
  if (ballX + ballSize / 2 >= width) {
    ballX = width - ballSize / 2;
    speedX = -abs(speedX);
  }

  if (ballX - ballSize / 2 <= 0) {
    ballX = ballSize / 2;
    speedX = abs(speedX);
  }

  // Check top and bottom edges
  if (ballY + ballSize / 2 >= height) {
    ballY = height - ballSize / 2;
    speedY = -abs(speedY);
  }

  if (ballY - ballSize / 2 <= 0) {
    ballY = ballSize / 2;
    speedY = abs(speedY);
  }

  // Draw ball
  fill(50, 120, 220);
  noStroke();
  circle(ballX, ballY, ballSize);

  // Display instructions
  fill(0);
  textSize(16);
  textAlign(LEFT);

  text("BALL BOUNCING ANIMATION", 15, 25);
  text("LONG PRESS = Increase Speed", 15, 55);
  text("TAP = Pause / Resume", 15, 80);

  text(
    "Current Speed: " + abs(speedX).toFixed(1),
    15, 110
  );

  // Show status
  if (isPaused) {
    textSize(25);
    textAlign(CENTER);
    text("PAUSED", width / 2, height / 2);
  }

  if (isHolding) {
    textSize(18);
    textAlign(CENTER);
    text("INCREASING SPEED", width / 2, 170);
  }
}

// Start holding
function startHolding() {
  if (!isHolding) {
    isHolding = true;
    holdStartTime = millis();
    lastSpeedIncrease = millis();
  }
}

// Stop holding
function stopHolding() {
  isHolding = false;
}

// Phone controls
function touchStarted() {
  startHolding();
  return false;
}

function touchEnded() {
  stopHolding();

  // A short touch pauses or resumes
  if (millis() - holdStartTime < 250) {
    isPaused = !isPaused;
  }

  return false;
}

// Computer controls
function mousePressed() {
  startHolding();
  return false;
}

function mouseReleased() {
  stopHolding();

  // A short click pauses or resumes
  if (millis() - holdStartTime < 250) {
    isPaused = !isPaused;
  }

  return false;
}
