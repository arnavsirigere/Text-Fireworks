let fireworks = [];
let gravity;
let letter;
let textCounter = 0;
let font;
let input;

function preload() {
  font = loadFont('fonts/ARIMO-ITALIC.TTF');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  createP('<= YOUR TEXT FOR THE FIREWORK!').style('font-size', '16pt').position(145, height - 9);
  input = createInput('HELLO').style('width', '120px').input(() => {
    letter = input.value().replace(/\s/g, '').split('');
    textCounter = 0;
    if (letter.length < 1) {
      letter = 'HELLO'.split('');
     }
  });
  letter = input.value().replace(/\s/g, '');
  gravity = createVector(0, 0.2);
  addFirework();
  setInterval(addFirework, 2000);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25);
  renderFireworks();
}

function addFirework() {
  fireworks.push(new Firework());
}

function renderFireworks() {
  for (var i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}
