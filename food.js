import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
const EXPANSION_RATE = 4;

export function update() {
	if (onSnake(food)) {
		expandSnake(EXPANSION_RATE);
		food = getRandomFoodPosition();
	}
}

export function draw(gameBoard) {
	const foodElemint = document.createElement("div");
	foodElemint.style.gridColumnStart = food.x;
	foodElemint.style.gridRowStart = food.y;
	foodElemint.classList.add("food");
	gameBoard.appendChild(foodElemint);
}

function getRandomFoodPosition() {
	let newFoodPosition;
	while (newFoodPosition == null || onSnake(newFoodPosition)) {
		newFoodPosition = randomGridPosition();
	}
	return newFoodPosition;
}
