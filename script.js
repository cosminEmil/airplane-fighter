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
        let pos = airplane.getBoundingClientRect();
        if (direction == 37) {
            // left
            let nr = pos.left - 50;
            if (nr > 0) {
                airplane.style.marginLeft = (pos.left - 50) + "px";
            }
        } else if (direction == 38) {
            // up
            let nr = pos.top - 70;
            if (nr > 0) {
                airplane.style.marginTop = nr + "px";
            }
        } else if (direction == 39) {
            // right
            let nr = pos.left + 50;
            if (nr < window.screen.availWidth) {
                airplane.style.marginLeft = nr + "px";
            }
        } else if (direction == 40) {
            // down
            let nr = pos.top + 40;
            if (nr < window.screen.availHeight) {
                airplane.style.marginTop = nr + "px";
            }
        } else if (keyPressed.keyCode == 32) {
                let projectile = document.createElement("div");
                let container = document.getElementById("container");
                projectile.id = "projectile";
                container.appendChild(projectile);
                let airplanePos = airplane.getBoundingClientRect();
                projectile.style.left = (airplanePos.left + 42) + "px";
                projectile.style.top = airplanePos.top + "px";
                let pos = airplanePos.top;
                let id = null;
                clearInterval(id);
                id = setInterval(frame, 5);
                function frame() {
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
                    --pos;
                    projectile.style.top = pos + "px";
                }
            }
        }
}

function obstaclesMovement(obstacle, startPosition, endPosition) {
    let pos = startPosition;
    let id = null;
    let message = document.getElementById("message");
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
        if (pos == endPosition) {
            pos = startPosition;
        } else {
            if (checkCollision(obstacle, airplane)) {
                message.innerText = "GAME OVER";
                setTimeout(() => {
                    window.location.reload();
                }, 3 * 1000);
            }
            ++pos;
            obstacle.style.top = pos + "px";
        }
    }
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