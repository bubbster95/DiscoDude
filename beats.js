let game;
let nextTarget;

function init() {
    game = setInterval(gameLoop, 33);
    nextTarget = 0;

    spawnTarget(50, 10); // TEMPORARY for testing
}

function gameLoop() {
    // nextTarget++;
    // if (nextTarget == 30) {
    //     spawnTarget(50, 10);
    //     nextTarget = 0;
    // }

    // Assignment1: every gameLoop, move each target 10px to the right, and down
    // Assignment2: randomize spawn location
    // Assignment3: randomize movement
}

function spawnTarget(x, y) {
    const btn = document.createElement('BUTTON');
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    document.querySelector('.game-area').appendChild(btn);
}

function pause() {
    const button = document.querySelector('.pause-button');
    if (button.innerText == 'Pause') {
        clearInterval(game);
        button.innerText = 'Unpause';
    } else {
        game = setInterval(gameLoop, 33);
        button.innerText = 'Pause';
    }
    
}

// stuff flys across
    // make the stuff
    // make the stuff fly
// clicking it deletes it
    // make the stuff do something when clicked
    // make the stuff delete

// later: slashing instead
