// Elements
const leftEye = document.querySelector('.left-iris');
const rightEye = document.querySelector('.right-iris');
const leftEyeBlink = document.querySelector('.left-eye .blink');
const rightEyeBlink = document.querySelector('.right-eye .blink');
const leftEyeBlinkBottom = document.querySelector('.left-eye .blink-bottom');
const rightEyeBlinkBottom = document.querySelector('.right-eye .blink-bottom');

// Variables
let lastBlinkTime = Date.now();

// Functions
function moveEyes(xOffset, yOffset) {
    const maxMovement = 30;
    const xMove = Math.max(-maxMovement, Math.min(maxMovement, xOffset * maxMovement * 2));
    const yMove = Math.max(-maxMovement, Math.min(maxMovement, yOffset * maxMovement * 2));
    
    // Apply movement with proper centering
    leftEye.style.transform = `translate(-50%, -50%) translate(${xMove}px, ${yMove}px)`;
    rightEye.style.transform = `translate(-50%, -50%) translate(${xMove}px, ${yMove}px)`;
    
    // Pupil size adjustment
    const attention = 0.8 - (Math.abs(xOffset) + Math.abs(yOffset)) * 0.5;
    const pupilSize = Math.max(20, Math.min(35, 30 + attention * 10));
    document.querySelectorAll('.pupil').forEach(pupil => {
        pupil.style.width = pupilSize + 'px';
        pupil.style.height = pupilSize + 'px';
    });
}

function blink() {
    leftEyeBlink.style.top = '0%';
    rightEyeBlink.style.top = '0%';
    leftEyeBlinkBottom.style.bottom = '0%';
    rightEyeBlinkBottom.style.bottom = '0%';
    setTimeout(() => {
        leftEyeBlink.style.top = '-100%';
        rightEyeBlink.style.top = '-100%';
        leftEyeBlinkBottom.style.bottom = '-100%';
        rightEyeBlinkBottom.style.bottom = '-100%';
    }, 150);
}

function randomBlink() {
    const now = Date.now();
    if (now - lastBlinkTime > 2000) {
        blink();
        lastBlinkTime = now;
        if (Math.random() < 0.3) {
            setTimeout(blink, 400);
        }
    }
    const nextBlinkTime = 2000 + Math.random() * 4000;
    setTimeout(randomBlink, nextBlinkTime);
}

// Mouse movement event
document.addEventListener('mousemove', (e) => {
    const xPercent = (e.clientX / window.innerWidth) - 0.5;
    const yPercent = (e.clientY / window.innerHeight) - 0.5;
    moveEyes(xPercent, yPercent);
});

// Click to blink
document.addEventListener('click', blink);

// Start random blinking
randomBlink();