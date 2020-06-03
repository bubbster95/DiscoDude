let game, score, lives, hiScore = 0;
let areaX, areaY;
let nextTarget, spawnRate, spawnType = 0, targetSpeed;

function init() {
    started = false;
    game = setInterval(gameLoop, 33);
    console.log(game)
    score = 0, lives = 3, nextTarget = 0, spawnRate = 30, targetSpeed = 1,
    target = document.getElementsByClassName('target');
    bonus = document.getElementsByClassName('bonus');
    // game area dimensions
    areaY = getComputedStyle(document.querySelector('.game-area')).height
    areaX = getComputedStyle(document.querySelector('.game-area')).width
    areaX = parseInt(areaX)   
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
            randomSpawn(50, 50);
            nextTarget = 0;
        }
        if (bonus[0]) moveTarget(bonus[0], 'bonus');
        if (target[0]) moveTarget(target[0], 'target');
        if (target[0]) target[0].onmousedown = () => addPoint('target');
        if (bonus[0]) bonus[0].onmousedown = () => addBonus('bonus');
        if (score >= hiScore) hiScore = score;
        if (score%100 == 0 && score != 0) lives++, score+= 10;
    }
}

// add sprite animation within kill zone
    //fix kill zone placing to responsive

function start() {
    started = true;
    document.getElementById('start').style.display = 'none';
}

function restart() {
    document.getElementById('start').style.display = 'block';
    clearInterval(game);
    deleteAll('target');
    deleteAll('bonus')
    init();
}
function addBonus (className) {
    deleteTarget(className);
    score+=10;
}

function addPoint(className) {
    deleteTarget(className);
    score++;
    if (score%20 == 0) spawnType = 1;
    if(score%20 == 0 && score < 30) targetSpeed+= 1;
    if(score%10 == 0 && score > 30) targetSpeed+= 1;
    if(score%5 == 0 && score > 60) targetSpeed+= 1;
}

function looseLife(className) {
    deleteTarget(className);
    if (targetSpeed > 1) targetSpeed--; 
    lives--;
    document.getElementById('lives').innerHTML = "Lives: " + lives;
    if (lives == 0) gameOver();
}

function deleteTarget(className) {
    const element = document.getElementsByClassName(className);
    element[0].parentNode.removeChild(element[0]);
}

function deleteAll(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0) elements[0].parentNode.removeChild(elements[0]);
}

function randomSpawn(top, bottom) {
    const newTarget = document.createElement('BUTTON');
    if (spawnType == 1) {
        newTarget.setAttribute('class', 'bonus');
        spawnType = 0;
    } else newTarget.setAttribute('class', 'target');
    //toggle sides at random
    if (Math.round(Math.random()) == 1) newTarget.style.left = -30 + 'px';
    else newTarget.style.left = parseInt(areaX) + 'px';
    //spawn within margins (top, bottom)
    newTarget.style.top = (Math.random() * (parseInt(areaY)-top-bottom) + top) + 'px';

    document.querySelector('.game-area').appendChild(newTarget); 
}

function moveTarget(target, name) {
    let tarPos = parseInt(target.style.left);
    if (tarPos < parseInt(areaX)/2 + 10 && tarPos > parseInt(areaX)/2 - 50) {
        if (name == 'target') looseLife('target');
        if (name == 'bonus') deleteTarget('bonus');
    }
    if (tarPos > parseInt(areaX)/2) target.style.left = tarPos - targetSpeed + 'px';
    else target.style.left = tarPos + targetSpeed + 'px';
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

    
//nthchil
//nthchildoftype
//different enemy == different class

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
