import {
	update as updateSnake,
	draw as drawSnake,
	SNAKE_SPEED,
	getSnakeHead,
	snakeIntersection,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";
import { getInputDirection } from "./input.js";

const gameBoard = document.querySelector("#game-board");
let lastRenderTime = 0;
let gameOver = false;

function main(currentTime) {
	if (gameOver) {
		if (confirm("You Lose. Press ok to restart.")) {
			window.location = "/";
		}
		return;
	}

	window.requestAnimationFrame(main);
	const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
	if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

	// console.log(secondsSinceLastRender);
	lastRenderTime = currentTime;

	update();
	draw();
}
window.requestAnimationFrame(main);

function update() {
	checkDeath();
	if (gameOver) return;
	updateSnake();
	updateFood();
}
function draw() {
	gameBoard.innerHTML = "";
	drawSnake(gameBoard);
	drawFood(gameBoard);
}

function checkDeath() {
	const inputDirection = getInputDirection();
	const snakeHead = getSnakeHead();
	const checkPosition = {};
	checkPosition.x = snakeHead.x + inputDirection.x;
	checkPosition.y = snakeHead.y + inputDirection.y;
	gameOver = outsideGrid(checkPosition) || snakeIntersection();
}
