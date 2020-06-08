let game, score, lives, hiScore = 0;
let areaX, areaY;
let nextTarget, spawnRate, spawnType = 0, targetSpeed;
let dance = 3, wait = 0, busy = false;

init = () => {
    started = false;
    game = setInterval(gameLoop, 33);
    score = 0, lives = 3, nextTarget = 0, spawnRate = 30, targetSpeed = 1,
    target = document.getElementsByClassName('target');
    bonus = document.getElementsByClassName('bonus');
    bomb = document.getElementsByClassName('bomb');
    slow = document.getElementsByClassName('slow');
    // game area dimensions
    areaY = getComputedStyle(document.querySelector('.game-area')).height
    areaX = getComputedStyle(document.querySelector('.game-area')).width  
    // Kill Zone and Game Over toggle
    document.querySelector('.game-area > p').style.display = 'none';
    document.getElementById('disco-dude').style.display = 'block';
}
    
gameLoop = () => {
    document.getElementById('scoreCard').innerHTML = "Score: "+ score;
    document.getElementById('lives').innerHTML = "Lives: " + lives;
    document.getElementById('highScore').innerHTML = "High Score: "+ hiScore;  
    console.log(busy)
    wait++;
    if (wait == 15 && busy == false) {
        idol();
        wait = 0;
    }

    if (started == true) {
        if (!target[0]) spawn(50, 50);
        // scores
        if (score >= hiScore) hiScore = score;
        if (score%100 == 0 && score != 0) lives++, score+= 10;
        // move
        if (target[0]) moveTarget(target[0], 'target');
        if (bonus[0]) moveTarget(bonus[0], 'bonus');
        if (bomb[0]) moveTarget(bomb[0], 'bomb');
        if (slow[0]) moveTarget(slow[0], 'slow');
        // click
        if (target[0]) target[0].onmousedown = () => addPoint('target');
        if (bonus[0]) bonus[0].onmousedown = () => bonusPoint('bonus');
        if (bomb[0]) bomb[0].onmousedown = () => looseLife('bomb');
        if (slow[0]) slow[0].onmousedown = () => slowMo('slow');
    }
}

start = () => {
    started = true;
    document.getElementById('start').style.display = 'none';
}

spawn = (top, bottom) => {
    const newTarget = document.createElement('img');
    if (spawnType == 0) {
        newTarget.setAttribute('class', 'target');
        newTarget.src = 'assets/Target.png'
    }
    if (spawnType == 1) {
        newTarget.setAttribute('class', 'bonus');
        newTarget.src = 'assets/Bonus.png'
        spawnType = 0;
    } if (spawnType == 2) {
        newTarget.setAttribute('class', 'bomb');
        newTarget.src = 'assets/Bomb.png'
        spawnType = 0;
    } if (spawnType == 3) {
        newTarget.setAttribute('class', 'slow');
        newTarget.src = 'assets/Slow.png'
        spawnType = 0;
    }
    // Spawn location
    if (Math.round(Math.random()) == 1) newTarget.style.left = 10 - 80 + 'px';
    else newTarget.style.left = parseInt(areaX) + 40 + 'px';
    newTarget.style.top = (Math.random() * (parseInt(areaY)-top-bottom) + top) + 'px';
    document.querySelector('.game-area').appendChild(newTarget); 
}

moveTarget = (target, name) => {
    let tarPos = parseInt(target.style.left);
    if (tarPos < parseInt(areaX)/2 + 30 && tarPos > parseInt(areaX)/2 - 30) {
        if (name == 'target') looseLife(name);
        if (name == 'bonus') deleteTarget(name);
        if (name == 'slow') deleteTarget(name);
        if (name == 'bomb') addPoint(name); 
    }
    if (tarPos > parseInt(areaX)/2) target.style.left = tarPos - targetSpeed + 'px';
    else target.style.left = tarPos + targetSpeed + 'px';
}

spawnChange = (diceRoll) => {
    spawnType = Math.ceil(diceRoll * 3);
}

bonusPoint = (className) => {
    deleteTarget(className);
    score+=10;
}

addPoint = (className) => {
    discoAnimation('dance');
    deleteTarget(className);
    score++;
    if (className == 'bomb') score++;
    if (score%20 == 0) spawnChange(Math.random());
    if(score%20 == 0 && score < 30) targetSpeed+= 1;
    if(score%10 == 0 && score > 30) targetSpeed+= 1;
    if(score%10 == 0 && score > 60) targetSpeed+= 1;
    //speed cap
    if(targetSpeed > 10) targetSpeed = 10;
    console.log(targetSpeed)
}

looseLife = (className) => {
    deleteTarget(className);
    if (targetSpeed > 1) targetSpeed--; 
    lives--;
    document.getElementById('lives').innerHTML = "Lives: " + lives;
    if (lives == 0) gameOver();
    else discoAnimation('life');
}

slowMo = (className) => {
    if (targetSpeed > 1) targetSpeed--;
    deleteTarget(className);
}

idol = () => {
    let int = setInterval(frame, 33);
    let frames = 0
    function frame() {
        frames++;
        if (frames == 5) {
            clearInterval(int);
            document.disco.src='assets/DiscoDanceSprite1.png';
        } else document.disco.src='assets/DiscoDanceSprite2.png';
    }
}

discoAnimation = (clip) => {
    let int = setInterval(frame, 33);
    let frames = 0
    busy = true;
    function frame() {
        frames++
        if (clip == 'life') {
            if (frames == 10){
                clearInterval(int);
                document.getElementById('disco-dude').style.display = 'block';
                busy = false, wait = 0;
            }
            else document.getElementById('disco-dude').style.display = 'none';
        } else if (clip == 'dance') {
            if (frames == 10){
                if (dance < 8) dance++;
                else dance = 3
                clearInterval(int);
                document.disco.src='assets/DiscoDanceSprite1.png';
                busy = false, wait = 0;
            }
            else document.disco.src='assets/DiscoDanceSprite' + dance + '.png';
        }  
    }
}

deleteTarget = (className) => {
    const element = document.getElementsByClassName(className);
    element[0].parentNode.removeChild(element[0]);
}

pause = () => {
    const button = document.querySelector('.pause-button');
    if (button.innerText == 'Pause' && lives > 0) {
        clearInterval(game);
        button.innerText = 'Unpause';
    } else if (lives > 0){
        game = setInterval(gameLoop, 33);
        button.innerText = 'Pause';
    }    
}

gameOver = () => {
    clearInterval(game);
    deleteAll('target');
    document.getElementById('game-over').innerHTML = 'Game Over!<h6 class="score">Score:'+score+'</h6>';
    document.querySelector('.game-area > p').style.display = 'block';
    document.getElementById('disco-dude').style.display = 'none';
}

restart = () => {
    document.getElementById('start').style.display = 'block';
    clearInterval(game);
    deleteAll('target');
    deleteAll('bonus')
    deleteAll('bomb')
    init();
}

deleteAll = (className) => {
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0) elements[0].parentNode.removeChild(elements[0]);
}

//nthchil
//nthchildoftype

// later: slashing instead