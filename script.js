const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin');
const resultText = document.getElementById('result');

const segments = ['Reto', 'Verdad', 'Beso', 'Tortazo', 'Cubata Gratis', 'Chupito Gratis'];
const colors = ['#FF6347', '#FFA500', '#FFD700', '#ADFF2F', '#40E0D0', '#1E90FF'];
let currentAngle = 0;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function drawSegment(angle, index) {
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, angle, angle + Math.PI / 3);
    ctx.fillStyle = colors[index];
    ctx.fill();
    ctx.stroke();

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(angle + Math.PI / 6);
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 20px Arial";
    ctx.fillText(segments[index], 240, 10);
    ctx.restore();
}

function drawWheel() {
    for (let i = 0; i < segments.length; i++) {
        drawSegment(currentAngle + (i * Math.PI / 3), i);
    }
}

function rotateWheel() {
    currentAngle += (spinAngleStart - (spinTime / spinTimeTotal) * spinAngleStart);
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    drawWheel();
    requestAnimationFrame(rotateWheel);
}

function stopRotateWheel() {
    const degrees = (currentAngle * 180 / Math.PI) + 90;
    const arcd = (360 / segments.length);
    const index = Math.floor((360 - degrees % 360) / arcd);
    resultText.innerText = `¡Felicidades! Te ha tocado: ${segments[index]}`;
}

function startSpin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotateWheel();
}

spinButton.addEventListener('click', startSpin);

drawWheel();
