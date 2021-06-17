import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, 
    getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';

// constantly rendering the snake
let lastRenderTime = 0;
let gameOver = false;      //start the game with gameOver is false.
const gameBoard = document.getElementById('game-board');

// Main code rendering setup, game loop.
function main (currentTime){
    if (gameOver){
        if (confirm('You lose. Press ok to restart.')){
            window.location = '/';
        }

        return
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000; //convert milliseconds to second.
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;
    
    update();
    draw();
}

// Show the snake and food in the game board, tells the browser perform the animation.
window.requestAnimationFrame(main); 

// update logic of the game
function update(){
    updateSnake();
    updateFood();
    checkDeath();
}

// draw everything on the screen based on the update loop in the gameboard.
function draw(){
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

// Check for the criteria for the game over.
function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}