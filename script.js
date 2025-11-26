let airplane = document.getElementById('airplane');
let finalScore = document.getElementById('score');
let score = 0;

function generateObstacle(id) {
        let obstacle = document.createElement('div');
        obstacle.id = 'obstacle' + id;
        let randomPos = generateRandomNumber(700);
        obstacle.style.marginLeft = randomPos + 'px';
        return obstacle;
}

function generateRandomNumber(maxValue) {
    return Math.floor(Math.random() * maxValue);
}


function moveLeftandRight(distance) { 
    let airplanePosition = airplane.getBoundingClientRect();
    airplane.style.marginLeft = (airplanePosition.left + distance) + "px";

}

function moveUpandDown(distance) { 
    let airplanePosition = airplane.getBoundingClientRect();
    airplane.style.marginTop = (airplanePosition.top + distance) + "px";
}

function generateGame() {
    let obstacles = document.getElementById('obstacles');
    for (let i = 1; i <= 4; ++i) {
        let obstacle = generateObstacle(i);
        obstacles.appendChild(obstacle);
        let randomNr = generateRandomNumber(150);
        obstaclesMovement(obstacle, -randomNr, 800);
    }
    document.onkeydown = function (keyPressed) {
        let direction = keyPressed.keyCode;
        if (direction == 37) {
            // left & right
            moveLeftandRight(-40);
        } else if (direction == 39) {
            moveLeftandRight(40)
        } else if (direction == 40) {
            // up & down
            moveUpandDown(40);
        } else if(direction == 38) {
            moveUpandDown(-40);
        } else if (keyPressed.keyCode == 32) {
                let id = null;
                clearInterval(id);
                let airplanePos = airplane.getBoundingClientRect();
                let currentProjectilePosition = airplanePos.top;
                let projectile = document.createElement("div");
                let container = document.getElementById("container");
                projectile.id = "projectile";
                projectile.style.left = (airplanePos.left + 42) + "px";
                projectile.style.top = airplanePos.top + "px";
                container.appendChild(projectile);
                id = setInterval(() => {
                    projectileMovement(projectile, airplanePos, currentProjectilePosition);
                    for (let i = 1; i <= 4; ++i) {
                        let obstacle = obstacles.childNodes[i];
                        if (checkCollision(obstacle, projectile)) {
                            ++score;
                            finalScore.innerText = "SCORE: " + score;
                            obstacle.remove();
                            let newObstacle = generateObstacle(i);
                            let randomNr = generateRandomNumber(150);
                            obstacles.appendChild(newObstacle);
                            obstaclesMovement(newObstacle, -randomNr, 800);
                            projectile.style.backgroundColor = "transparent";
                            projectile.remove();
                        }
                    }
                    --currentProjectilePosition;
                }, 5);
            }
        }
}

function projectileMovement(projectile, airplanePos, currentProjectilePosition) {
    projectile.style.left = (airplanePos.left + 42) + "px";
    projectile.style.top = airplanePos.top + "px";
    projectile.style.top = currentProjectilePosition + "px";
}

function movement(obstacle, currentObjectPosition, endPosition) {
    let message = document.getElementById("message");
    obstacle.style.top = currentObjectPosition + "px";
    if (checkCollision(obstacle, airplane)) {
        message.innerText = "GAME OVER";
        setTimeout(() => {
            window.location.reload();
        }, 3 * 1000);
    }
    obstacle.style.top = currentObjectPosition + "px";
}

function obstaclesMovement(obstacle, startPosition, endPosition) {
    let currentObjectPosition = startPosition;
    let id = null;
    clearInterval(id);
    id = setInterval(() => {
        movement(obstacle, currentObjectPosition, endPosition);
        ++currentObjectPosition;
        if (currentObjectPosition == endPosition) {
            currentObjectPosition = startPosition;
        }
    }, 5);
}

function checkCollision(obj1, obj2) {
    let obj1Pos = obj1.getBoundingClientRect();
    let obj2Pos = obj2.getBoundingClientRect();
    if (!(obj1Pos.right < obj2Pos.left 
        || obj1Pos.left > obj2Pos.right 
        || obj1Pos.bottom < obj2Pos.top 
        || obj1Pos.top > obj2Pos.bottom)) {
        return 1;
    }
}