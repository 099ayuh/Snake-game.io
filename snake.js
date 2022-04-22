let directioninp = { x: 0, y: 0 };
// const musicvar = new Audio("")
const musicvar = new Audio("sound/snake_music.mp3")
const foodvar = new Audio("sound/food.mp3")
const gameover = new Audio("sound/game_over.mp3")
const move = new Audio("move.mp3")
var speed = 5;
var score = 0;
let lastPaintTime = 0;
let highScore = 0;
let snakearray = [
    { x: 12, y: 10 }
]
food = { x: 6, y: 7 };

function main(gametime) {
    window.requestAnimationFrame(main);
    if ((gametime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = gametime;
    musicvar.play();
    gameEngine();
}
function iscollide(srr) {
    //if snake bump imto it self
    for (let i = 1; i < snakearray.length; i++) {
        if (srr[i].x === srr[0].x && srr[i].y === srr[0].y) {
            return true;
        }
    }
    //if snake bump into the wall
    if (srr[0].x >= 18 || srr[0].x <= 0 || srr[0].y >= 18 || srr[0].y <= 0) {
        return true;

    }

}
function gameEngine() {
    //part 1: upadating the snake array and food
    if (iscollide(snakearray)) {
        if (highScore < score) {
            highScore = score;
            alert("Yay!! You Break your last record :)");
        }
        console.log("highScore : " + highScore);
        musicvar.pause();
        gameover.play();
        score = 0;
        myscore.innerHTML = "Score: " + score;
        highscore.innerHTML = "HighScore: " + highScore;
        directioninp = { x: 0, y: 0 };
        alert("Game Over...Hit Enter to play again!!");
        snakearray = [{ x: 12, y: 10 }];
        score = 0;
        musicvar.play();

    }

    //if snake has eaten the food, increment the score and regenrate the food
    if (snakearray[0].y === food.y && snakearray[0].x === food.x) {
        foodvar.play();
        score += 1;
        if (score == 26 || score == 43 || score == 66 || score == 88 || score == 99 || score >= 105) {
            speed += 5;

        }
        myscore.innerHTML = "Score: " + score;
        snakearray.unshift({ x: snakearray[0].x + directioninp.x, y: snakearray[0].y + directioninp.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //Moving the snake 
    for (let i = snakearray.length - 2; i >= 0; i--) {
        snakearray[i + 1] = { ...snakearray[i] };//thid id used to create a new array object 

    }
    snakearray[0].x += directioninp.x;
    snakearray[0].y += directioninp.y;


    // part 2: display the snake and food
    // Displaying the snake
    board.innerHTML = "";
    snakearray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //Displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;

    foodElement.classList.add('food');
    board.appendChild(foodElement);
}








//this is for repeated call of  animation(game loop)
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    directioninp = { x: 0, y: 1 };
    move.play();
    switch (e.key) {
        case "ArrowUp":
            directioninp.x = 0;
            directioninp.y = -1;
            console.log('ArrowUp');
            break;
        case "ArrowDown":
            directioninp.x = 0;
            directioninp.y = 1;
            console.log('ArrowDown');
            break;
        case "ArrowLeft":
            directioninp.x = -1;
            directioninp.y = 0;
            console.log('ArrowLeft');
            break;
        case "ArrowRight":
            directioninp.x = 1;
            directioninp.y = 0;
            console.log('ArrowRight');
            break;

        default:
            break;
    }
});
function myeventlistener(e) {
    directioninp = { x: 0, y: 1 };
    move.play();
    switch (e) {
        case "ArrowUp":
            directioninp.x = 0;
            directioninp.y = -1;
            console.log('ArrowUp');
            break;
        case "ArrowDown":
            directioninp.x = 0;
            directioninp.y = 1;
            console.log('ArrowDown');
            break;
        case "ArrowLeft":
            directioninp.x = -1;
            directioninp.y = 0;
            console.log('ArrowLeft');
            break;
        case "ArrowRight":
            directioninp.x = 1;
            directioninp.y = 0;
            console.log('ArrowRight');
            break;

        default:
            break;
    }
};

// // document.getElementById("button1").style.display = "none";
// const mediaQuery = window.matchMedia('(min-width: 768px)')
// // Check if the media query is true
// if (mediaQuery.matches) {
//     // Then trigger an alert
//     document.getElementById("button1").style.display = "none";
// }

