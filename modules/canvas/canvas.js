export function setupCanvasIP(interactivePanelPlayArea) {
  const canvas = document.createElement("canvas");
  const parentDiv = document.createElement("div");

  parentDiv.classList.add("ip__canvas-container");
  interactivePanelPlayArea.appendChild(parentDiv);

  parentDiv.appendChild(canvas);
  canvas.classList.add("ip__canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, 400, 400);
  createShip(ctx);
}

function createShip(ctx) {
  ctx.beginPath();
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.arc(200, 200, 50, 0, Math.PI * 2, true);
  ctx.fill();
}
