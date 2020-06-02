let game, score, lives, hiScore = 0;
let areaX, areaY;
let target, nextTarget, spawnRate, targetSpeed;

function init() {
    game = setInterval(gameLoop, 33);
    score = 0, lives = 3, nextTarget = 0, spawnRate = 30, targetSpeed = 1;
    gameLoop(1),
    // game area dimensions
    areaY = getComputedStyle(document.querySelector('.game-area')).height
    areaX = getComputedStyle(document.querySelector('.game-area')).width   
    // Kill Zone and Game Over toggle
    document.querySelector('.game-area > p').style.display = 'none';
    document.querySelector('.game-area > svg').style.display = 'block';
}
    
function gameLoop() {
    target = document.querySelector('.game-area > button');
    document.getElementById('scoreCard').innerHTML = "Score: "+ score;
    document.getElementById('lives').innerHTML = "Lives: " + lives;
    document.getElementById('highScore').innerHTML = "High Score: "+ hiScore;
    if (lives <= 0) {
        gameOver();
    }
    nextTarget++;
    if (nextTarget == spawnRate) {
        randomSpawn(50, 50);
        nextTarget = 0;
    }
    if (target) moveTarget(targetSpeed, 0);
    if (target) target.onmousedown = () => addPoint(target);
    if (score >= hiScore) hiScore = score;
    if (score%100 == 0 && score != 0) lives++, score+= 10;
}

// add sprite animation within kill zone
    //fix kill zone placing to responsive

function start() {
    game = setInterval(gameLoop, 33);
}

function restart() {
    clearInterval(game);
    deleteAll('target');

    init();
}

function addPoint(target) {
    
    target.parentNode.removeChild(target)
    score++;
    if(score%10 == 0 && score < 30){
        targetSpeed+= .5;
    }
    if(score%20 == 0 && score > 30) {
        targetSpeed+= 1;
    }
    if(score%10 == 0 && score > 60) {
        targetSpeed+= 1;
    }
}

function looseLife(target) {
    deleteTarget(target);
    document.getElementById('lives').innerHTML = "Lives: " + lives;
    if (targetSpeed > 1) targetSpeed--;
    lives--;
    // document.getElementById('kill-bar').innerHTML = style="fill: yellow;";
}

function deleteTarget(target) {
    target.parentNode.removeChild(target);
}

function deleteAll(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0) elements[0].parentNode.removeChild(elements[0]);
}

//nthchil
//nthchildoftype
//different enemy == different class


function moveTarget(x, y) {
    const target = document.querySelector('.game-area > button');
    // const target = document.getElementByClassName("target");
    if (parseInt(target.style.left) < parseInt(areaX)/2 + 10 &&
        parseInt(target.style.left) > parseInt(areaX)/2 - 50){
            looseLife(target);
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
    target.setAttribute("class", "target");
    // console.log(target.className)
    toggle = Math.random();
    //toggle sides at random
    if (Math.round(toggle) == 1) target.style.left = -30 + 'px';
    else target.style.left = parseInt(areaX) + 'px';
    //spawn withing margins (top, bottom)
    target.style.top = (Math.random() * (parseInt(areaY)-top-bottom) + top) + 'px';
    
    document.querySelector('.game-area').appendChild(target); 
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
    document.getElementById('game-over').innerHTML = 'Game Over!<h6 class="score">Score:'+score+'</h6>';
    document.querySelector('.game-area > p').style.display = 'block';
    document.querySelector('.game-area > svg').style.display = 'none';
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
