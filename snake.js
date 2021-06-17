import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5;
const snakeBody = [{ x : 11, y : 11 }];  //the snake starting position.
let newSegments = 0;

// Update the snake body whenever moving.
export function update(){
    addSegments();

    const inputDirection = getInputDirection();

    for (let i = snakeBody.length -2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i]};
    }
    // snake head starting position
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
}

// Drawing the snake in the gameboard.
export function draw(gameBoard){
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    })
}

// Take in the number for how mnuch the snake expand.
export function expandSnake(amount){
    newSegments += amount;
}

// check if the food is eaten by the snake or on the snake technically and .
export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) 
            return false;

        return equalPosition(segment, position);
    })
}

// check if the position of food is equal with any segment of snake body.
function equalPosition(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

// Add segment into the snake body.
function addSegments(){
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({...snakeBody[snakeBody.length-1] });
    }

    newSegments = 0;
}

// Get snake head.
export function getSnakeHead(){
    return snakeBody[0];
}

// check if the snake head intersect the body.
export function snakeIntersection(){
    return onSnake(snakeBody[0], { ignoreHead: true });
}