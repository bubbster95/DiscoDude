let game, score, lives, hiScore = 0;
let areaX, areaY;
let nextTarget, spawnRate, spawnType = 0, targetSpeed;

function init() {
    started = false;
    game = setInterval(gameLoop, 33);
    score = 0, lives = 3, nextTarget = 0, spawnRate = 30, targetSpeed = 1,
    target = document.getElementsByClassName('target');
    bonus = document.getElementsByClassName('bonus');
    bomb = document.getElementsByClassName('bomb');
    // game area dimensions
    areaY = getComputedStyle(document.querySelector('.game-area')).height
    areaX = getComputedStyle(document.querySelector('.game-area')).width  
    // Kill Zone and Game Over toggle
    document.querySelector('.game-area > p').style.display = 'none';
    document.querySelector('.game-area > svg').style.display = 'block';
}
    
function gameLoop() {
    document.getElementById('scoreCard').innerHTML = "Score: "+ score;
    document.getElementById('lives').innerHTML = "Lives: " + lives;
    document.getElementById('highScore').innerHTML = "High Score: "+ hiScore;
    if (started == true) {
        nextTarget++;
        if (nextTarget == spawnRate) {
            spawn(50, 50);
            nextTarget = 0;
        }
        // move
        if (bonus[0]) moveTarget(bonus[0], 'bonus');
        if (target[0]) moveTarget(target[0], 'target');
        if (bomb[0]) moveTarget(bomb[0], 'bomb');
        // click
        if (target[0]) target[0].onmousedown = () => addPoint('target');
        if (bonus[0]) bonus[0].onmousedown = () => bonusPoint('bonus');
        if (bomb[0]) bomb[0].onmousedown = () => looseLife('bomb');
        // scores
        if (score >= hiScore) hiScore = score;
        if (score%100 == 0 && score != 0) lives++, score+= 10;
    }
}

function start() {
    started = true;
    document.getElementById('start').style.display = 'none';
}

function spawn(top, bottom) {
    const newTarget = document.createElement('BUTTON');
    if (spawnType == 0) newTarget.setAttribute('class', 'target');
    if (spawnType == 1) {
        newTarget.setAttribute('class', 'bonus');
        spawnType = 0;
    } if (spawnType == 2) {
        newTarget.setAttribute('class', 'bomb');
        spawnType = 0;
    }
    // Spawn location
    if (Math.round(Math.random()) == 1) newTarget.style.left = -30 + 'px';
    else newTarget.style.left = parseInt(areaX) + 'px';
    newTarget.style.top = (Math.random() * (parseInt(areaY)-top-bottom) + top) + 'px';
    document.querySelector('.game-area').appendChild(newTarget); 
}

function moveTarget(target, name) {
    let tarPos = parseInt(target.style.left);
    if (tarPos < parseInt(areaX)/2 + 10 && tarPos > parseInt(areaX)/2 - 50) {
        if (name == 'target') looseLife(name);
        if (name == 'bonus') deleteTarget(name);
        if (name == 'bomb') { addPoint(name); 
            if (targetSpeed > 1) targetSpeed--;
        }
    }
    if (tarPos > parseInt(areaX)/2) target.style.left = tarPos - targetSpeed + 'px';
    else target.style.left = tarPos + targetSpeed + 'px';
}

function spawnChange(diceRoll) {
    spawnType = Math.round(diceRoll * 2);
}

function bonusPoint (className) {
    deleteTarget(className);
    score+=10;
}

function addPoint(className) {
    deleteTarget(className);
    score++;
    if (className == 'bomb') score++;
    if (score%20 == 0) spawnChange(Math.random());
    if(score%20 == 0 && score < 30) targetSpeed+= 1;
    if(score%10 == 0 && score > 30) targetSpeed+= 1;
    if(score%5 == 0 && score > 60) targetSpeed+= 1;
    //speed cap
    if(targetSpeed > 10) targetSpeed = 10;
    // console.log(targetSpeed)
}

function looseLife(className) {
    deleteTarget(className);
    if (targetSpeed > 1) targetSpeed--; 
    lives--;
    document.getElementById('lives').innerHTML = "Lives: " + lives;
    if (lives == 0) gameOver();
    else lifeAnimation();
}

function lifeAnimation() {
    let int = setInterval(frame, 33);
    let frames = 0
    function frame() {
        frames++;
        console.log('frame', frames)
        if (frames == 10){
            clearInterval(int);
            document.querySelector('.game-area > svg').style.display = 'block';
        }
        else document.querySelector('.game-area > svg').style.display = 'none'; 
    }
 
}

function deleteTarget(className) {
    const element = document.getElementsByClassName(className);
    element[0].parentNode.removeChild(element[0]);
}

function pause() {
    const button = document.querySelector('.pause-button');
    if (button.innerText == 'Pause' && lives > 0) {
        clearInterval(game);
        button.innerText = 'Unpause';
    } else if (lives > 0){
        game = setInterval(gameLoop, 33);
        button.innerText = 'Pause';
    }    
}

function gameOver() {
    clearInterval(game);
    deleteAll('target');
    document.getElementById('game-over').innerHTML = 'Game Over!<h6 class="score">Score:'+score+'</h6>';
    document.querySelector('.game-area > p').style.display = 'block';
    document.querySelector('.game-area > svg').style.display = 'none';
}

function restart() {
    document.getElementById('start').style.display = 'block';
    clearInterval(game);
    deleteAll('target');
    deleteAll('bonus')
    init();
}

function deleteAll(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0) elements[0].parentNode.removeChild(elements[0]);
}

//nthchil
//nthchildoftype

// function spawnTarget(x, y) {
//     const target = document.createElement('BUTTON');
//     target.style.left = x + 'px';
//     target.style.top = y + 'px';
//     document.querySelector('.game-area').appendChild(target); 
// }

// later: slashing instead
//fix kill zone placing to responsive
