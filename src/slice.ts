const cvs = document.querySelector('#canvas-slice') as HTMLCanvasElement;

const ctx = cvs.getContext('2d');
cvs.width = 1400;
cvs.height = 1000;

// cvs.style.setProperty('display', 'none');

cvs.addEventListener('click', draw);

const coordsList = [];

function draw(e) {
  drawPoint(e);
  drawBoundLine();
}

function drawPoint(e) {
  if (coordsList.length < 4) {
    const RADIUS = 10;

    const coords = {
      x: e.layerX,
      y: e.layerY,
    };

    coordsList.push(coords);

    ctx.beginPath();
    ctx.arc(coords.x, coords.y, RADIUS, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function drawBoundLine() {
  if (coordsList.length <= 4) {
    ctx.moveTo(coordsList[0].x, coordsList[0].y);
    for (let i = 0; i < coordsList.length; ++i) {
      const currentCoord = coordsList[i];
      ctx.lineTo(currentCoord.x, currentCoord.y);
      ctx.lineWidth = 5;
    }
  }
  if (coordsList.length === 4) {
    ctx.closePath();
  }
  ctx.stroke();
}
