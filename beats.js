let game;
let nextTarget;
let speed = 10;
let areaX, areaY;

function init() {
    game = setInterval(gameLoop, 33);
    nextTarget = 0;

    //game area dimensions
    areaY = getComputedStyle(document.querySelector('.game-area')).height
    areaX = getComputedStyle(document.querySelector('.game-area')).width   
}
    
function gameLoop() {
    nextTarget++;
    if (nextTarget == speed) {
        // spawnTarget(50, 50)
        randomSpawn(50, 50);
        nextTarget = 0;
    }
    moveTarget(5, 0);

}

function moveTarget(x, y) {
    const target = document.querySelector('.game-area > button')
    if (parseInt(target.style.left) > parseInt(areaX)/2) {
        target.style.left = (parseInt(target.style.left) - x) + 'px';
        target.style.top = (parseInt(target.style.top) + y) + 'px';
    } else{
        target.style.left = (parseInt(target.style.left) + x) + 'px';
        target.style.top = (parseInt(target.style.top) + y) + 'px';
    }
    document.querySelector('.game-area').appendChild(target);
}

function spawnTarget(x, y) {
    const target = document.createElement('BUTTON');
    target.style.left = x + 'px';
    target.style.top = y + 'px';
    document.querySelector('.game-area').appendChild(target); 
}

function randomSpawn(top, bottom) {
    const target = document.createElement('BUTTON');
    //toggle sides at random
    toggle = Math.random();
    if (Math.round(toggle) == 1) target.style.left = -20 + 'px';
    else target.style.left = parseInt(areaX) + 'px';
    //spawn withing margins (top, bottom)
    target.style.top = (Math.random() * (parseInt(areaY)-top-bottom) + top) + 'px';
    
    document.querySelector('.game-area').appendChild(target);
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
