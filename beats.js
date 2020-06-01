let game, score = 0, lives = 2;
let areaX, areaY;
let target, nextTarget, spawnRate = 30, targetSpeed = 2;

function init() {
    game = setInterval(gameLoop, 33);
    nextTarget = 0;
    document.querySelector('.game-area > p').style.display = 'none';
    //game area dimensions
    areaY = getComputedStyle(document.querySelector('.game-area')).height
    areaX = getComputedStyle(document.querySelector('.game-area')).width 
    randomSpawn(50, 50)  
}

function gameOver() {
    clearInterval(game);
    document.querySelector('.game-area > p').style.display = 'block';
    document.querySelector('.game-area > svg').style.display = 'none';
}

function restart() {
    document.location.reload(false);
}
    
function gameLoop() {
    target = document.querySelector('.game-area > button');
    if (lives == -1) {
        gameOver();
    }
    nextTarget++;
    if (nextTarget == spawnRate) {
        randomSpawn(50, 50);
        nextTarget = 0;
    }
    if (target) moveTarget(targetSpeed, 0);
    if (target) target.onmousedown = () => addPoint(target);
}

function addPoint(target) {
    target.parentNode.removeChild(target)
    score++;
    document.getElementById('scoreCard').innerHTML = "Score: "+ score;
    if(targetSpeed < 20) {
        targetSpeed+= .1;
    }
}

function deleteTarget(target) {
    target.parentNode.removeChild(target);
}

function moveTarget(x, y) {
    const target = document.querySelector('.game-area > button');
    if (parseInt(target.style.left) < parseInt(areaX)/2 + 10 &&
        parseInt(target.style.left) > parseInt(areaX)/2 - 50){
        deleteTarget(target);
        document.getElementById('lives').innerHTML = "Lives: " + lives;
        lives--;
    }
    if (parseInt(target.style.left) > parseInt(areaX)/2) {
        target.style.left = (parseInt(target.style.left) - x) + 'px';
        target.style.top = (parseInt(target.style.top) + y) + 'px';
    } else{
        target.style.left = (parseInt(target.style.left) + x) + 'px';
        target.style.top = (parseInt(target.style.top) + y) + 'px';
    }
    // document.querySelector('.game-area').appendChild(target);
}

function randomSpawn(top, bottom) {
    const target = document.createElement('BUTTON');
    //toggle sides at random
    toggle = Math.random();
    if (Math.round(toggle) == 1) target.style.left = -30 + 'px';
    else target.style.left = parseInt(areaX) + 'px';
    //spawn withing margins (top, bottom)
    target.style.top = (Math.random() * (parseInt(areaY)-top-bottom) + top) + 'px';
    
    document.querySelector('.game-area').appendChild(target);
    // target.addEventListener('click', addPoint(target));   
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

    

// function spawnTarget(x, y) {
//     const target = document.createElement('BUTTON');
//     target.style.left = x + 'px';
//     target.style.top = y + 'px';
//     document.querySelector('.game-area').appendChild(target); 
// }

// stuff flys across
    // make the stuff
    // make the stuff fly
// clicking it deletes it
    // make the stuff do something when clicked
    // make the stuff delete

// later: slashing instead
